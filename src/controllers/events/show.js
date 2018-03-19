EventsShowCtrl.$inject = ['$http', 'Event', '$state', 'User'];

function EventsShowCtrl($http, Event, $state, User){
  const vm = this;
  vm.event = {};
  vm.users = [];
  vm.comment = '';

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
    // const i = vm.event.attendees.findIndex(obj => obj._id === id);
    // vm.event.attendees.splice(i, 1);
    // Event.update(vm.event);
    updateInviteList();
  }

  //TODO: Write logic to avoid same user voting twice
  function vote(restaurant){
    Event
      .voteCreate($state.params.id, { restaurant: restaurant, voter: '' })
      .then(res => vm.event = res.data)
      .catch(err => console.error(err));
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

  this.deleteComment = deleteComment;
  this.submitComment = submitComment;
  this.tallyVotes = tallyVotes;
  this.vote = vote;
  this.inviteAttendee = inviteAttendee;
  this.removeAttendee = removeAttendee;
}

export default EventsShowCtrl;
