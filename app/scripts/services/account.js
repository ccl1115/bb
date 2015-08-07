'use strict';


angular.module('bbApp.account', ['bbApp.account.select'])

.factory('account', ['$cookies', function($cookies) {
  var Account = function() {};

  var object = $cookies.getObject('accounts');
  Account.prototype.accounts = object === undefined ? [] : object;

  Account.prototype.activated = $cookies.getObject('activated');

  Account.prototype.add = function(userid, token) {
    for (var i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].userid === userid) {
        this.accounts[i].token = token;
        this.activated = this.accounts[i];
        $cookies.putObject('activated', this.activated);
        $cookies.putObject('accounts', this.accounts);
        return;
      }
    }

    var account = {
      'userid': userid,
      'token': token
    }

    this.activated = account;
    this.accounts.push(account);
    $cookies.putObject('accounts', this.accounts);
    $cookies.putObject('activated', this.activated);
  };

  Account.prototype.del = function(a) {
    for (var i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].userid === a.userid) {
        if (this.activated.userid === this.accounts[i].userid) {
          this.activated = undefined;
          $cookies.remove('activated');
        }
        this.accounts = _.without(this.accounts, this.accounts[i]);
        $cookies.putObject('accounts', this.accounts);
      }
    }

    if (this.accounts.length == 0) {
      $cookies.remove('accounts');
    }
  };

  Account.prototype.activate = function(a) {
    for (var i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].userid === a.userid) {
        this.activated = a;
        $cookies.putObject('activated', this.activated);
      }
    }
  };

  return new Account();
}]);
