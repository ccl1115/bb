'use strict';

/**
 * @ngdoc directive
 * @name bbApp.directive:accountSelect
 * @description
 * # accountSelect
 */
angular.module('bbApp.account.select', [])
  .controller('accountSelectCtrl', ['$scope', '$cookies', 'account', function($scope, $cookies, account) {
    $scope.accounts = account.accounts;
    $scope.userid = account.activated == undefined ? "无" : account.activated.userid;
    $scope.select = function(a) {
      console.log(a);
      account.activate(a);
      $scope.userid = account.activated.userid;
    };
  }])
  .directive('accountSelect', function() {
    return {
      restrict: 'A',
      templateUrl: 'views/tpls/account-select.html'
    };
  });
