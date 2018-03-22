/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$scope', '$rootScope', '$timeout'];

function MainCtrl($auth, $state, $scope, $rootScope, $timeout) {
  const vm = this;
  vm.clicked = false;
  vm.currentUser = '';
  // $auth has a function called .isAuthenticated which checks to see if a token is present in your local storage
  vm.isAuthenticated = $auth.isAuthenticated;

  function getCurrentUser() {
    if ($auth.getPayload()) vm.currentUser = $auth.getPayload().sub;
    // console.log(`authenticated user: ${vm.currentUser}`);
  }

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;

  // set up a listener for flash messages.
  $rootScope.$on('flashMessage', (e, data) => {
    // console.log('message received', data);
    vm.flashMessage = data;
    // set timeout on the flash message. this is because we never reload the page therefore it will stay there FOREVER without a set timeout
    $timeout(() => vm.flashMessage = null, 2000);
  });

  $scope.$watch(() => vm.isAuthenticated() === true, getCurrentUser, true);
}

export default MainCtrl;
