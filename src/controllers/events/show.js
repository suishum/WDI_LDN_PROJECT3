EventsShowCtrl.$inject = ['$http', 'Event', '$state', 'User'];

function EventsShowCtrl($http, Event, $state, User){
  const vm = this;
  vm.event = {};
  vm.users = [];
  vm.selected = { value: vm.users[0] };

  Event.findById($state.params.id)
    .then(res => {
      console.log(res.data);
      vm.event = res.data;
    });

  User.find()
    .then(res => {
      console.log(res.data);
      vm.users = res.data;
    });


}

export default EventsShowCtrl;
