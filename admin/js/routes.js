'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('UseBike').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'main': {
            templateUrl: 'templates/login.html',
            // controller: 'MasterCtrl'
          }
        }
      })
      .state('base', {
        url: '/',
        views: {
          'main': {
            templateUrl: 'templates/base.html',
            controller: 'MasterCtrl'
          }
        }
      })
      .state('base.tables', {
        url: 'tables',
        views: {
          'content': {
            templateUrl: 'templates/tables.html'
          }
        }
      })
      .state('base.dashboard', {
        url: 'dashboard',
        views: {
          'content': {
            templateUrl: 'templates/dashboard.html'
          }
        }
      });
  }
]);