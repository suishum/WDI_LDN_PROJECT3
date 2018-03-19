/* global navigator */

MainCtrl.$inject = ['$auth', '$state'];

function MainCtrl($auth, $state) {
  const vm = this;
  // $auth has a function called .isAuthenticated which checks to see if a token is present in your local storage
  vm.isAuthenticated = $auth.isAuthenticated;

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;
}

export default MainCtrl;
