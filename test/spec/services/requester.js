'use strict';

describe('Service: requester', function () {

  // load the service's module
  beforeEach(module('bbApp'));

  // instantiate service
  var requester;
  beforeEach(inject(function (_requester_) {
    requester = _requester_;
  }));

  it('should do something', function () {
    expect(!!requester).toBe(true);
  });

});
