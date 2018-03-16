import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';

import Router from './config/router';
import Auth from './config/auth';

import 'bulma';
import './assets/scss/style.scss';

angular.module('project3', ['ui.router', 'satellizer'])
  .config(Router)
  .config(Auth);
