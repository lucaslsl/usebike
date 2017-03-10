(function() {

  angular
    .module('UseBike')
    .controller('BikeCreateUpdateCtrl', ['$http','$rootScope','$scope','toastr','$uibModalInstance','refresher','bike', BikeCreateUpdateCtrl]);

  function BikeCreateUpdateCtrl($http, $rootScope, $scope, toastr,$uibModalInstance,refresher,bike) {
    
    $scope.isUpdate = false;

    $scope.validationError = '';

    $scope.bike = {};



    if(bike!==undefined){
      $scope.isUpdate = true;
      $scope.bike = bike;
    }

    $scope.loadingLocations = true;
    $scope.locations = [];

    $http({
      method: 'GET',
      data: "",
      url:'/api/locations/count'
    })
    .then(function(response){
      var totalCount = parseInt(response.data.total);

      var numberOfPages = Math.ceil(totalCount/30);
      var alllocations = []
      for(var i=1;i<=numberOfPages;i++){
          alllocations.push($http({
              method: 'GET',
              data: "",
              url:'/api/locations',
              params: {limit: 30, skip: (parseInt(i)-1) * 30}
          }));
      }
      Promise.all(alllocations).then(function(data){
          $scope.locations = [];
          _.forEach(data,function(res){
            $scope.locations = $scope.locations.concat(res.data);
          });

          $scope.loadingLocations = false;

          // if(!$scope.isUpdate && $scope.locations.length>0){
          //   $scope.bike.currentLocation = $scope.locations[0].id;
          // }

      });
      
    });


    $scope.cancel = function(){
      $uibModalInstance.close();
    }


    $scope.confirm = function(form){
      if(form.$valid){
        var data = angular.copy($scope.bike);
        // data.currentLocation = data.currentLocationObj.id;
        if($scope.isUpdate){
          $http({
            method: 'PATCH',
            data: _.omit(data,['id']),
            url:'/api/bikes/' + data.id,
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
            url:'/api/bikes',
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