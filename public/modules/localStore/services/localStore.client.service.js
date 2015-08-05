'use strict';

angular.module('localStore').factory('LocalStore',['$resource',
	function($resource) {
		return $resource('api/localstore/:locaStoreSlug', {
			locaStoreSlug: '@locaStoreSlug'
			},{'get': {
					method: 'GET', 
					isArray: false,
         		},
         		'getAll': {
					method: 'GET', 
					isArray: true,
         		}  
     		}
 		);
	}
]);