EventsShowCtrl.$inject = ['$http', 'Event', '$state', 'User'];

function EventsShowCtrl($http, Event, $state, User){
  const vm = this;
  vm.event = {};
  vm.users = [];

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

  this.invite = invite;
  this.removeAttendee = removeAttendee;
}

export default EventsShowCtrl;
