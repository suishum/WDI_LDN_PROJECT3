AuthRegisterCtrl.$inject = ['$auth', '$state', '$http', '$rootScope']; // $auth is from satellizer

function AuthRegisterCtrl($auth, $state, $http, $rootScope) {
  const vm = this;

  vm.user = {};
  vm.restaurants = [];
  vm.error = '';

  function handleSubmit() {
    if(this.form.$invalid) return false;
    // uses satellizer to sign up
    $auth.signup(vm.user)
    // satellizer doesnt give the user a token immediately after registering (without extra logic), therefore we will redirect to the login page for now and get them to log in so we can drop a token in.
      .then((res) => {
        $rootScope.$broadcast('flashMessage', {
          type: 'success',
          content: res.data.message // this is from controllers/auth.js in the backend
        });
      })
      .then(() => $state.go('home'))
      .catch(err => {
        // console.log('message sent', err.data.message);
        $rootScope.$broadcast('flashMessage', {
          type: 'danger',
          content: err.data.message // this is from index.js
        });
      });
  }

  vm.handleSubmit = handleSubmit;

}

export default AuthRegisterCtrl;
