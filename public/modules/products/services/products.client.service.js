'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('products').factory('Product', ['$resource',
	function($resource) {
		return $resource('api/products/:productSlug', {
			productSlug: '@productSlug'
			},{'query': {
						method: 'GET', 
						isArray: false,
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
angular.module('products').factory('ProductSearch', ['$resource',
	function($resource) {
		return $resource('api/search/products/',{},{'query': {
						method: 'GET', 
						isArray: false}});
	}
]);
angular.module('products').factory('ProductRelated', ['$resource',
	function($resource) {
		return $resource('api/products/related/:productSlug', {
			productSlug: '@productSlug'
		});
	}
]);

angular.module('products').factory('Collection', ['$resource',
	function($resource) {
		return $resource('api/collections', {
		});
	}
]);

angular.module('products').factory('Order', ['$resource',
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
         		}
     		}
 		);
	}
]);

angular.module('products').factory('Size', ['$resource',
	function($resource) {
		return $resource('api/products/availableSize/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);

// angular.module('products').factory('Inventory', ['$resource',
// 	function($resource) {
// 		return $resource('api/products/availableInventory/:productSlug', {
// 			productSlug: '@productSlug'
// 		});
// 	}
// ]);

angular.module('products').factory('Price', ['$resource',
	function($resource) {
		return $resource('api/products/availablePrice/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);
angular.module('products').factory('Color', ['$resource',
	function($resource) {
		return $resource('api/products/availableColor/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);
angular.module('products').factory('Model', ['$resource',
	function($resource) {
		return $resource('api/products/availableModel/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);