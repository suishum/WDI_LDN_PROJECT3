/* global navigator */

MainCtrl.$inject = ['$auth', '$state'];

function MainCtrl($auth, $state) {
  const vm = this;
  // $auth has a function called .isAuthenticated which checks to see if a token is present in your local storage
  vm.isAuthenticated = $auth.isAuthenticated;

  // get the user id of the person logged in by accessing the payload information
  vm.payload = $auth.getPayload();
  console.log(vm.payload.sub);


  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;
}

export default MainCtrl;
