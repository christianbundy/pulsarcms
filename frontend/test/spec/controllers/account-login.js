'use strict';

describe('Controller: AccountLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('robcolbertApp'));

  var AccountLoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountLoginCtrl = $controller('AccountLoginCtrl', {
      $scope: scope
    });
  }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});