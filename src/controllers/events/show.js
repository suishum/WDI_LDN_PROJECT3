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
  vm.zeroVotes = true;
  vm.closePollClicked = false;
  vm.showDirections = false;
  vm.voteWinnerLocation = {
    lat: 0,
    lng: 0
  };
  vm.origin= {
    lat: 0,
    lng: 0
  };
  const currentUser = $auth.getPayload().sub;
  vm.displayPoll = true;
  vm.talliedVotes = {};
  vm.currentUserVoted = false;
  vm.directions = [ {
    instructions: 'The directions from your location are not availiable at this time.'
  }];

  Event.findById($state.params.id)
    .then(res => {
      vm.event = res.data;
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
    .then(() => {
      updateInviteList();
      tallyVotes();
    });

  function updateInviteList() {
    // get all users
    User.find()
      .then(res => {
        // filter all users in our database to see who HASN'T been invited.
        const filtered = res.data.filter(user => vm.event.attendees.findIndex(userObj => userObj._id === user._id) === -1 );
        vm.users = filtered.filter(user => vm.event.admin.findIndex(admin => admin._id === user._id) === -1);
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

  function hideAdminButton(attendee){
    return (vm.event.admin.findIndex(admin => admin._id === attendee._id) === -1);
  }

  function vote(restaurant) {
    //delete user's previous votes
    if (vm.event.votes.filter(obj => obj.voter._id === currentUser).length > 0) {
      const vote = vm.event.votes.filter(obj => obj.voter._id === currentUser);
      vote.forEach(vote => {
        vm.talliedVotes[vote.restaurant.id] -= 1;
        Event
          .voteDelete($state.params.id, vote)
          .then(() => {
            //add a vote
            Event.voteCreate($state.params.id, { restaurant: restaurant })
              .then(res => {
                vm.event = res.data;
              })
              .catch(err => console.error(err));
          });
      });
    } else {
    // else just add a vote
      Event
        .voteCreate($state.params.id, { restaurant: restaurant })
        .then(res => {
          vm.event = res.data;
        })
        .catch(err => console.error(err));
    }
    if (vm.talliedVotes[restaurant.id]) vm.talliedVotes[restaurant.id] += 1;
    else vm.talliedVotes[restaurant.id] = 1;
  }

  function votedFor(restaurant){
    return (vm.event.votes.findIndex(vote => vote.voter._id === currentUser && vote.restaurant.id === restaurant.id) === -1);
  }


  function tallyVotes() {
    vm.event.votes.forEach(vote => {
      if (!(vote.restaurant.id in vm.talliedVotes)) {
        vm.talliedVotes[vote.restaurant.id] = 1;
      } else {
        vm.talliedVotes[vote.restaurant.id] += 1;
      }
    });
  }


  function calcVoteWinner() {
    vm.voteWinner = [];
    tallyVotes();
    // find the id of the winner
    const winnerId = Object.keys(vm.talliedVotes).reduce((a, b) => vm.talliedVotes[a] > vm.talliedVotes[b] ? a : b);
    // get the winner object
    vm.voteWinner = vm.event.restaurants.filter(restaurant => restaurant.id === winnerId);
    Event.winnerCreate($state.params.id, vm.voteWinner[0])
      .then(res => {
        vm.event = res.data;
        // get winner co-ordinates in the form of { 'lat': 123, 'lng': 123 }
        vm.voteWinnerLocation.lat = vm.event.winner.coordinates.latitude;
        vm.voteWinnerLocation.lng = vm.event.winner.coordinates.longitude;
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

  function closePoll(){
    tallyVotes();
    vm.zeroVotes = (Object.values(vm.talliedVotes).some(val => val > 0)) ? false : true;
    vm.closePollClicked = true;
  }

  function closeMessage(){
    vm.closePollClicked = false;
  }

  function togglePoll() {
    calcVoteWinner();
    vm.displayPoll = (vm.displayPoll) ? false : true;
    vm.closePollClicked = false;
  }

  function deleteEvent(){
    Event.remove($state.params.id)
      .then(() => $state.go('home'));
  }

  function displayDirections() {
    vm.showDirections = !vm.showDirections;
  }

  this.makeAdmin = makeAdmin;
  this.hideAdminButton = hideAdminButton;
  this.togglePoll = togglePoll;
  this.closePoll = closePoll;
  this.closeMessage = closeMessage;
  this.deleteEvent = deleteEvent;
  this.deleteComment = deleteComment;
  this.submitComment = submitComment;
  this.vote = vote;
  this.votedFor = votedFor;
  this.tallyVotes = tallyVotes;
  this.calcVoteWinner = calcVoteWinner;
  this.inviteAttendee = inviteAttendee;
  this.removeAttendee = removeAttendee;
  this.displayDirections = displayDirections;
}

export default EventsShowCtrl;
