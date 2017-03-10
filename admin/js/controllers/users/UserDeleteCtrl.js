(function() {

  angular
    .module('UseBike')
    .controller('UserDeleteCtrl', ['$http','$rootScope','$scope','toastr','$uibModalInstance','refresher','user', UserDeleteCtrl]);

  function UserDeleteCtrl($http, $rootScope, $scope, toastr,$uibModalInstance,refresher,user) {
    
    $scope.itemName = 'Bicicleta';
    $scope.question = 'Tem certeza que deseja excluir o usuário "' + user.first_name + ' ' + user.last_name + '".';

    $scope.cancel = function(){
      $uibModalInstance.close();
    }

    $scope.confirm = function(){
      $http({
        method: 'PATCH',
        data: {isActive: false},
        url:'/api/users/' + user.id,
      })
      .then(function(response){
        refresher();
        $uibModalInstance.close();
        toastr.success('Item excluido com sucesso');
      })
      .catch(function(response){
        $uibModalInstance.close();
        toastr.error('Não foi possivel excluir o item');
      });
    }

  }

})();