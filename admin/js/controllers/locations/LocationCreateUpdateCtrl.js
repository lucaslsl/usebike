(function() {

  angular
    .module('UseBike')
    .controller('LocationCreateUpdateCtrl', ['$http','$rootScope','$scope','toastr','$uibModalInstance','refresher','location', LocationCreateUpdateCtrl]);

  function LocationCreateUpdateCtrl($http, $rootScope, $scope, toastr,$uibModalInstance,refresher,location) {
    
    $scope.isUpdate = false;

    $scope.validationError = '';

    $scope.location = {};

    if(location!==undefined){
      $scope.isUpdate = true;
      $scope.location = location;
    }



    $scope.cancel = function(){
      $uibModalInstance.close();
    }


    $scope.confirm = function(form){
      if(form.$valid){
        var data = angular.copy($scope.location);
        data.bikes = undefined;
        if($scope.isUpdate){
          $http({
            method: 'PATCH',
            data: _.omit(data,['id']),
            url:'/api/locations/' + data.id,
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
            url:'/api/locations',
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