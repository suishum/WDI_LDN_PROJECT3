/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$scope'];

function MainCtrl($auth, $state, $scope) {
  const vm = this;
  // $auth has a function called .isAuthenticated which checks to see if a token is present in your local storage
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.payload = '';
  // get the user id of the person logged in by accessing the payload information
  $scope.$on('loggedIn', () => vm.payload = $auth.getPayload());
  // console.log(vm.payload.sub);
  vm.clicked = false;

  function logout() {
    $auth.logout();
    $state.go('home');
    vm.payload = '';
  }

  vm.logout = logout;
}

export default MainCtrl;
