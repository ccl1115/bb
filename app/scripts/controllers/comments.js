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
    };
  })
  .controller('CommentsCtrl', ['$scope', 'requester', 'params',
    function($scope, requester, params) {
      $scope.comments = [];
      $scope.loading = false;
      $scope.postContent = "";
      $scope.realname = true;

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
        requester.request('post_comment', [$scope.postContent, params[0], $scope.realname ? 1 : 0],
          function(data) {
            console.log(data);
            if (data.code === 0) {
              $scope.fetch();
            }
            $scope.postContent = '';
            $scope.loading = false;
            $scope.$apply();
          },
          function(data) {
            console.log(data);
            $scope.loading = false;
            $scope.$apply();
          });
      };

      $scope.fetch();
    }
  ]);
