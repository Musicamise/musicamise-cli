'use strict';

//Setting up route
angular.module('checkout').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('cart', {
			url: '/cart',
			templateUrl: 'modules/checkout/views/cart.client.view.html'
		});
		
	}
]);