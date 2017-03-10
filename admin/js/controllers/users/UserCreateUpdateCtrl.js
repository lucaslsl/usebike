(function() {

  angular
    .module('UseBike')
    .controller('UserCreateUpdateCtrl', ['$http','$rootScope','$scope','toastr','$uibModalInstance','refresher','user', UserCreateUpdateCtrl]);

  function UserCreateUpdateCtrl($http, $rootScope, $scope, toastr,$uibModalInstance,refresher,user) {
    
    $scope.isUpdate = false;

    $scope.validationError = '';

    $scope.user = {};

    if(user!==undefined){
      $scope.isUpdate = true;
      $scope.user = user;
      $scope.user.password = '';
    }

    $scope.cancel = function(){
      $uibModalInstance.close();
    }


    $scope.confirm = function(form){
      if(form.$valid){
        var data = angular.copy($scope.user);
        data.account = undefined;
        data.pickups = undefined;
        if($scope.isUpdate){
          $http({
            method: 'PATCH',
            data: _.omit(data,['id']),
            url:'/api/users/' + data.id,
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
            url:'/api/users',
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