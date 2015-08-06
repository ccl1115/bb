'use strict';

/**
 * @ngdoc overview
 * @name bbApp
 * @description
 * # bbApp
 *
 * Main module of the application.
 */
angular
  .module('bbApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'flow',
    'bbApp.account',
    'bbApp.requester',
    'bbApp.version',
    'bbApp.schema'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function() {
    $.material.init();
  });
