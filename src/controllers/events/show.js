EventsShowCtrl.$inject = ['$http', 'Event', '$state', 'User', '$auth'];

function EventsShowCtrl($http, Event, $state, User, $auth){
  const vm = this;
  vm.event = {};
  vm.users = [];
  vm.comment = '';
  vm.isAdmin = false;
  vm.isInvited = false;
  vm.talliedVotes;
  vm.voteWinner;
  vm.voteWinnerLocation = {
    lat: 0,
    lng: 0
  };
  const currentUser = $auth.getPayload().sub;

  // may not be able to initialise this boolean here b/c on page reload, the poll will show up again. Do it in HTML?
  vm.displayPoll = true;

  Event.findById($state.params.id)
    .then(res => {
      vm.event = res.data;
      console.log(vm.event);
      // Check if poll has been closed (if vote winner has been decided)
      if (vm.event.winner) {
        // get winner co-ordinates in the form of { 'lat': 123, 'lng': 123 }
        vm.voteWinnerLocation.lat = vm.event.winner.coordinates.latitude;
        vm.voteWinnerLocation.lng = vm.event.winner.coordinates.longitude;
        vm.displayPoll = false;
      }
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
    // get all users
    User.find()
      .then(res => {
        // filter all users in our database to see who HASN'T been invited.
        const filtered = res.data.filter(user => vm.event.attendees.findIndex(userObj => userObj._id === user._id) === -1 );
        vm.users = filtered;
      });
  }

  function inviteAttendee() {
    Event
      // create an attendee on the event from ui select drop down
      .attendeeCreate($state.params.id, vm.selected.value)
      // update event data
      .then(res => vm.event = res.data)
      .then(() => {
        // clear the input field
        vm.selected.value = [];
        // update invite list
        updateInviteList();
      })
      .catch(err => console.error(err));
  }

  function removeAttendee(attendee){
    Event
      .attendeeDelete($state.params.id, attendee)
      .then(res => vm.event = res.data)
      .catch(err => console.error(err));
    updateInviteList();
  }

  function makeAdmin(user){
    Event
      .adminCreate($state.params.id, { _id: user._id })
      .then(res => vm.event = res.data)
      .catch(err => console.error(err));
  }

  function vote(restaurant) {
    // stop user from voting if they have voted already
    if (vm.event.votes.filter(obj => obj.voter._id === currentUser).length > 0) {
      return false;
    } else {
      // add a vote
      Event
        .voteCreate($state.params.id, { restaurant: restaurant })
        .then(res => {
          vm.event = res.data;
          // console.log(vm.event.votes);
        })
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

  function calcVoteWinner() {
    // clear obj before calc
    vm.talliedVotes = {};
    vm.voteWinner = [];
    // put votes into an object with restaurant/votes is key/value pairs
    vm.event.votes.forEach(vote => {
      if (!(vote.restaurant.id in vm.talliedVotes)) {
        // console.log('key did not exist, added to the talliedVotes obj');
        vm.talliedVotes[vote.restaurant.id] = 1;
      } else {
        // console.log('key exists, added +1 to value');
        vm.talliedVotes[vote.restaurant.id] += 1;
      }
    });
    // find the id of the winner
    const winnerId = Object.keys(vm.talliedVotes).reduce((a, b) => vm.talliedVotes[a] > vm.talliedVotes[b] ? a : b);
    // get the winner object
    vm.voteWinner = vm.event.restaurants.filter(restaurant => restaurant.id === winnerId);
    Event.winnerCreate($state.params.id, vm.voteWinner[0])
      .then(res => {
        vm.event = res.data;
      })
      .catch(err => console.error(err));
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
    calcVoteWinner();
    if (vm.displayPoll === true) {
      vm.displayPoll = false;
    } else {
      vm.displayPoll = true;
    }
  }

  function deleteEvent(){
    Event.remove($state.params.id)
      .then(() => $state.go('home'));
  }
  this.makeAdmin = makeAdmin;
  this.togglePoll = togglePoll;
  this.deleteEvent = deleteEvent;
  this.deleteComment = deleteComment;
  this.submitComment = submitComment;
  this.calcVoteWinner = calcVoteWinner;
  this.tallyVotes = tallyVotes;
  this.vote = vote;
  this.inviteAttendee = inviteAttendee;
  this.removeAttendee = removeAttendee;
}

export default EventsShowCtrl;
