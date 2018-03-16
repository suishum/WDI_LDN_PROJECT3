Auth.$inject = ['$authProvider'];

function Auth($authProvider) {
  // configuring Satellizer settings
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  // uncomment when we start working on facebook login
  // $authProvider.facebook({
  //   clientId: '189821381794898',
  //   url: '/api/facebook'
  // });
}

export default Auth;
