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
          url:'/api/bikes?isActive=true',
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


    $scope.delete = function(bike){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/util/delete_modal.html',
        controller: 'BikeDeleteCtrl',
        size: 'md',
        resolve: {
          bike: function(){
            return bike;
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
        templateUrl: 'templates/bikes/create_update.html',
        controller: 'BikeCreateUpdateCtrl',
        size: 'md',
        resolve: {
          bike: function(){
            return undefined;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

    $scope.edit = function(bike){
      var b = angular.copy(bike);
      b.currentLocation = b.currentLocation.id;
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/bikes/create_update.html',
        controller: 'BikeCreateUpdateCtrl',
        size: 'md',
        resolve: {
          bike: function(){
            return b;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

  }

})();