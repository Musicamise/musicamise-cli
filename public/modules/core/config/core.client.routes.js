'use strict';

// Setting up route
angular.module('core',['users']).config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('404', {
			url: '/404',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);