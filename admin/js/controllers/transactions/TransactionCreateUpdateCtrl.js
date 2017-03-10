(function() {

  angular
    .module('UseBike')
    .controller('TransactionCreateUpdateCtrl', ['$http','$rootScope','$scope','toastr','$uibModalInstance','refresher','transaction', TransactionCreateUpdateCtrl]);

  function TransactionCreateUpdateCtrl($http, $rootScope, $scope, toastr,$uibModalInstance,refresher,transaction) {
    
    $scope.isUpdate = false;

    $scope.validationError = '';

    $scope.transaction = {};

    if(transaction!==undefined){
      $scope.isUpdate = true;
      $scope.transaction = transaction;
    }

    $scope.transactionTypes = [
      { name: 'Cobrança de Aluguel', value: 'rental-charge' },
      { name: 'Estorno de Aluguel', value: 'rental-refund' },
      { name: 'Cobrança de Atraso', value: 'latefee-charge' },
      { name: 'Estorno de Atraso', value: 'latefee-refund' },
      { name: 'Cobrança de Seguro', value: 'insurance-charge' },
      { name: 'Estorno de Seguro', value: 'insurance-refund' },
    ];

    $scope.cancel = function(){
      $uibModalInstance.close();
    }


    $scope.confirm = function(form){
      if(form.$valid){
        var data = angular.copy($scope.transaction);
        data.bikes = undefined;
        if($scope.isUpdate){
          $http({
            method: 'PATCH',
            data: _.omit(data,['id']),
            url:'/api/transactions/' + data.id,
          })
          .then(function(response){
            refresher();
            $uibModalInstance.close();
            toastr.success('Item atualizado com sucesso');
          })
          .catch(function(response){
            $uibModalInstance.close();
            toastr.error('Não foi possivel atualizar o item');
          });
        }else{
          $http({
            method: 'POST',
            data: data,
            url:'/api/transactions',
          })
          .then(function(response){
            refresher();
            $uibModalInstance.close();
            toastr.success('Item salvo com sucesso');
          })
          .catch(function(response){
            $uibModalInstance.close();
            toastr.error('Não foi possivel salvar o item');
          });
        }
        
      }
    }

  }

})();