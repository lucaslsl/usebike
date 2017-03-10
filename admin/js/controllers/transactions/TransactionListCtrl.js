(function() {

  angular
    .module('UseBike')
    .controller('TransactionListCtrl', ['$http','$rootScope','$scope','toastr','$uibModal', TransactionListCtrl]);

  function TransactionListCtrl($http, $rootScope, $scope, toastr,$uibModal) {

    $scope.loadingTransactions = true;

    $scope.transactions = [];

    $scope.pagination = {
      currentPage: 1,
      totalCount: 0,
      perPage: 8,
      totalCount: 0,
      maxSize: 5
    };

    var listtransactions = function(page){

      $http({
        method: 'GET',
        data: "",
        url:'/api/transactions/count'
      })
      .then(function(response){
        $scope.pagination.totalCount = parseInt(response.data.total);
        $http({
          method: 'GET',
          data: "",
          url:'/api/transactions?isActive=true',
          params: {limit: $scope.pagination.perPage, skip: (parseInt(page)-1) * $scope.pagination.perPage}
        })
        .then(function(response){
          $scope.transactions = response.data;
          $scope.loadingTransactions = false;
        });
      });

    }

    listtransactions(1);

    $scope.pageChanged = function(){
      listtransactions($scope.pagination.currentPage);
    }


    $scope.delete = function(transaction){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/util/delete_modal.html',
        controller: 'TransactionDeleteCtrl',
        size: 'md',
        resolve: {
          transaction: function(){
            return transaction;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

    $scope.create = function(){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/transactions/create_update.html',
        controller: 'TransactionCreateUpdateCtrl',
        size: 'md',
        resolve: {
          transaction: function(){
            return undefined;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

    $scope.edit = function(transaction){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/transactions/create_update.html',
        controller: 'TransactionCreateUpdateCtrl',
        size: 'md',
        resolve: {
          transaction: function(){
            return transaction;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

  }

})();