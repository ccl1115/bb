'use strict';

/**
 * @ngdoc function
 * @name bbApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the bbApp
 */
angular.module('bbApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/feeds', {
      templateUrl: 'views/feeds.html',
      controller: 'FeedsCtrl'
    })
  }])
  .controller('FeedsCtrl', ['$scope', '$modal', '$cookies', 'account', 'requester',
    function($scope, $modal, $cookies, account, requester) {
      $scope.feeds = [];
      $scope.factoryId = 0;

      var obj = $cookies.getObject('feeds.recents');
      if (obj == undefined) {
        $scope.recents = [];
      } else {
        $scope.recents = obj;
      }

      $scope.page = 1;

      $scope.refresh = function(id) {
        if (id == undefined) {
          id = $scope.factoryId;
        } else {
          $scope.factoryId = id;
        }
        requester.request('feed_list', [id, $scope.page],
          function(data) {
            console.log(data);
            if (data.code == 0) {
              if ($scope.page == 1) {
                $scope.feeds = data.object.posts.lists;
                $scope.subInfo = data.object.subInfo;
              } else {
                $scope.feeds = _.union($scope.feeds, data.object.posts.lists);
                $scope.subInfo = data.object.subInfo;
              }
              if (!_.contains($scope.recents, $scope.factoryId)) {
                $scope.recents.push($scope.factoryId);
                $cookies.putObject('feeds.recents', $scope.recents);
              }
              $scope.$apply();
            }
          },
          function(data) {
            console.log(data)
          });
      };

      $scope.more = function() {
        $scope.page += 1;
        $scope.refresh();
      };

      $scope.praise = function(feed) {
        requester.request('post_praise', [feed.id],
          function(data) {
            console.log(data);
            if (data.code == 0) {
              feed.praised = 1;
              feed.countPraise += 1;
              $scope.$apply();
            }
          },
          function(data) {
            console.log(data);
          });
      };

      $scope.comments = function(feed) {
        console.log("show comment");
        var params = [feed.id, feed.isHot, feed.isRepost, feed.viewType, 1]
        $modal.open({
          templateUrl: 'commentsModal.html',
          controller: 'CommentsCtrl',
          resolve: {
            params: function() {
              return params;
            }
          }

        });
      };

      $scope.showPublish = function() {
        $modal.open({
          templateUrl: 'publishModal.html',
          controller: 'PublishCtrl',
          scope: $scope
        })
      }
    }
  ]);
