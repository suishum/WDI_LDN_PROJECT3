EventsNewCtrl.$inject = ['Event', '$state', '$http', '$scope'];

function EventsNewCtrl(Event, $state, $http, $scope) {
  const vm = this;
  vm.event = {
    restaurants: []
  };
  vm.restaurants = [];

  function handleSubmit(){
    if (vm.form.invalid) return false;
    Event.create(vm.event)
      .then(() => $state.go('/'));
  }

  function cityCode(){
    switch (vm.event.location) {
      case 'London':
        vm.cityCode = 61;
        break;
      case 'New York':
        vm.cityCode = 280;
        break;
      case 'Milan':
        vm.cityCode = 258;
    }
    $http({
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/search?',
      params: {
        entity_id: vm.cityCode,
        entity_type: 'city',
        start: 0,
        count: 100
      },
      headers: {
        'user-key': 'bb553f8ef2af47b55acff60d10239333'
      }
    })
      .then(res => {
        vm.restaurants = res.data.restaurants;
      });
  }

  vm.handleSubmit = handleSubmit;

  $scope.$watch(() => vm.event.location, cityCode);
}

export default EventsNewCtrl;
