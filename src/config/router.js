secureState.$inject = ['$q', '$state', '$auth', '$rootScope']; // angular's own promise library is called $q
// create a secureState promise, if the promise is resolved, we get to go to the page we wanted. If not, it redirects us to the login page
function secureState($q, $state, $auth, $rootScope) {
  // promises usually takes 2 arguments, resolve and reject, we do not need reject in this case
  return new $q((resolve) => {
    // if the user is authenticated, then you are allowed to go to the page
    if($auth.isAuthenticated()) return resolve();
    // set up flash messages
    $rootScope.$broadcast('flashMessage', {
      type: 'danger',
      content: 'Hey! You must be logged in to do that.'
    });

    // if not, redirect to login
    $state.go('login');
  });
}

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  // We need this line to remove the /#!/ from the URL (clients dont like it), remember to add the <base>(?) tag to HTML
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as home'
    })
    // login route
    .state('login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      controller: 'AuthLoginCtrl as authLogin'
    })
    // register route
    .state('register', {
      url: '/register',
      templateUrl: 'views/auth/register.html',
      controller: 'AuthRegisterCtrl as authRegister'
    })
    .state('eventsNew', {
      url: '/events/new',
      templateUrl: 'views/events/new.html',
      controller: 'EventsNewCtrl as eventsNew',
      resolve: { secureState }
    })
    .state('eventsShow', {
      url: '/events/:id',
      templateUrl: 'views/events/show.html',
      controller: 'EventsShowCtrl as eventsShow',
      resolve: { secureState }
    })
    .state('eventsEdit', {
      url: '/events/:id/edit',
      templateUrl: 'views/events/edit.html',
      controller: 'EventsEditCtrl as eventsEdit',
      resolve: { secureState }
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'views/users/show.html',
      controller: 'UsersShowCtrl as usersShow',
      resolve: { secureState }
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit',
      resolve: { secureState }
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
