/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$scope'];

function MainCtrl($auth, $state, $scope) {
  const vm = this;
  vm.clicked = false;
  vm.currentUser = '';
  // $auth has a function called .isAuthenticated which checks to see if a token is present in your local storage
  vm.isAuthenticated = $auth.isAuthenticated;

  function getCurrentUser() {
    if ($auth.getPayload()) {
      vm.currentUser = $auth.getPayload().sub;
      console.log(`authenticated user: ${vm.currentUser}`);
    }
  }

  // get the user id of the person logged in by accessing the payload information
  $scope.$on('loggedIn', () => {
    // vm.currentUser = $auth.getPayload().sub;
    // console.log(`immediately after logging in: ${vm.currentUser}`);
  });

  // console.log(`outside if statement and outside scope: ${vm.currentUser}`);
  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;

  $scope.$watch(() => vm.isAuthenticated, getCurrentUser, true);
}

export default MainCtrl;
