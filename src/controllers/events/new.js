EventsNewCtrl.$inject = ['Event', '$state', '$http', '$scope'];

function EventsNewCtrl(Event, $state, $http, $scope) {
  const vm = this;
  vm.event = {
    restaurants: [],
    location: {
      lat: 0,
      lng: 0
    }
  };
  vm.restaurants = [];

  function handleSubmit(){
    if (vm.form.invalid) return false;
    Event.create(vm.event)
      .then(() => $state.go('home'));
  }

  function updateRestaurants(){
    const { lat, lng: lon } = vm.event.location;
    if (lat && lon) {
      $http.get('/api/restaurants', {
        params: { lat, lon }
      })
        .then(res => {
          vm.restaurants = res.data.businesses;
        });

    }
  }

  vm.handleSubmit = handleSubmit;

  $scope.$watch(() => vm.event.location, updateRestaurants, true);
}

export default EventsNewCtrl;
