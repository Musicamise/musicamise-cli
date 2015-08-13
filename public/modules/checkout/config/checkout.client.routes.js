'use strict';

//Setting up route
angular.module('checkout').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('checkorder', {
			url: '/checkorder',
			templateUrl: 'modules/checkout/views/checkorder/check_order.client.view.html'
		}).state('cart', {
			url: '/cart',
			templateUrl: 'modules/checkout/views/checkoutprocess/cart.client.view.html'
		}).state('shipping', {
			url: '/shipping',
			templateUrl: 'modules/checkout/views/checkoutprocess/shipping.client.view.html'
		}).state('checkout', {
			url: '/checkout',
			templateUrl: 'modules/checkout/views/checkoutprocess/checkout.client.view.html'
		}).state('review', {
			url: '/review',
			templateUrl: 'modules/checkout/views/checkoutprocess/review.client.view.html'
		}).state('thankyou', {
			url: '/thank-you',
			templateUrl: 'modules/checkout/views/checkoutprocess/thankyou.client.view.html'
		});
		
	}
]);
