'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'User', 'Authentication','Cep','blockUI',
	function($scope, $http, $location, User, Authentication,Cep,blockUI) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.profile =function(){
			$scope.user = Authentication.user;
		};

		$scope.getAddress = function(cep){
			Cep.get({cep:cep}).$promise.then(function(response,error,progressback){
				$scope.address.bairro = response.bairro;
				$scope.address.address = response.logradouro;
				$scope.address.city  = response.localidade;
				$scope.address.state = response.uf;
			},function(reason){
				$scope.address.blockAll = false;
			});
		};


		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new User($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};
		$scope.changePassword = function(passwordDetails){
			if(passwordDetails&&Authentication.user){
				//save or update address for user!
				$scope.userCall = User.changePassword(passwordDetails);
				$scope.userCall.$promise.then(function(response,error,progressback){
					$scope.successPassword = 'Salvo com sucesso!';
					$scope.user = response;
					// $scope.profile();
				},function(reason){
					$scope.errorPassword = reason.data.message;
				});

			}else{
				$location.path('/profile');
			}
		};
		$scope.editUser = function(user){
			if(user&&Authentication.user){
				//save or update address for user!
				$scope.userCall = User.updateUser(user);
				$scope.userCall.$promise.then(function(response,error,progressback){
					$scope.successUser = 'Salvo com sucesso!';
					$scope.user = response;
					// $scope.profile();
				},function(reason){
					$scope.errorUser = 'Erro ao salvar!';
				});

			}else{
				$location.path('/profile');
			}
		};
		$scope.addOrEditAddress = function(address){
			if(address&&Authentication.user){
				//save or update address for user!
				$scope.userCall = User.updateAddress({address:address});
				$scope.userCall.$promise.then(function(response,error,progressback){
					$scope.successAddress = 'Salvo com sucesso!';
					$scope.user = response;
					// $scope.profile();
				},function(reason){
					$scope.errorAddress = 'Erro ao salvar!';
				});

			}else{
				$location.path('/profile');
			}
		};
		$scope.removeAddress = function(address){
			if(address&&Authentication.user){
				//save or update address for user!
				$scope.userCall = User.removeAddress({address:address});
				$scope.userCall.$promise.then(function(response,error,progressback){
					$scope.successAddress = 'Removido com sucesso!';
					$scope.user = response;
					// $scope.profile();
				},function(reason){
					$scope.errorAddress = 'Erro ao salvar!';
				});

			}else{
				$location.path('/profile');
			}
		};
		$scope.bindAddress = function(address){
			$scope.successAddress = '';
			$scope.errorAddress = '';

			$scope.address = address;
		};
		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);