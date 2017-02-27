'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
      .state('home', {
          url: '/',
          views: {
            'main': {
              templateUrl: 'templates/main.html',
              controller: 'MasterCtrl'
            }
          }
      })
      .state('login', {
          url: '/login',
          views: {
            'main': {
              templateUrl: 'templates/login.html'
            }
          }
      })
      .state('tables', {
          url: '/tables',
          views: {
            'main': {
              templateUrl: 'templates/main.html',
              controller: 'MasterCtrl'
            },
            'content': {
              templateUrl: 'templates/tables.html'
            }
          }
      });

    $locationProvider.html5Mode(true);
  }
]);