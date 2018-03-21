/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$scope'];

function MainCtrl($auth, $state, $scope) {
  const vm = this;
  vm.clicked = false;
  vm.currentUser = '';
  // $auth has a function called .isAuthenticated which checks to see if a token is present in your local storage
  vm.isAuthenticated = $auth.isAuthenticated;

  function getCurrentUser() {
    vm.currentUser = $auth.getPayload().sub;
    console.log(`authenticated user: ${vm.currentUser}`);
  }

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;

  $scope.$watch(() => vm.isAuthenticated() === true, getCurrentUser, true);
}

export default MainCtrl;
