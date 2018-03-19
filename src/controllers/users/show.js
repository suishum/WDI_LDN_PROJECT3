UsersShowCtrl.$inject = ['User', '$state', '$auth', '$http'];
function UsersShowCtrl(User, $state, $auth, $http) {
  // console.log('show ctrl loaded');
  const vm = this;
  vm.user = {};

  User.findById($state.params.id)
    .then(res => vm.user = res.data);
  // .then(() => {
  //   const lat = vm.user.location.lat;
  //   const lng = vm.user.location.lng;
  //   User.getForecast(lat, lng)
  //     .then(res => console.log(res));
  // });

  // get the user id of the person logged in by accessing the payload information
  vm.payload = $auth.getPayload();
  // console.log(vm.payload.sub);

  vm.allEvents = [];
  vm.myEvents = [];
  vm.joinedEvents = [];

  $http.get('/api/events')
    .then(res => {
      // console.log(res.data);
      vm.allEvents = res.data;
      vm.myEvents = vm.allEvents.filter(event => event.admin.includes(vm.payload.sub));
      // console.log(vm.myEvents);
      vm.joinedEvents = vm.allEvents.filter(event => event.attendees.includes(vm.payload.sub));
      // console.log(vm.joinedEvents);
    });

  // function remove() {
  //   User.remove(vm.user)
  //     .then(() => $state.go('home'));
  // }
  //
  // vm.remove = remove;
}

export default UsersShowCtrl;
