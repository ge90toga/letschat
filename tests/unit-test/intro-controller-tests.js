describe('Test Intro Controller', function () {

  var scope, controller, stateMock, UserServiceMock, deferredLogin, ionicPopupMock;

  beforeEach(module('chatlover.controllers'));

  beforeEach(inject(function ($rootScope,$controller,$q) {
    // instantiate LoginController
    scope = $rootScope.$new();
    deferredLogin = $q.defer();

    UserServiceMock = {
      loginUser: jasmine.createSpy('login spy')
        .and.returnValue(deferredLogin.promise)
    };

    stateMock = jasmine.createSpyObj('$state spy', ['go']);

    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

    controller = $controller('IntroCtrl', {
      '$scope':scope,
      '$state': stateMock,
      'UserService': UserServiceMock,
      '$ionicPopup': ionicPopupMock}
    );

  }));


  it('should have loggingIn to be false', function () {
    expect(scope.loggingIn).toEqual(false);

  });




  describe('#doLogin', function () {

    beforeEach(function () {
      scope.login();
    });

    it('should have UserService.loginUser called', function () {
      expect(UserServiceMock.loginUser).toHaveBeenCalled();
    });

    it('if login succeeded, should go to state app.search', function () {
      deferredLogin.resolve();
      scope.$digest();
      expect(stateMock.go).toHaveBeenCalledWith('app.search');
    });

    it('if login failed, should popup dialog', function () {
      deferredLogin.reject();
      scope.$digest();
      expect(ionicPopupMock.alert).toHaveBeenCalled();
    });


  });










});
