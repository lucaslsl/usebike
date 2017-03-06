(function() {

  angular
    .module('UseBike')
    .controller('BikeListCtrl', ['$http','$rootScope','$scope','toastr','$uibModal', BikeListCtrl]);

  function BikeListCtrl($http, $rootScope, $scope, toastr,$uibModal) {

    $scope.loadingBikes = true;

    $scope.bikes = [];

    $scope.pagination = {
      currentPage: 1,
      totalCount: 0,
      perPage: 8,
      totalCount: 0,
      maxSize: 5
    };

    var listBikes = function(page){

      $http({
        method: 'GET',
        data: "",
        url:'/api/bikes/count'
      })
      .then(function(response){
        $scope.pagination.totalCount = parseInt(response.data.total);
        $http({
          method: 'GET',
          data: "",
          url:'/api/bikes',
          params: {limit: $scope.pagination.perPage, skip: (parseInt(page)-1) * $scope.pagination.perPage}
        })
        .then(function(response){
          $scope.bikes = response.data;
          $scope.loadingBikes = false;
        });
      });

    }

    listBikes(1);

    $scope.pageChanged = function(){
      listBikes($scope.pagination.currentPage);
    }


    $scope.delete = function(vehicle){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/util/delete_modal.html',
        controller: 'VehicleDeleteCtrl',
        size: 'md',
        resolve: {
          vehicle: function(){
            return vehicle;
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
        templateUrl: 'templates/catalog/vehicle/create_update.html',
        controller: 'VehicleCreateUpdateCtrl',
        size: 'md',
        resolve: {
          vehicle: function(){
            return undefined;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

    $scope.edit = function(vehicle){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/catalog/vehicle/create_update.html',
        controller: 'VehicleCreateUpdateCtrl',
        size: 'md',
        resolve: {
          vehicle: function(){
            return vehicle;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

  }

})();