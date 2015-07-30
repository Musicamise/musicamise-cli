'use strict';

angular.module('core').controller('HeaderController', ['$window','$rootScope','$scope','$location', 'Authentication',
 'MainMenu','Order','User',
	function($window,$rootScope,$scope,$location, Authentication, MainMenu,Order,User) {
		$scope.authentication = Authentication;

		// $scope.isCollapsed = false;

		$scope.mainMenu = MainMenu.query();
		

		$scope.headerLoginAndCart = function(){
			$scope.authentication = Authentication;
			$rootScope.order = {};
			$scope.orderCall = Order.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				// console.log(p);
				if(!jQuery.isEmptyObject(response.order)){
					$rootScope.order = response.order;
				}
			});
		};

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
		$scope.logout = function(){

		};
		$scope.login = function(user){
			User.signin(user).$promise.then(function(userResponse,error,progressback){
				// console.log(p);
				if(error){
					console.log(error);
				}else if(!jQuery.isEmptyObject(userResponse)){
					console.log(userResponse);
					// window.user = userResponse;
				}
			 	$window.location.reload();
			 	// $route.reload();
			},function(err){
				$scope.login_error = err.data.message;
				console.log(err);
			});
		};

		$scope.search = function(query){
			$location.search({q:query});
			$location.path('/search');
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			if(!jQuery.isEmptyObject($rootScope.order)){
				Order.get().$promise.then(function(response,error,progressback){
					$rootScope.order = response.order;
				});
			}
			 // $scope.isCollapsed = false;
		});

	 	$scope.bindLoginEvent = function () {
			var button = $('#loginButton');
			var box = $('#loginBox');
			var form = $('#loginForm');
			button.removeAttr('href');
			button.mouseup(function(login) {
			    box.toggle();
			    button.toggleClass('active');
			});
			form.mouseup(function() { 
			    return false;
			});
			$(this).mouseup(function(login) {
			    if(($(login.target).parent('#loginButton').length <= 0)) {
			        button.removeClass('active');
			        box.hide();
			    }
			});
    	};

	}

]);