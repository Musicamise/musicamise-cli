'use strict';

angular.module('core').factory('MainPage', ['$resource',
	function($resource) {
		return $resource('api/mainpage', {
		}, {
			get: {
				method: 'GET',
				isArray: false
			}
		});
	}
]);