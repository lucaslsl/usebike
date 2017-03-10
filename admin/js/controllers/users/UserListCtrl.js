(function() {

  angular
    .module('UseBike')
    .controller('UserListCtrl', ['$http','$rootScope','$scope','toastr','$uibModal', UserListCtrl]);

  function UserListCtrl($http, $rootScope, $scope, toastr,$uibModal) {

    $scope.loadingUsers = true;

    $scope.users = [];

    $scope.pagination = {
      currentPage: 1,
      totalCount: 0,
      perPage: 8,
      totalCount: 0,
      maxSize: 5
    };

    var listusers = function(page){

      $http({
        method: 'GET',
        data: "",
        url:'/api/users/count'
      })
      .then(function(response){
        $scope.pagination.totalCount = parseInt(response.data.total);
        $http({
          method: 'GET',
          data: "",
          url:'/api/users?isActive=true',
          params: {limit: $scope.pagination.perPage, skip: (parseInt(page)-1) * $scope.pagination.perPage}
        })
        .then(function(response){
          $scope.users = response.data;
          $scope.loadingUsers = false;
        });
      });

    }

    listusers(1);

    $scope.pageChanged = function(){
      listusers($scope.pagination.currentPage);
    }


    $scope.delete = function(user){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/util/delete_modal.html',
        controller: 'UserDeleteCtrl',
        size: 'md',
        resolve: {
          user: function(){
            return user;
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
        templateUrl: 'templates/users/create_update.html',
        controller: 'UserCreateUpdateCtrl',
        size: 'md',
        resolve: {
          user: function(){
            return undefined;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

    $scope.edit = function(user){
      $rootScope.modal = $uibModal.open({
        animation: true,
        templateUrl: 'templates/users/create_update.html',
        controller: 'UserCreateUpdateCtrl',
        size: 'md',
        resolve: {
          user: function(){
            return user;
          },
          refresher: function(){
            return $scope.pageChanged;
          }
        }
      });
    }

  }

})();