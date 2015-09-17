'use strict';

angular.module('users').controller('PasswordController', ['$rootScope','$scope', '$stateParams', '$http', '$location', 'Authentication','blockUI',
	function($rootScope,$scope, $stateParams, $http, $location, Authentication,blockUI) {
	    window.scrollTo(0, 0);
		$scope.authentication = Authentication;
		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		$scope.resetpassword = function(){
			$http.get('/auth/reset/'+$stateParams.token, {}).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.valid;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.valid;
				$location.path('/password/reset/invalid');

			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);