'use strict';

describe('Service: account', function() {

  // load the service's module
  beforeEach(module('bbApp'));

  // instantiate service
  var account;
  beforeEach(inject(function(_account_) {
    account = _account_;
  }));

  it('should add/remove account', function() {
    // expect(!!account).toBe(true);
    account.add('test', 'test');
    expect(account.accounts.length).toBe(1);
    account.add('test', 'test2');
    expect(account.accounts.length).toBe(1);
    expect(account.activated.token).toBe('test2');

    account.add('test2', 'test2');
    expect(account.accounts.length).toBe(2);

    account.del({
      'userid': 'test2',
      'token': 'test2'
    });
    expect(account.accounts.length).toBe(1);
  });

});
