/* global navigator */

HomeCtrl.$inject = ['$auth', '$http'];

function HomeCtrl($auth, $http) {
  const vm = this;
  vm.currentLocation = {
    lat: 0,
    lng: 0
  };
  vm.top20Restaurants = [];

  // get lat and lng of current position
  navigator.geolocation.getCurrentPosition(pos => {
    // console.log(pos);
    vm.currentLocation.lat = pos.coords.latitude;
    vm.currentLocation.lng = pos.coords.longitude;
    // console.log(vm.currentLocation);
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
