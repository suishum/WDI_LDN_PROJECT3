EventsShowCtrl.$inject = ['$http', 'Event', '$state', 'User', '$auth'];

function EventsShowCtrl($http, Event, $state, User, $auth){
  const vm = this;
  vm.event = {};
  vm.users = [];
  vm.comment = '';
  vm.isAdmin = false;
  vm.isInvited = false;
  const currentUser = $auth.getPayload().sub;

  // may not be able to initialise this boolean here b/c on page reload, the poll will show up again. Do it in HTML?
  vm.displayPoll = true;

  Event.findById($state.params.id)
    .then(res => {
      vm.event = res.data;
      console.log(currentUser);
      console.log(vm.event.attendees);
      // Find out if the user is an admin
      if (vm.event.admin.findIndex(admin => admin._id === currentUser) !== -1) {
        vm.isAdmin = true;
        vm.isInvited = true;
      }
      if (vm.event.attendees.findIndex(attendee => attendee._id === currentUser) !== -1) {
        vm.isInvited = true;
      }
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

  function togglePoll() {
    console.log('clicked');
    if (vm.displayPoll === true) {
      vm.displayPoll = false;
    } else {
      vm.displayPoll = true;
    }
    // write something to display info of restaurant with the most votes
    // opening hours, telephone number (for bookings),
    // remove the voting buttons?
  }

  function deleteEvent(){
    Event.remove($state.params.id)
      .then(() => $state.go('home'));
  }

  this.togglePoll = togglePoll;
  this.deleteEvent = deleteEvent;
  this.deleteComment = deleteComment;
  this.submitComment = submitComment;
  this.tallyVotes = tallyVotes;
  this.vote = vote;
  this.inviteAttendee = inviteAttendee;
  this.removeAttendee = removeAttendee;
}

export default EventsShowCtrl;
