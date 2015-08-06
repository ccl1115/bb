'use strict';

describe('Controller: FeedsCtrl', function () {

  // load the controller's module
  beforeEach(module('bbApp'));

  var FeedsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedsCtrl = $controller('FeedsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FeedsCtrl.awesomeThings.length).toBe(3);
  });
});
