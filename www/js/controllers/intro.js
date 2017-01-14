var mod = angular.module('tvchat.controllers.intro', []);

mod.controller('IntroCtrl', function ($scope, $state, UserService) {

	$scope.loggingIn = false;

	$scope.login = function () {
		if (!$scope.loggingIn) {
			$scope.loggingIn = true; // Prevent User From Pressing log in multiple times
			UserService.loginUser().then(function () {
					$scope.loggingIn = false;
			    $state.go('app.search');
		   });
		}
	}
});
