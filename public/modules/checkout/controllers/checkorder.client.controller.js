'use strict';

angular.module('checkout').controller('CheckOrderController', ['$rootScope','$window','$scope','$location','$timeout','$stateParams','OrderCheckout','Authentication','blockUI',
	function($rootScope,$window,$scope,$location,$timeout,$stateParams,OrderCheckout,Authentication,blockUI) {
		// checkout controller logic
		// ...
		var statusOrderEnum = {
			'PAGO':3,
			'DISPONIVEL':4,
			'DEVOLVIDA':6,
			'CANCELADO':7
		};
		var statusEntregaEnum = {
		 	'SEMSTATUS':0,
			'PRODUCAO':1,
			'EMBALAGEM':2,
			'EMTRANSITO':3,
			'ENTREGUE':4
		};
		$scope.order = {};

		$scope.orderId = function(){
			if(!$location.search().id){$location.path('/');}
			
			OrderCheckout.checkorder($location.search()).$promise.then(function(response,error,progressback){
				$scope.order = response.order;
			},function(){
				$location.path('/404');
			});
		};
		$scope.$watch('order', function(newValue, oldValue, scope) {
			$scope.initTab($scope.order.lastStatus,$scope.order.statusEntrega);
		});

		$scope.initTab = function(statusOrder,statusEntrega){
			if(statusOrder&&statusOrderEnum[statusOrder]===3){
				$('#rootwizard').show();
				$('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
					var $total = $('#rootwizard ul.nav').find('li').length;
					var $current = statusEntregaEnum[statusEntrega];
					var $percent = ($current/$total) * 100;
					$('#rootwizard ul.nav li').attr('class','disabled');
					$('#rootwizard ul.nav li:lt('+$current+')').attr('class','active');
					$('#rootwizard').find('.bar').css({width:$percent+'%'});
				},
				'tabClass': 'nav nav-pills',
				onTabClick: function(tab, navigation, index) {
						return false;
					}
				});
			}
			
		};


	}
]);