var mod = angular.module('chatlover.controllers.search', []);

mod.controller('SearchCtrl', function ($scope, $state, $stateParams, $ionicListDelegate, UserService, FriendService) {


  $scope.friendService = FriendService;
  $scope.userService = UserService;
  $scope.cur_uid = UserService.current.userId;

  // userService.current.userId
  // The filter criteria
  $scope.search = {
    'username': ''
  };

  $scope.$on("$ionicView.enter", function () {
    console.log("SearchCtrl:: SearchCtrl enter");
    $scope.friendService.load();
  });



});
