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
angular.module('core').factory('SendContact', ['$resource',
	function($resource) {
		return $resource('api/sendcontact', {
		}, {
			send: {
				method: 'POST',
				isArray: false
			}
		});
	}
]);