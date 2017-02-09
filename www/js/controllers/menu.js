var mod = angular.module('chatlover.controllers.menu', []);

mod.controller('MenuCtrl', function($scope, $state, UserService) {

	$scope.user = UserService;

	$scope.logout = function () {
		UserService.logoutUser();
		$state.go('intro');
	};

});
