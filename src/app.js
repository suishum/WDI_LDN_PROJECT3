import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';
import Auth from './config/auth';

//
// import EventsNewCtrl from './controllers/events/new';
//
// import Event from './services/events';

import 'bulma';
import './assets/scss/style.scss';

angular.module('project3', ['ui.router'])
  .config(Router);
  .config(Auth);
  .controller('EventsNewCtrl', EventsNewCtrl)
  .service('Event', Event);
