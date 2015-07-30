'use strict';

//Setting up route
angular.module('checkout').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('cart', {
			url: '/cart',
			templateUrl: 'modules/checkout/views/cart.client.view.html'
		}).state('shipping', {
			url: '/shipping',
			templateUrl: 'modules/checkout/views/shipping.client.view.html'
		}).state('checkout', {
			url: '/checkout',
			templateUrl: 'modules/checkout/views/checkout.client.view.html'
		}).state('review', {
			url: '/review',
			templateUrl: 'modules/checkout/views/review.client.view.html'
		}).state('thankyou', {
			url: '/thankyou',
			templateUrl: 'modules/checkout/views/thankyou.client.view.html'
		});
		
	}
]);