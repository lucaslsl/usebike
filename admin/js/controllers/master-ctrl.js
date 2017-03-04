/**
 * Master Controller
 */

angular.module('UseBike')
  .controller('MasterCtrl', ['$scope', '$cookieStore', '$rootScope', '$http', '$state', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $rootScope, $http, $state) {
  /**
   * Sidebar Toggle & Cookie Control
   */
  var mobileView = 992;

  $scope.getWidth = function() {
    return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
      } else {
        $scope.toggle = true;
      }
    } else {
      $scope.toggle = false;
    }

  });

  $scope.toggleSidebar = function() {
    $scope.toggle = !$scope.toggle;
    $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
    $scope.$apply();
  };

  $scope.user = $rootScope.user;

  console.log($rootScope.user);

  $scope.logout = function(){
    $http({
      method: 'PUT',
      data: '',
      url:'/api/me/logout'
    })
    .then(function(response){
      $rootScope.user = {};
      $state.go('login');
    })
    .catch(function(response){
      toastr.error('Um erro ocorreu. Tente novamente.');
    });
  }



}