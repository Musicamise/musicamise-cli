'use strict';


angular.module('checkout').factory('Cart', ['$resource',
	function($resource) {
		return $resource('api/cart/:action', {
			action: '@action'
			},{'removeItem': {
						method: 'POST', 
						isArray: false,
						params:{action:'removeItem'}
						
         		},'addItem': {
						method: 'POST', 
						isArray: false,
						params:{action:'addItem'}
         		}
     		}
 		);
	}
]);