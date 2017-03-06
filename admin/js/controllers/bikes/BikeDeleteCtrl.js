(function() {

    angular
        .module('UseBike')
        .controller('BikeDeleteCtrl', ['$http','$rootScope','$scope','toastr','$uibModalInstance','refresher','bike', BikeDeleteCtrl]);

    function BikeDeleteCtrl($http, $rootScope, $scope, toastr,$uibModalInstance,refresher,bike) {
        
        $scope.itemName = 'Bicicleta';
        $scope.question = 'Tem certeza que deseja excluir a bicicleta com número de identificação "' + bike.bin + '".';

        $scope.cancel = function(){
            $uibModalInstance.close();
        }

        $scope.confirm = function(){
            $http({
                method: 'DELETE',
                data: "",
                url:'/api/bikes/' + bike.id,
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