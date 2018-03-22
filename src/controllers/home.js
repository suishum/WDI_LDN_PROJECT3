/* global navigator */
HomeCtrl.$inject = ['$auth', '$http', '$timeout'];

function HomeCtrl($auth, $http, $timeout) {
  const vm = this;
  vm.currentLocation = {
    lat: 51.515856,
    lng: -0.072353
  };
  vm.usersLocation = {
    lat: 0,
    lng: 0
  };
  vm.top20Restaurants = [];
  vm.loading = 900;
  vm.loaded = 0;
  vm.showPopup = true;

  initGeolocation();
  // get lat and lng of current position
  function initGeolocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      vm.currentLocation.lat = pos.coords.latitude;
      vm.currentLocation.lng = pos.coords.longitude;
      vm.usersLocation.lat = pos.coords.latitude;
      vm.usersLocation.lng = pos.coords.longitude;
      $timeout(() => vm.showPopup = false, 3000);
      updateRestaurants();
    }, onError);
  }

  function onError() {
    $timeout(() => vm.showPopup = false, 3000);
    updateRestaurants();
  }

  function updateRestaurants(){
    const { lat, lng: lon } = vm.currentLocation;
    if (lat && lon) {
      $http.get('/api/restaurants', {
        params: { lat, lon }
      })
        .then(res => {
          vm.top20Restaurants = res.data.businesses;
        });
    }
  }
}

export default HomeCtrl;
