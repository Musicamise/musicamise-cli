'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','Collection',
	function($scope, Authentication,Collection) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.inicialCall = function() {
			$scope.articles = Collection.query();
			console.log('teste');
		};
	}

]);

