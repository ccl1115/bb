'use strict';

/**
 * @ngdoc function
 * @name bbApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the bbApp
 */
angular.module('bbApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/account', {
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl'
    })
  }])
  .controller('AccountCtrl', ['$scope', 'account', 'requester',
    function($scope, account, requester) {

      $scope.showForm = false;
      $scope.accounts = account.accounts;

      $scope.add = function() {
        $scope.showForm = !$scope.showForm;
      };

      $scope.login = function() {
        requester.request('login', [$scope.phone, $scope.password],
          function(data) {
            if (data.code == 0) {
              console.log(data);
              account.add(data.object.userId, data.object.token)
              $scope.showForm = false;
              $scope.accounts = account.accounts;
              $scope.$apply();
            }
          },
          function(data, status, headers, config) {
            console.log(data);
          });
      }

      $scope.delete = function(a) {
        account.del(a);
        $scope.accounts = account.accounts;
      }
    }
  ]);
