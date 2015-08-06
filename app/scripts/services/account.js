'use strict';


angular.module('bbApp.account', ['bbApp.account.select'])

.factory('account', ['$cookies', function($cookies) {
  var Account = function() {};

  var object = $cookies.getObject('accounts');
  Account.prototype.accounts = object === undefined ? [] : object;

  Account.prototype.activated = $cookies.getObject('activated');

  Account.prototype.add = function(userid, token) {
    var account = {
      'userid': userid,
      'token': token
    };
    this.accounts.push(account);
    if (this.accounts.length === 1) {
      this.activated = account;
      $cookies.putObject('activated', this.activated);
    }
    $cookies.putObject('accounts', this.accounts);
  };

  Account.prototype.del = function(a) {
    this.accounts = _.without(this.accounts, a);
    $cookies.putObject('accounts', this.accounts);
  };

  Account.prototype.activate = function(a) {
    this.activated = a;
    $cookies.putObject('activated', this.activated);
  };

  return new Account();
}]);
