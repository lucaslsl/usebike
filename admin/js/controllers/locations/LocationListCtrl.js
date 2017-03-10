(function() {

  angular
    .module('UseBike')
    .controller('LocationListCtrl', ['$http','$rootScope','$scope','toastr','$uibModal', LocationListCtrl]);

  function LocationListCtrl($http, $rootScope, $scope, toastr,$uibModal) {

    $scope.loadingLocations = true;

    $scope.locations = [];

    $scope.pagination = {
      currentPage: 1,
      totalCount: 0,
      perPage: 8,
      totalCount: 0,
      maxSize: 5
    };

    var listLocations = function(page){

      $http({
        method: 'GET',
        data: "",
        url:'/api/locations/count'
      })
      .then(function(response){
        $scope.pagination.totalCount = parseInt(response.data.total);
        $http({
          method: 'GET',
          data: "",
          url:'/api/locations?isActive=true',
          params: {limit: $scope.pagination.perPage, skip: (parseInt(page)-1) * $scope.pagination.perPage}
        })
        .then(function(response){
          $scope.locations = response.data;
          $scope.loadingLocations = false;
        });
      });

    }

    listLocations(1);

    $scope.pageChanged = function(){
      listLocations($scope.pagination.currentPage);
    }


    $scope.delete = function(location){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/util/delete_modal.html',
        controller: 'LocationDeleteCtrl',
        size: 'md',
        resolve: {
          location: function(){
            return location;
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
        templateUrl: 'templates/locations/create_update.html',
        controller: 'LocationCreateUpdateCtrl',
        size: 'md',
        resolve: {
          location: function(){
            return undefined;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

    $scope.edit = function(location){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/locations/create_update.html',
        controller: 'LocationCreateUpdateCtrl',
        size: 'md',
        resolve: {
          location: function(){
            return location;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

  }

})();