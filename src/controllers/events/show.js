EventsShowCtrl.$inject = ['$http', 'Event', '$state', 'User'];

function EventsShowCtrl($http, Event, $state, User){
  const vm = this;
  vm.event = {};
  vm.users = [];
  vm.selected = [];

  Event.findById($state.params.id)
    .then(res => {
      vm.event = res.data;
    });

  User.find()
    .then(res => {
      vm.users = res.data;
    });

  function invite(){
    for (let i = 0; i < vm.selected.value.length; i++) {
      vm.event.attendees.push(vm.selected.value[i]);
    }
    Event.update(vm.event);
  }

  function removeAttendee(id){
    const i = vm.event.attendees.findIndex(obj => obj._id === id);
    vm.event.attendees.splice(i, 1);
    Event.update(vm.event);
  }

  this.invite = invite;
  this.removeAttendee = removeAttendee;
}

export default EventsShowCtrl;
