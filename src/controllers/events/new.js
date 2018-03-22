EventsNewCtrl.$inject = ['Event', '$state', '$http', '$scope', '$auth'];

function EventsNewCtrl(Event, $state, $http, $scope, $auth) {
  const vm = this;
  vm.event = {
    restaurants: [],
    location: {
      lat: 0,
      lng: 0
    }
  };
  vm.restaurants = [];
  vm.locationFound = false;

  const currentUserId = $auth.getPayload().sub;

  function handleSubmit(){
    if (vm.form.invalid) return false;
    Event.create(vm.event)
      .then(() => $state.go('usersShow', { id: currentUserId }));
  }

  function updateRestaurants(){
    const { lat, lng: lon } = vm.event.location;
    if (lat && lon) {
      $http.get('/api/restaurants', {
        params: { lat, lon }
      })
        .then(res => {
          vm.restaurants = res.data.businesses;
          vm.locationFound = true;
        });
    }
  }

  vm.handleSubmit = handleSubmit;

  $scope.$watch(() => vm.event.location, updateRestaurants, true);
}

export default EventsNewCtrl;
