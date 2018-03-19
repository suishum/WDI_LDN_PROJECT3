EventsShowCtrl.$inject = ['$http', 'Event', '$state', 'User', '$auth'];

function EventsShowCtrl($http, Event, $state, User, $auth){
  const vm = this;
  vm.event = {};
  vm.users = [];
  vm.comment = '';
  const currentUser = $auth.getPayload().sub;

  Event.findById($state.params.id)
    .then(res => {
      vm.event = res.data;
    })
    .then(() => updateInviteList());


  function updateInviteList() {
    User.find()
      .then(res => {
        const filtered = res.data.filter(user => vm.event.attendees.findIndex(obj => obj._id === user._id) === -1 );
        vm.users = filtered;
      });
  }

  function inviteAttendee(){
    Event
      .attendeeCreate($state.params.id, vm.selected.value)
      .then(res => vm.event = res.data)
      .catch(err => console.error(err));
    vm.selected.value = [];
    updateInviteList();
  }

  function removeAttendee(attendee){
    Event
      .attendeeDelete($state.params.id, attendee)
      .then(res => vm.event = res.data)
      .catch(err => console.error(err));
    updateInviteList();
  }

  function vote(restaurant) {
    if (vm.event.votes.filter(obj => obj.voter._id === currentUser).length > 0) {
      return false;
    } else {
      Event
        .voteCreate($state.params.id, { restaurant: restaurant })
        .then(res => vm.event = res.data)
        .catch(err => console.error(err));
    }
  }

  function tallyVotes(currentRestaurant){
    let matches = 0;
    vm.event.votes.forEach(vote => {
      if(vote.restaurant.id === currentRestaurant.id) matches += 1;
    });
    return matches;
  }

  function submitComment(){
    Event
      .commentCreate($state.params.id, { content: vm.comment, user: '' })
      .then(res => {
        vm.event = res.data;
      })
      .catch(err => console.error(err));

    vm.comment = [];
  }

  function deleteComment(comment){
    Event
      .commentDelete($state.params.id, comment)
      .then(res => {
        vm.event = res.data;
      })
      .catch(err => console.error(err));
  }

  // function isAdmin(){
  //
  // }

  this.deleteComment = deleteComment;
  this.submitComment = submitComment;
  this.tallyVotes = tallyVotes;
  this.vote = vote;
  this.inviteAttendee = inviteAttendee;
  this.removeAttendee = removeAttendee;
}

export default EventsShowCtrl;
