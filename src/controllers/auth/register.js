AuthRegisterCtrl.$inject = ['$auth', '$state', '$http']; // $auth is from satellizer

function AuthRegisterCtrl($auth, $state, $http) {
  const vm = this;
  vm.categories = [];

  $http.get('/api/categories')
    .then(res => {
      vm.categories = res.data;
    });

  vm.user = {};
  vm.restaurants = [];

  function handleSubmit() {
    if(this.form.$invalid) return false;

    // uses satellizer to sign up
    $auth.signup(vm.user)
    // satellizer doesnt give the user a token immediately after registering (without extra logic), therefore we will redirect to the login page for now and get them to log in so we can drop a token in.
      .then(() => $state.go('home'));
  }

  vm.handleSubmit = handleSubmit;

}

export default AuthRegisterCtrl;
