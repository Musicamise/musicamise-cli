'use strict';

angular.module('core').factory('MainMenu',['$resource',
	function($resource) {
		return $resource('api/mainmenu/', {
			},{'query': {
					method: 'GET', 
					isArray: false,
         		} 
     		}
 		);
	}
]);
angular.module('users').factory('User', ['$resource',
	function($resource) {
		return $resource(':auth/:action/:token', {
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
         		},'forgot': {
						method: 'POST', 
						isArray: false,
						params:{action:'forgot',auth:'auth'}
         		},'changePassword': {
						method: 'POST', 
						isArray: false,
						params:{action:'password',auth:'users'}
         		},'updateUser':{
         				method: 'PUT', 
						isArray: false,
						params:{auth:'users'}
         		},'updateAddress':{
         				method: 'PUT', 
						isArray: false,
						params:{action:'updateAddress',auth:'users'}
         		},'removeAddress':{
         				method: 'POST', 
						isArray: false,
						params:{action:'removeAddress',auth:'users'}
         		},'updateProfile':{
         				method: 'PUT', 
						isArray: false,
						params:{action:'updateAddress',auth:'users'}
         		},'updatePassword':{
         				method: 'PUT', 
						isArray: false,
						params:{action:'updateAddress',auth:'users'}
         		},'orderHistory':{
         				method: 'GET', 
						isArray: false,
						params:{action:'orderHistory',auth:'users'}
         		},'addWishList':{
         				method: 'POST', 
						isArray: false,
						params:{action:'addWishList',auth:'users'}
         		},'removeWishList':{
         				method: 'POST', 
						isArray: false,
						params:{action:'removeWishList',auth:'users'}
         		},'getFavoritos':{
         				method: 'GET', 
						isArray: false,
						params:{action:'favoritos',auth:'users'}
         		}
     		}
 		);
	}
]);
