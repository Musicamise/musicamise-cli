'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		// if ($scope.authentication.user) $location.path('/');
		$scope.$watch('user', function() { $scope.error = null; }, true);

		$scope.signup = function() {
			if(!$scope.user){
				$scope.error = 'Preencha o cadastro!';
			}else 
			if($scope.user.password!==$scope.user.repeatPassword){
				$scope.error = 'As senhas devem ser iguais';
			}else if($scope.user.password.length<6){
				$scope.error = 'A deve ter mais de 6 caracteres';
			}else{

				$http.post('/auth/signup', $scope.user).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;

					// And redirect to the index page
					$location.path('/');
				}).error(function(response) {
					$scope.error = response.message;
				});
			}

		};
		$scope.profile =function(){
			$scope.user = $scope.authentication.user;
		};
		// $scope.signin = function() {
		// 	$http.post('/auth/signin', $scope.credentials).success(function(response) {
		// 		// If successful we assign the response to the global user model
		// 		$scope.authentication.user = response;

		// 		// And redirect to the index page
		// 		$location.path('/');
		// 	}).error(function(response) {
		// 		$scope.error = response.message;
		// 	});
		// };
	}
]);
