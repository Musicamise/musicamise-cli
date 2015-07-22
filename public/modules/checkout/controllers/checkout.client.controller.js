'use strict';

angular.module('checkout').controller('CheckoutController', ['$scope','$location','$timeout','$stateParams','Cart',
	function($scope,$location,$timeout,$stateParams,Cart) {
		// checkout controller logic
		// ...
		$scope.cartInit = function(){
			$scope.cart = {};

			$scope.cartCall = Cart.get();
			$scope.cartCall.$promise.then(function(cart,error,progressback){
					// console.log(p);
					if(!jQuery.isEmptyObject(cart.cart)){
						$scope.cart = cart.cart;
					}
				});
		};

		$scope.cartRemoveItem = function(id){
			if(id){	
				$scope.cartCall = Cart.removeItem({id:id});
				$scope.cartCall.$promise.then(function(cart,error,progressback){
					if(!jQuery.isEmptyObject(cart.cart)){
						$scope.cart = cart.cart;
					}
				});
			}
			$location.path('/cart');
			$scope.cartInit();	
		};
		$scope.updateQuantity = function(id,quantity){
			if(id){	
				$scope.cartCall = Cart.addItem({id:id,quantity:quantity});
				$scope.cartCall.$promise.then(function(cart,error,progressback){
					if(!jQuery.isEmptyObject(cart.cart)){
						$scope.cart = cart.cart;
					}
				});
			}
			$location.path('/cart');
			$scope.cartInit();	
		};
	}	
]);

 