(function() {

  angular
    .module('UseBike')
    .controller('LocationDeleteCtrl', ['$http','$rootScope','$scope','toastr','$uibModalInstance','refresher','location', LocationDeleteCtrl]);

  function LocationDeleteCtrl($http, $rootScope, $scope, toastr,$uibModalInstance,refresher,location) {
    
    $scope.itemName = 'Bicicleta';
    $scope.question = 'Tem certeza que deseja excluir o ponto de aluguel "' + location.name + '".';

    $scope.cancel = function(){
      $uibModalInstance.close();
    }

    $scope.confirm = function(){
      $http({
        method: 'PATCH',
        data: {isActive: false},
        url:'/api/locations/' + location.id,
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