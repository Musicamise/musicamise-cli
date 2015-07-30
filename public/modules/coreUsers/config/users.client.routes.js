'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/user/profile',
			templateUrl: 'modules/coreUsers/views/authentication/profile.client.view.html'
		}).
		state('loginAndRegister', {
			url: '/login',
			templateUrl: 'modules/coreUsers/views/authentication/login_register.client.view.html'
		}).
		state('forgotpassword', {
			url: '/user/esquecisenha',
			templateUrl: 'modules/coreUsers/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/coreUsers/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/coreUsers/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/coreUsers/views/password/reset-password.client.view.html'
		});
	}
]);