'use strict';


angular.module('checkout').factory('OrderCheckout', ['$resource',
	function($resource) {
		return $resource('api/order/:action', {
			action: '@action'
			},{'removeItem': {
						method: 'POST', 
						isArray: false,
						params:{action:'removeItem'}
						
         		},'addItem': {
						method: 'POST', 
						isArray: false,
						params:{action:'updateOrderOrAddItem'}
         		},'addDiscountCode': {
						method: 'POST', 
						isArray: false,
						params:{action:'updateOrderOrAddItem'}
         		},'pagseguro': {
						method: 'GET', 
						isArray: false,
						params:{action:'pagseguro'}
         		},'addDeliveryAddress': {
						method: 'POST', 
						isArray: false,
						params:{action:'addDeliveryAddress'},
						// interceptor: {
			   //              response: function (data) {
			   //                  console.log('response in interceptor', data);
			   //              },
			   //              responseError: function (data) {
			   //                  console.log('error in interceptor', data);
			   //              }
			   //          }
         		}
     		}
 		);
	}
]);

angular.module('checkout').factory('Cep', ['$resource',
	function($resource) {
		return $resource('http://cep.correiocontrol.com.br/:cep.json', {
			cep:'@cep',
			},{'get': {
					method: 'GET', 
					isArray: false
         		}
     		}
 		);
	}
]);

angular.module('checkout').factory('UserCheckout', ['$resource',
	function($resource) {
		return $resource(':auth/:action/:token', {
			auth:'@auth',
			action: '@action',
			token: '@token',
			},{'signin': {
						method: 'POST', 
						isArray: false,
						params:{action:'signin',auth:'auth'}
						
         		},'signout': {
						method: 'GET', 
						isArray: false,
						params:{action:'signout',auth:'auth'}
         		},'signup': {
						method: 'POST', 
						isArray: false,
						params:{action:'signup',auth:'auth'}
         		},'updateAddress':{
         				method: 'PUT', 
						isArray: false,
						params:{action:'updateAddress',auth:'users'}
         		}
     		}
 		);
	}
]);