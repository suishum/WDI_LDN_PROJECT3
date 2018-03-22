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

  // get lat and lng of current position
  navigator.geolocation.getCurrentPosition(pos => {
    vm.currentLocation.lat = pos.coords.latitude;
    vm.currentLocation.lng = pos.coords.longitude;
    vm.usersLocation.lat = pos.coords.latitude;
    vm.usersLocation.lng = pos.coords.longitude;
    $timeout(() => vm.showPopup = false, 3000);
    updateRestaurants();
  });

  function updateRestaurants(){
    const { lat, lng: lon } = vm.currentLocation;
    if (lat && lon) {
      $http.get('/api/restaurants', {
        params: { lat, lon }
      })
        .then(res => {
          vm.top20Restaurants = res.data.businesses;
          // console.log(vm.top20Restaurants);
        });
    }
  }

  // make it so that users can click on the restaurants then get taken to make event page? with the restaurant they clicked on populating the first field for restaurants.

}

export default HomeCtrl;
