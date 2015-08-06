'use strict';

/**
 * @ngdoc function
 * @name bbApp.controller:PublishCtrl
 * @description
 * # PublishCtrl
 * Controller of the bbApp
 */
angular.module('bbApp')

.controller('PublishCtrl', ['$scope', 'requester', function($scope, requester) {
  $scope.realName = true;
  $scope.publish = function() {
    requester.request('publish', ["", "ffffffff", $scope.content, $scope.factoryId, $scope.realName ? 1 : 0, 0],
      function(data) {
        console.log(data);
        if (data.code == 0) {
          $scope.refresh();
        }
      },
      function(data) {
        console.log(data);
        ngDialog.close();
      });
  }
}]);
