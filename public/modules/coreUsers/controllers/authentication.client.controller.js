'use strict';

angular.module('users').controller('AuthenticationController', ['$rootScope','$scope', '$http', '$location', 'Authentication','blockUI','User','$window',
	function($rootScope,$scope, $http, $location, Authentication,blockUI,User,$window) {
		$scope.authentication = Authentication;
	    $scope.redirect = $location.search().redirect;
	    window.scrollTo(0, 0);
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');
		//$scope.$watch('user', function() { $scope.error = null; }, true);

		$scope.signup = function() {
			if(!$scope.user){
				$scope.error = 'Preencha o cadastro!';
			}else 
			if($scope.user.repeatPassword.length<7) {
				$scope.error = 'A deve ter mais de 7 caracteres';
			}else if($scope.user.password!==$scope.user.repeatPassword){
				$scope.error = 'As senhas devem ser iguais';
			}else{

				$http.post('/auth/signup', $scope.user).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;

					if($location.search().redirect){
						$location.path($location.search().redirect);
						$location.search({});
					}else{
						$location.path('/');
					}
					// And redirect to the index page

				}).error(function(response) {
					$scope.error = response.message;
				});
			}

		};
		
		$scope.login = function(user){
			User.signin(user).$promise.then(function(userResponse,error,progressback){
				// console.log(p);
				if(error){
					console.log(error);
				}else if(!jQuery.isEmptyObject(userResponse)){
					console.log(userResponse);
					$scope.authentication.user = userResponse;
				}

				if($location.search().redirect){
					// var url = window.location.href; 
					// $window.location.href = url;
					$location.path($location.search().redirect);
					$location.search({});
				}else{
			 		$window.location.reload();
				}
			 	// $route.reload();
			},function(err){
				$scope.login_error = err.data.message;
				console.log(err);
			});
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
