AuthLoginCtrl.$inject = ['$auth', '$state', '$rootScope']; // $auth is from satellizer

function AuthLoginCtrl($auth, $state, $rootScope) {
  this.credentials = {};

  // function authenticate(provider) {
  //   $auth.authenticate(provider);
  // }

  function handleSubmit() {
    // uses satellizer to login
    $auth.login(this.credentials)
      .then(res => {
        // console.log(res);
        // Broadcast this flash message whenever a user logs in
        $rootScope.$broadcast('flashMessage', {
          type: 'success',
          content: res.data.message // pull the personalised message from the response. check console.log(res). This is the message we set earlier in the backend (controllers/auth.js)
        });

        $state.go('home');
      });
  }

  // this.authenticate = authenticate;
  this.handleSubmit = handleSubmit;
}

export default AuthLoginCtrl;
