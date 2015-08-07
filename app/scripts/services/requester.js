'use strict';

/**
 * @ngdoc service
 * @name bbApp.requester
 * @description
 * # requester
 * Factory in the bbApp.
 */
angular.module('bbApp.requester', ['bbApp.account', 'bbApp.version', 'bbApp.schema'])
  .factory('requester', ['$modal', 'account', 'version', 'schema', function($modal, account, version, schema) {
    var Requester = function() {

    };

    var proxy = "http://182.254.185.162:10000";

    Requester.prototype.sign = function(data) {
      if (_.isObject(data)) {
        var keys = _.sortBy(_.keys(data), function(key) {
          return key;
        });
        var payload = '';
        _.each(keys, function(element) {
          payload += element;
          payload += '=';
          payload += data[element];
        });
        payload += 'lanmei!!!';
        return hex_md5(payload);
      }
      return '';
    };

    Requester.prototype.request = function(schemaId, params, success, error) {
      var req = schema[schemaId];

      if (req !== undefined && params instanceof Array && req.params.length === params.length) {
        var data = {};
        for (var i = 0, size = req.params.length; i < size; i++) {
          data[req.params[i]] = params[i];
        }

        data.os = 'browser';
        data.os_version = '1';
        data.device = 'unknown';
        data.model = 'unknown';
        data.manufacturer = 'unknown';
        data.cityName = '';
        data.district = '';
        data.version = version;
        data.channel = 'web-client';
        data.lat = 0;
        data.lon = 0;
        data.imei = 0;
        data.cuid = 0;

        if (req.token) {
          data.userId = account.activated.userid;
          data.token = account.activated.token;
        }

        if (req.sign) {
          data.sign = this.sign(data);
        }

        var instance = $modal.open({
          templateUrl: 'loading.html'
        });

        var successWrapper = function(data) {
          instance.dismiss('cancel');
          success(data);
        };

        var errorWrapper = function(data) {
          instance.dismiss('cancel');
          error(data);
        };

        var request = {
          'type': req.method,
          'url': proxy + req.path,
          'data': data,
          'success': successWrapper,
          'error': errorWrapper,
          'dataType': 'json',
          'headers': {
            'x-target': req.host
          }
        };

        $.ajax(request);
      }
    };

    return new Requester();
  }]);
