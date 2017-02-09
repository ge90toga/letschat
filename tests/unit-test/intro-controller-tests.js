describe('Test Intro Controller', function () {

  var scope, controller, stateMock, UserServiceMock;
  beforeEach(module('chatlover.controllers'));

  beforeEach(inject(function ($rootScope,$controller) {
    // instantiate LoginController
    scope = $rootScope.$new();
    controller = $controller('IntroCtrl', {
      '$scope':scope,
      '$state': stateMock,
      'UserService': UserServiceMock }
    );

  }));

  // tests start here
  it('should have loggingIn to be false', function () {
    expect(scope.loggingIn).toEqual(false);
  });



});
