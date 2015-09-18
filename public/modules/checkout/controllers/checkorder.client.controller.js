'use strict';

angular.module('checkout').controller('CheckOrderController', ['$rootScope','$window','$scope','$location','$timeout','$stateParams','OrderCheckout','Authentication','blockUI',
	function($rootScope,$window,$scope,$location,$timeout,$stateParams,OrderCheckout,Authentication,blockUI) {
		// checkout controller logic
		// ...
	    window.scrollTo(0, 0);
		
		$scope.order = {};

		$scope.orderId = function(){
			if(!$location.search().id){$location.path('/');}
			
			OrderCheckout.checkorder($location.search()).$promise.then(function(response,error,progressback){
				$scope.order = response.order;
			},function(){
				$location.path('/404');
			});
		};

	}
]);