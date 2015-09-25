'use strict';

angular.module('checkout').controller('CheckoutController', ['$rootScope','$window','$scope','$location','$timeout','$stateParams','OrderCheckout','Authentication','UserCheckout','Cep','blockUI', 
	function($rootScope,$window,$scope,$location,$timeout,$stateParams,OrderCheckout,Authentication,UserCheckout,Cep,blockUI) {
		// checkout controller logic
		// ...
	    window.scrollTo(0, 0);

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
			$scope.user = ($scope.Authentication.user)? $scope.Authentication.user : {};
			
			if($location.search().edit&&
				$rootScope.order&&
				$rootScope.order.shippingAddress&&
				$rootScope.order.user){
				$scope.address = $rootScope.order.shippingAddress;
				$scope.user = $rootScope.order.user;
			}
			$scope.address.blockAll = true;

			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				// console.log(p);
				if(response.order.products.length>0){
					$rootScope.order = response.order;
				}else{
					$location.path('/products');
				}
			});

		};

		$scope.isEmpty = function (obj) {
		    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
		    return true;
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
		$scope.submitShipping = function(address,userModel){
			if(address&&userModel){
				//save or update address for user!
				if(address.saveaddress||address.openAddressForm&&address._id!==undefined){
					$scope.shippingCall = UserCheckout.updateAddress({address:address});
					$scope.shippingCall.$promise.then(function(response,error,progressback){
						if(response){
							console.log(response); 
							$scope.user = response;
							$window.user= response;
						}
					},function(reason){
						console.log('Save user\'s address Failed: ' + reason.message);
					});
				}

				// add address on order
				var deliveryAddress = {address:address,user:userModel};
				if($rootScope.order.address===undefined){
					$scope.orderCall = OrderCheckout.addDeliveryAddress(deliveryAddress);
					$scope.orderCall.$promise.then(function(response,error,progressback){
						if(!jQuery.isEmptyObject(response.order)){
							$rootScope.order = response.order;
						}
						$location.search({});
						$location.path('/review');

					}, function(reason) {
					  	alert('Um erro aconteceu por favor tente novamente');
						$location.path('/shipping');
					});
				}

			}else{
				$location.path('/shipping');
			}

		};

		$scope.checkout = function(){
			$scope.Authentication = Authentication;

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

		$scope.reviewOrder = function(){
			$scope.Authentication = Authentication;

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
			blockUI.start();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				 if(response.url){

				  	$scope.isOpenLightbox = new PagSeguroLightbox({
			            code: response.code,
			        	},{
			            success : function(transactionCode) {
			                        alert('obrigado pela compra');
			                        $location.path('/thank-you');
			                      },
			            abort : function() {
			                    alert('Continue comprando.');
			            }
			        });
					if (!$scope.isOpenLightbox){
					 	$window.location = response.url;
					}
				 }else{
					 console.log(response);
					 alert(response);
				 }
				 blockUI.stop();
			}, function(reason) {
				blockUI.stop();
			  	console.log('Failed: ' + reason.data.message);
			  	alert('Aconteceu um erro inesperado, por favor tenta novamente.');
				$location.path('/shipping');
			});
		}; 
		
		$scope.cartRemoveItem = function(id){
			if(id){	
				blockUI.start();
				$scope.orderCall = OrderCheckout.removeItem({id:id});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
					blockUI.stop();
				},function(reason){
					console.log(reason);
					blockUI.stop();
				});
			}
			$location.path('/cart');
			$scope.cartInit();	
		};
		$scope.updateQuantity = function(id,quantity){
			if(id){	
				if(quantity<5){
					blockUI.start();
					$scope.orderCall = OrderCheckout.addItem({id:id,quantity:quantity});
					$scope.orderCall.$promise.then(function(response,error,progressback){
						if(!jQuery.isEmptyObject(response.order)){
							$rootScope.order = response.order;
						}
						blockUI.stop();
					},function(reason){
						console.log(reason);
						blockUI.stop();
					});
				} 
			}
			$location.path('/cart');
		};
		$scope.applyDiscount = function(discountCode){
			if(discountCode||discountCode!==''){	
				blockUI.start();
				$scope.orderCall = OrderCheckout.addDiscountCode({discountCode:discountCode});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
					blockUI.stop();
				},function(reason){
					console.log(reason);
					blockUI.stop();
				});
			}
			$location.path('/cart');
		};

		$scope.applyShippingAddress = function(cep){
			if(cep||cep!==''){	
				blockUI.start();
				var address = {};
				address.cep = cep;
				var deliveryAddress = {address:address};
				deliveryAddress.checkPriceForDelivery = true;
				$scope.orderCall = OrderCheckout.addDeliveryAddress(deliveryAddress);
				$scope.orderCall.$promise.then(function(response,error,progressback){
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
					blockUI.stop();
				},function(reason){
					console.log(reason);
					blockUI.stop();
				});
			}
			$location.path('/cart');
		};
		
		$scope.thankyou = function(){
			if(!$location.search().id){
				$location.path('/');	
			} 

			OrderCheckout.clean().$promise.then(function(response,error,progressback){
				 //if(!response.order.pagSeguroInfo){
				// 	$location.url($location.path('/'));
				// }
				OrderCheckout.get().$promise.then(function(response,error,progressback){
					// console.log(p);
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
				});
			});
		};
	}	
]);

 