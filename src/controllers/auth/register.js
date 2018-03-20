AuthRegisterCtrl.$inject = ['$auth', '$state', '$http', '$scope']; // $auth is from satellizer

function AuthRegisterCtrl($auth, $state, $http, $scope) {
  const vm = this;
  vm.categories = [];

  $http.get('/api/categories')
    .then(res => {
      // console.log(res.data);
      vm.categories = res.data;
    });

  vm.user = {
    address: '',
    location: {
      lat: 0,
      lng: 0
    }
  };

  vm.restaurants = [];

  function handleSubmit() {
    if(this.form.$invalid) return false;

    // uses satellizer to sign up
    $auth.signup(vm.user)
    // satellizer doesnt give the user a token immediately after registering (without extra logic), therefore we will redirect to the login page for now and get them to log in so we can drop a token in.
      .then(() => $state.go('home'));
  }

  vm.handleSubmit = handleSubmit;

  function updateRestaurants(){
    const { lat, lng: lon } = vm.user.location;
    if (lat && lon) {
      $http.get('/api/restaurants', {
        params: { lat, lon }
      })
        .then(res => {
          vm.restaurants = res.data.businesses;
          // console.log(res);
        });

    }
  }

  $scope.$watch(() => vm.user.location, updateRestaurants, true);
}

export default AuthRegisterCtrl;
