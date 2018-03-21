import angular from 'angular';
import '@uirouter/angularjs';
import 'ui-select';
import 'angular-sanitize';
import 'angular-messages';
import 'satellizer';
import 'filepicker-js';
import 'angular-filepicker/dist/angular_filepicker';

import Router from './config/router';
import Upload from './config/filepicker';
import Auth from './config/auth';
import Select from './config/ui-select';

import AuthRegisterCtrl from './controllers/auth/register';
import AuthLoginCtrl from './controllers/auth/login';
import MainCtrl from './controllers/main';
import HomeCtrl from './controllers/home';
import UsersShowCtrl from './controllers/users/show';
import UsersEditCtrl from './controllers/users/edit';

import EventsNewCtrl from './controllers/events/new';
import EventsShowCtrl from './controllers/events/show';
import EventsEditCtrl from './controllers/events/edit';

import Event from './services/events';
import User from './services/users';

import googleMap from './directives/google-map';
import autoComplete from './directives/auto-complete';
import uploadImage from './directives/upload-image';

import 'bulma';
import './assets/scss/style.scss';

angular.module('project3', ['ui.router', 'satellizer', 'ui.select', 'ngSanitize', 'angular-filepicker', 'ngMessages'])
  .config(Router)
  .config(Auth)
  .config(Upload)
  .config(Select)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('MainCtrl', MainCtrl)
  .controller('HomeCtrl', HomeCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl)
  .directive('autoComplete', autoComplete)
  .directive('googleMap', googleMap)
  .directive('uploadImage', uploadImage)
  .service('Event', Event)
  .service('User', User);
