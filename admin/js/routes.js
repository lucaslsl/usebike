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
        },
        authenticationRequired: false
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
        },
        authenticationRequired: true
      })
      .state('base.dashboard', {
        url: 'dashboard',
        views: {
          'content': {
            templateUrl: 'templates/dashboard.html'
          }
        },
        authenticationRequired: true
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
        },
        authenticationRequired: true
      })
      .state('base.locations', {
        url: 'locations',
        views: {
          'content': {
            templateUrl: 'templates/locations/list.html',
            controller: 'LocationListCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Pontos de Aluguel'
        },
        authenticationRequired: true
      })
      .state('base.users', {
        url: 'users',
        views: {
          'content': {
            templateUrl: 'templates/users/list.html',
            controller: 'UserListCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Usuários'
        },
        authenticationRequired: true
      })
      .state('base.transactions', {
        url: 'transactions',
        views: {
          'content': {
            templateUrl: 'templates/transactions/list.html',
            controller: 'TransactionListCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Transações'
        },
        authenticationRequired: true
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
        },
        Location: {
          name: {
            size: {
              min: 6,
              max: 200,
              message: 'Nome deve conter entre 2 e 200 caracteres.'
            },
            required: {
              message: 'Nome é obrigatório'
            }
          },
          description: {
            size: {
              min: 6,
              max: 200,
              message: 'Nome deve conter entre 2 e 200 caracteres.'
            },
            required: {
              message: 'Nome é obrigatório'
            }
          },
          latitude: {
            required: {
              message: 'Latitude é obrigatório'
            }
          },
          longitude: {
            required: {
              message: 'Longitude é obrigatório'
            }
          }
        },
        User: {
          first_name: {
            size: {
              min: 2,
              max: 200,
              message: 'Nome deve conter entre 2 e 200 caracteres.'
            },
            required: {
              message: 'Nome é obrigatório'
            }
          },
          last_name: {
            size: {
              min: 2,
              max: 200,
              message: 'Sobrenome deve conter entre 2 e 200 caracteres.'
            },
            required: {
              message: 'Sobrenome é obrigatório'
            }
          },
          email: {
            required: {
              message: 'Email é obrigatório'
            },
            email: {
              message: 'Dever ser um email válido'
            }
          },
          password: {
            required: {
              message: 'Senha é obrigatório'
            }
          }
        },
        Transaction: {
          account: {
            undefinedObjectValidator: {
              foo: 'bar',
              message: ' Conta não selecionada'
            },
            required: {
              message: ' Conta é obrigatória'
            }
          },
          pickup: {
            undefinedObjectValidator: {
              foo: 'bar',
              message: ' Aluguel não selecionado'
            },
            required: {
              message: ' Aluguel é obrigatório'
            }
          },
          type: {
            required: {
              message: 'Tipo é obrigatório'
            }
          },
          amount: {
            required: {
              message: 'Valor é obrigatório'
            }
          },
        },
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

      if(toState.authenticationRequired){
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
        
      }


    });

}]);