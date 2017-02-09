var mod = angular.module('chatlover.controllers.show', []);

mod.controller('ShowCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, $ionicScrollDelegate, UserService, ChatService) {

  $scope.scrolldown = function () {
    $ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
  };

  $scope.user = UserService;
  $scope.chatService = ChatService;

  $scope.data = {
    message: '',
    loading: true,
    showInfo: false
  };

  $scope.sendMessage = function () {
    console.log("ShowCtrl::sendMessage()");
    var sendData = {
      text: $scope.data.message,
      from_username: firebase.auth().currentUser.displayName,
      from_userId: firebase.auth().currentUser.uid,
      to_user_id: $scope.to_uid,
      profilePic: firebase.auth().currentUser.photoURL
    };
    $scope.chatService.sendMessage(sendData);
    $scope.data.message = '';
  };

  $scope.$on("$ionicView.enter", function () {
    console.log("ShowCtrl::Entering view");
    $scope.data.loading = true;
    $scope.cur_uid = UserService.current.userId;
    $scope.to_uid = $stateParams.to_uid;
    $scope.chatService.load($scope.cur_uid, $scope.to_uid, $scope.scrolldown).then(function () {
      $scope.data.loading = false;
      $scope.scrolldown();
    });
  });

  $scope.$on("$ionicView.afterLeave", function () {
    console.log("Leaving view");
    $scope.chatService.destroy();
  });


  // Why this doesn't work ???
  // $scope.$watch('chatService.getMessages()', function () {
  //   if(!$scope.loading){
  //     console.log("ShowCtrl::Message is updated");
  //     $ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
  //   }
  // });


});

