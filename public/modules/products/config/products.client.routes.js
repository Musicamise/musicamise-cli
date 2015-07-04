'use strict';

//Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('products', {
			url: '/products',
			templateUrl: 'modules/products/views/products.client.view.html'
		}).
		state('productWithSlug', {
			url: '/product/:productSlug',
			templateUrl: 'modules/products/views/view-product.client.view.html'
		}).
		state('productWithModel', {
			url: '/products/:model',
			templateUrl: 'modules/products/views/products.client.view.html'
		}).
		state('productWithModelAndCollection', {
			url: '/products/:model/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html'
		}).
		state('productWithCollectionSlug', {
			url: '/products/collection/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html'
		});
	}
]);