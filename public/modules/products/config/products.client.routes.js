'use strict';

//Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('productsSearch', {
			url: '/search',
			templateUrl: 'modules/products/views/search.client.view.html'
		}).
		state('products', {
			url: '/products',
			templateUrl: 'modules/products/views/products.client.view.html'
		}).
		state('productsEsgotados', {
			url: '/products/esgotados',
			templateUrl: 'modules/products/views/products-esgotados.client.view.html'
		}).
		state('productWithSlug', {
			url: '/product/:productSlug',
			templateUrl: 'modules/products/views/view-product.client.view.html'
		}).
		state('productWithGender', {
			url: '/products/gender/:genderSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithCollection', {
			url: '/products/collection/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithCollectionSlugAndGender', {
			url: '/products/collection/:genderSlug/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithModel', {
			url: '/:model',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithModelAndGender', {
			url: '/:model/:genderSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithModelAndCollection', {
			url: '/:model/collection/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithModelAndCollectionAndGender', {
			url: '/:model/:genderSlug/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		});
		
	}
]);