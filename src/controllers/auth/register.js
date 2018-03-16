AuthRegisterCtrl.$inject = ['$auth', '$state']; // $auth is from satellizer

function AuthRegisterCtrl($auth, $state) {
  this.user = {};

  function handleSubmit() {
    // uses satellizer to sign up
    $auth.signup(this.user)
    // satellizer doesnt give the user a token immediately after registering (without extra logic), therefore we will redirect to the login page for now and get them to log in so we can drop a token in.
      .then(() => $state.go('home'));
  }

  this.handleSubmit = handleSubmit;

}

export default AuthRegisterCtrl;
