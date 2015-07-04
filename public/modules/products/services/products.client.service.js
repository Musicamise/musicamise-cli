'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('products').factory('Product', ['$resource',
	function($resource) {
		return $resource('api/products/:productSlug', {
			productSlug: '@productSlug'
		});
	}
]);

angular.module('products').factory('ProductCollection', ['$resource',
	function($resource) {
		return $resource('api/products/collection/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);

angular.module('products').factory('Collection', ['$resource',
	function($resource) {
		return $resource('api/collections', {
		});
	}
]);


angular.module('products').factory('Size', ['$resource',
	function($resource) {
		return $resource('api/products/availableSize/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);
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