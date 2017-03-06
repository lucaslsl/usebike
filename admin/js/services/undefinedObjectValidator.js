    angular
      .module('UseBike')
      .factory('undefinedObjectValidator', function () {
    return {
      name: 'undefinedObjectValidator', 
      validate: function (value, arguments) {
        // console.log(value);

        return value !== undefined;
      }
    };
  });