'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('UseBike').config(['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', 'valdrProvider','valdrMessageProvider',
  function($stateProvider, $urlRouterProvider, $breadcrumbProvider, valdrProvider,valdrMessageProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'main': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
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
        },
        ncyBreadcrumb: {
          label: 'Início'
        }
      })
      .state('base.bikes', {
        url: 'bikes',
        views: {
          'content': {
            templateUrl: 'templates/bikes/list.html',
            controller: 'BikeListCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Bicicletas'
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

    $breadcrumbProvider.setOptions({
      templateUrl: 'templates/breadcrumb.html'
    });

    valdrProvider.addValidator('undefinedObjectValidator');

    valdrMessageProvider
      .setTemplate('<div><p class="valdr-msg text-warning">{{ violation.message }}</p></div>');
            
    valdrProvider.addConstraints({
        Bike: {
          bin: {
            size: {
              min: 2,
              max: 200,
              message: 'Número de Identificação deve conter entre 2 e 200 caracteres.'
            },
            required: {
              message: 'Número de Identificação é obrigatório'
            }
          },
          location: {
            undefinedObjectValidator: {
              foo: 'bar',
              message: ' Ponto não selecionado'
            },
            required: {
              message: ' Ponto não selecionado'
            }
          },
        }
    });

  }
]).run(['$http', '$rootScope', '$state', function($http, $rootScope, $state){
    // delete $http.defaults.headers['get'];
    // $http.defaults.headers.get = {'Content-Type': 'application/json'};
    // $http.defaults.headers.patch = {'Content-Type': 'application/json'};
    // $http.defaults.headers.put = {'Content-Type': 'application/json'};
    // $http.defaults.headers.delete = {'Content-Type': 'application/json'};
    // $http.defaults.headers.post = {'Content-Type': 'application/json'};

    $rootScope.$on('$stateChangeStart', function(event, next, current, toState, toParams, fromState, fromParams){
      if($rootScope.user===undefined || $rootScope.user.id=== undefined){
        $http({
          method: 'GET',
          data: '',
          url:'/api/me'
        })
        .then(function(response){
          if(response.data.isAdmin){
            $rootScope.user = response.data;
          }else{
            $state.go('login');
          }
        })
        .catch(function(response){
          $state.go('login');
        });
      }
    });

}]);