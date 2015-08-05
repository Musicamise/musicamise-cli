'use strict';

//Setting up route
angular.module('localStore').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('allLocalStores', {
			url: '/lojasparceiras/',
			templateUrl: 'modules/localStore/views/allLocalStore.client.view.html'
		}).state('localStoreWithSlug', {
			url: '/lojasparceiras/:localStoreSlug',
			templateUrl: 'modules/localStore/views/localStore.client.view.html'
		});
		
	}
]);
