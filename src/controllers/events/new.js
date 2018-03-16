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
      .then(() => $state.go('/'));
  }

  function cityCode(){
    const { lat, lng: lon } = vm.event.location;

    if(lat && lon) {
      $http({
        method: 'GET',
        url: 'https://developers.zomato.com/api/v2.1/search',
        params: { lat, lon, start: 0, count: 100 },
        headers: {
          'user-key': 'bb553f8ef2af47b55acff60d10239333'
        }
      })
        .then(res => {
          vm.restaurants = [];
          vm.restaurants = res.data.restaurants;
        });
    }
  }

  vm.handleSubmit = handleSubmit;

  $scope.$watch(() => vm.event.location, cityCode, true);
}

export default EventsNewCtrl;
