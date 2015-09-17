'use strict';

angular.module('users').controller('SettingsController', ['$rootScope','$scope', '$http', '$location', 'User', 'Authentication','Cep','blockUI',
	function($rootScope,$scope, $http, $location, User, Authentication,Cep,blockUI) {
	    window.scrollTo(0, 0);
		$scope.user = Authentication.user;
		$scope.notStared = '<i class="fa fa-star-o"></i> Gostei!';
		$scope.stared = '<i class="fa fa-star"></i> Remover!';
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.profile =function(){
			$scope.user = Authentication.user;
		};
		
		$scope.orderHistory = function(){
			$scope.newOrders = [];
			$scope.oldOrders = [];
			User.orderHistory().$promise.then(function(response,error,progressback){
				$scope.newOrders = response.newOrders;
				$scope.oldOrders = response.oldOrders;
			},function(reason){
				$location.path('/');
			});
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

		$scope.favoritos = function(){
			$scope.favoritosProducts = [];
			User.getFavoritos().$promise.then(function(response,error,progressback){
				$scope.favoritosProducts = response.products;
			},function(reason){

			});
		};

		$scope.like = function(productSlug){
			User.addWishList({productSlug:productSlug}).$promise.then(function(response){
				$scope.user = response;
			},function(reason){
				console.log(reason);
			});
		};
		$scope.dislike = function(productSlug){
			User.removeWishList({productSlug:productSlug}).$promise.then(function(response){
				$scope.user = response;
			},function(reason){
				console.log(reason);
			});
		};
		
		$scope.alreadyLiked = function(productSlug){
			if($scope.user){
				return $scope.user.wishList.indexOf(productSlug)>=0;
			}else{
				return false;
			} 
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
]).directive('myBar', function() {
	var statusOrderEnum = {
		'PAGO':3,
		'DISPONIVEL':4,
		'DEVOLVIDA':6,
		'CANCELADO':7
	};
	var statusEntregaEnum = {
	 	'SEMSTATUS':0,
		'PRODUCAO':1,
		'EMBALAGEM':2,
		'EMTRANSITO':3,
		'ENTREGUE':4
	};
	return {
    	restrict: 'E',
    	scope: {
    		order: '=order'
	    },
	    link: function(scope, element, attrs, tabsCtrl) {
	    	var order = scope.order;
	    	if(order.lastStatus&&statusOrderEnum[order.lastStatus]===3){
				var wizardDiv = $(element).find('.wizard');
				wizardDiv.show();
				wizardDiv.bootstrapWizard({onTabShow: function(tab, navigation, index) {
					var $total = navigation.find('li').length;
					var $current = statusEntregaEnum[order.statusEntrega];
					var $percent = ($current/$total) * 100;
					navigation.find('li').attr('class','disabled');
				 	navigation.find('li:lt('+$current+')').attr('class','active');
					navigation.parent().find('.bar').css({width:$percent+'%'});
				},
				'tabClass': 'nav nav-pills',
				onTabClick: function(tab, navigation, index) {
						return false;
					}
				});
			}else{
				$(element).find('.wizard').hide();
			}
	    },
    	templateUrl: 'modules/coreUsers/views/settings/order_status_bar.client.view.html'
  	};
});