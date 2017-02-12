var mod = angular.module('chatlover.controllers.intro', []);

mod.controller('IntroCtrl', function ($scope, $state, UserService, $ionicPopup) {

  $scope.loggingIn = false;

  $scope.login = function () {
    if (!$scope.loggingIn) {
      $scope.loggingIn = true; // Prevent User From Pressing log in multiple times
      UserService.loginUser().then(
        function onSuccess() {
          $scope.loggingIn = false;
          $state.go('app.search');
        },

        function onError() {
          $scope.failurePopUp();
        });
    }
  };

  $scope.failurePopUp = function () {
    $ionicPopup.alert({
      title: "Facebook Error",
      template: 'Failed to login with facebook'
    });
  };


});
