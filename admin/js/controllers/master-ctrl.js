/**
 * Master Controller
 */

angular.module('UseBike')
  .controller('MasterCtrl', ['$scope', '$cookieStore', '$rootScope', '$http', '$state','$breadcrumb', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $rootScope, $http, $state, $breadcrumb) {
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

  $scope.breadcrumbLast = function(){
    return $breadcrumb.getLastStep().ncyBreadcrumbLabel;
  }

  if($rootScope.user === undefined || $rootScope.user.id === undefined){
    $http({
      method: 'GET',
      data: '',
      url:'/api/me'
    })
    .then(function(response){
      if(response.data.isAdmin){
        $rootScope.user = response.data;
        $scope.user = $rootScope.user;
      }else{
        $state.go('login');
      }
    })
    .catch(function(response){
      $state.go('login');
    });
  }else{
    $scope.user = $rootScope.user;
  }

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