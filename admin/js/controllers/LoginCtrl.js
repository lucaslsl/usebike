(function() {

  angular
    .module('UseBike')
    .controller('LoginCtrl', ['$http','$rootScope','$scope','toastr','$state', LoginCtrl]);

  function LoginCtrl($http, $rootScope, $scope, toastr,$state) {

    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.signin = function(){
      if($scope.credentials.email.length>0 && $scope.credentials.password.length>0){
        $http({
          method: 'PUT',
          data: $scope.credentials,
          url:'/api/user/login'
        })
        .then(function(response){
          $http({
            method: 'GET',
            data: '',
            url:'/api/me'
          })
          .then(function(response){
            $rootScope.user = response.data;
            $state.go('base');
          })
        })
        .catch(function(response){
          toastr.error('Credenciais inválidas!');
        });
      }
    }

  }

})();