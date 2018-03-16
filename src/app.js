import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';

import Auth from './config/auth';
import AuthRegisterCtrl from './controllers/auth/register';
// import AuthLoginCtrl from './controllers/auth/login';

import EventsNewCtrl from './controllers/events/new';
import Event from './services/events';


import 'bulma';
import './assets/scss/style.scss';

angular.module('project3', ['ui.router', 'satellizer'])
  .config(Router)
  .config(Auth)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  // .controller('AuthLoginCtrl', AuthLoginCtrl);
  .controller('EventsNewCtrl', EventsNewCtrl)
  .service('Event', Event);
