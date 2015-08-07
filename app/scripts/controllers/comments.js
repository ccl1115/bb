'use strict';

/**
 * @ngdoc function
 * @name bbApp.controller:CommentsCtrl
 * @description
 * # CommentsCtrl
 * Controller of the bbApp
 */
angular.module('bbApp')
  .filter('color', function() {
    return function(input) {
      return input.slice(2);
    }
  })
  .controller('CommentsCtrl', ['$scope', '$modal', 'requester', 'params',
    function($scope, $modal, requester, params) {
      $scope.comments = [];

      console.log(params);

      $scope.fetch = function() {
        $scope.loading = true;
        requester.request('post_comments', params,
          function(data) {
            console.log(data);
            $scope.loading = false;
            $scope.comments = data.object.comments.lists;
            $scope.$apply();
          },
          function(data) {
            console.log(data);
            $scope.loading = false;
            $scope.$apply();
          });
      };

      $scope.postComment = function() {
        $scope.loading = true;
        requester.request('post_comment', [$scope.text, params[0], 0],
          function(data) {
            console.log(data);
            if (data.code == 0) {
              $scope.text = '';
              $scope.fetch();
            }
          },
          function(data) {
            console.log(data);
          });
      }

      $scope.fetch();
    }
  ]);
