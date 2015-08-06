'use strict';

/**
 * @ngdoc service
 * @name bbApp.schema
 * @description
 * # schema
 * Value in the bbApp.
 */
var secondHost = 'http://client.lanmeiquan.com';
angular.module('bbApp.schema', [])
  .value('schema', {
    'login': {
      'method': 'POST',
      'path': '/passport/login',
      'sign': true,
      'token': false,
      'params': ['phone', 'password'],
      'host': secondHost
    },
    'logout': {
      'method': 'POST',
      'path': '/passport/logout',
      'sign': true,
      'token': true,
      'params': ['userid', 'token'],
      'host': secondHost
    },
    'feed_list': {
      'method': 'POST',
      'path': '/feed/lists',
      'sign': true,
      'token': true,
      'params': ['factoryId', 'currPage'],
      'host': secondHost
    },
    'post_praise': {
      'method': 'POST',
      'path': '/commit/post/praise',
      'sign': true,
      'token': true,
      'params': ['postId'],
      'host': secondHost
    },
    'post_comments': {
      'method': 'POST',
      'path': '/comment/lists',
      'sign': true,
      'token': true,
      'params': ['postId', 'isHot', 'isRepost', 'viewType', 'currPage'],
      'host': secondHost
    },
    'post_comment': {
      'method': 'POST',
      'path': '/commit/comment/create',
      'sign': true,
      'token': true,
      'params': ['content', 'postId', 'realName'],
      'host': secondHost
    },
    'publish': {
      'method': 'POST',
      'path': '/commit/post/create',
      'sign': true,
      'token': true,
      'params': ['bgUrl', 'bgColor', 'content', 'factoryId', 'realName', 'sendType'],
      'host': secondHost
    }
  });
