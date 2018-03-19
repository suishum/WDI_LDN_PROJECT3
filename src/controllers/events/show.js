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

  function invite(){
    for (let i = 0; i < vm.selected.value.length; i++) {
      vm.event.attendees.push(vm.selected.value[i]);
    }
    Event.update(vm.event);
    vm.selected.value = [];
    updateInviteList();
  }

  function removeAttendee(id){
    const i = vm.event.attendees.findIndex(obj => obj._id === id);
    vm.event.attendees.splice(i, 1);
    Event.update(vm.event);
    updateInviteList();
  }

  //TODO: Write logic to avoid same user voting twice
  function vote(restaurant){
    Event.voteCreate($state.params.id, { restaurant: restaurant, voter: '' });
  }

  function tallyVotes(currentRestaurant){
    let matches = 0;
    vm.event.votes.forEach(vote => {
      if(vote.restaurant.id === currentRestaurant.id) matches += 1;
    });
    return matches;
    // const matches = vm.event.votes.filter(vote => {
    //   vote.restaurant.id === currentRestaurant.id;
    // });
    // console.log(matches.length);
  }

  function submitComment(){
    Event.commentCreate($state.params.id, { content: vm.comment, user: '' });
    vm.comment = [];
  }

  this.submitComment = submitComment;
  this.tallyVotes = tallyVotes;
  this.vote = vote;
  this.invite = invite;
  this.removeAttendee = removeAttendee;
}

export default EventsShowCtrl;
