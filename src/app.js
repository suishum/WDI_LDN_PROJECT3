import angular from 'angular';
import '@uirouter/angularjs';
import 'ui-select';
import 'angular-sanitize';
import 'satellizer';

import Router from './config/router';

import Auth from './config/auth';
import AuthRegisterCtrl from './controllers/auth/register';
import AuthLoginCtrl from './controllers/auth/login';

import EventsNewCtrl from './controllers/events/new';
import EventsShowCtrl from './controllers/events/show';

import Event from './services/events';
import User from './services/users';

import googleMap from './directives/google-map';
import autoComplete from './directives/auto-complete';

import 'bulma';
import './assets/scss/style.scss';

angular.module('project3', ['ui.router', 'satellizer', 'ui.select', 'ngSanitize'])
  .config(Router)
  .config(Auth)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .directive('autoComplete', autoComplete)
  .directive('googleMap', googleMap)
  .service('Event', Event)
  .service('User', User);
