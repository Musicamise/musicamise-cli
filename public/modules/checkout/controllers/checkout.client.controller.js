'use strict';

angular.module('checkout').controller('CheckoutController', ['$rootScope','$scope','$location','$timeout','$stateParams','OrderCheckout','Authentication','UserCheckout',
	function($rootScope,$scope,$location,$timeout,$stateParams,OrderCheckout,Authentication,UserCheckout) {
		// checkout controller logic
		// ...
		$scope.Authentication = Authentication;
		$scope.cartInit = function(){

			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				// console.log(p);
				if(!jQuery.isEmptyObject(response.order)){
					$rootScope.order = response.order;
				}
			});
		};
		$scope.shipping = function(){
			$scope.address = {};
			$scope.user = $scope.Authentication.user;

			// $scope.orderCall = OrderCheckout.get();
			// $scope.orderCall.$promise.then(function(response,error,progressback){
			// 	// console.log(p);
			// 	if(response.order.products.length>0){
			// 		$rootScope.order = response.order;
			// 	}else{
			// 		$location.path('/products');
			// 	}
			// });

		};
		$scope.selectDeliveryAddress = function(selectedSavedAddress){
			// $scope.address = 

			$scope.address = $scope.user.address.filter(
										function(e){
												return e._id+''===selectedSavedAddress	;
										}
				);
			if($scope.address.length>0){
				this.address = $scope.address[0];
				this.address.openAddressForm = undefined;
			}

		};
		$scope.submitShipping = function(address){
			if(address&&$scope.Authentication.user){
				//save or update address for user!
				if(address.saveaddress||address.openAddressForm&&address._id!==undefined){
					$scope.shippingCall = UserCheckout.updateAddress({address:address});
					$scope.shippingCall.$promise.then(function(response,error,progressback){
						if(response){
							console.log(response); 
						}
					},function(reason){
						console.log('Save user address Failed: ' + reason.message);
					});
				}

				//add address on order
				// var deliveryAddress = {address:address};
				// if($rootScope.order.address===undefined){
				// 	$scope.orderCall = OrderCheckout.addDeliveryAddress(deliveryAddress);
				// 	$scope.orderCall.$promise.then(function(response,error,progressback){
				// 		if(!jQuery.isEmptyObject(response.order)){
				// 			$rootScope.order = response.order;
				// 		}
				// 		$location.path('/review');

				// 	}, function(reason) {
				// 	  	console.log('Failed: ' + reason);
				// 		//$location.path('/review'); todo error 
				// 	});
				// }

			}else{
				$location.path('/shipping');
			}

		};

		$scope.checkout = function(){
			$scope.Authentication = Authentication;
			$rootScope.order = {};

			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				// console.log(p);
				if(response.order.products.length>0){
					$rootScope.order = response.order;
					if($scope.Authentication.user){
						$location.path('/shipping');
					}else{
						$location.path('/checkout');
					}
				}else{
					$location.path('/products');
				}
			});
		}; 

		$scope.reviewOrder = function(){
			$scope.Authentication = Authentication;
			$rootScope.order = {};

			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				if(response.order.products.length>0){
					$rootScope.order = response.order;

					if($rootScope.order.user&&$rootScope.order.shippingAddress){
						$location.path('/review');
					}else{
						$location.path('/checkout');
					}
				}else{
					$location.path('/products');
				}
			});
		}; 

		$scope.submitOrder = function(){
			$scope.Authentication = Authentication;

			$scope.orderCall = OrderCheckout.pagseguro();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				 if(response.url){
					 window.location = response.url;
				 }else{
					 console.log(response);
				 }
			}, function(reason) {
			  	console.log('Failed: ' + reason);
				//$location.path('/review'); todo error 
			});
		}; 
		
		$scope.cartRemoveItem = function(id){
			if(id){	
				$scope.orderCall = OrderCheckout.removeItem({id:id});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
				});
			}
			$location.path('/cart');
			$scope.cartInit();	
		};
		$scope.updateQuantity = function(id,quantity){
			if(id){	
				$scope.orderCall = OrderCheckout.addItem({id:id,quantity:quantity});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
				});
			}
			$location.path('/cart');
		};
		
		$scope.thankyou = function(){
			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				if(!jQuery.isEmptyObject(response.order)){
					$rootScope.order = response.order;
				}
			});
		};
	}	
]);

 