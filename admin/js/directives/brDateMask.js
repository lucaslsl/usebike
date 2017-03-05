(function() {
  'use strict';

  angular
      .module('UseBike')
      .directive('brDateMask', brDateMask);

  function brDateMask() {
    return{
        require: "ngModel",
        link: function(scope, elm, attrs, ctrl) {
          scope.$watch(attrs.ngModel, function(newVal, oldVal) {
            if(newVal!==undefined){
              var date = moment(newVal).format('DD/MM/YYYY');
              elm.text(date);
            }
          });

        }
    };
  }

})();