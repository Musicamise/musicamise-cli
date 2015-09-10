'use strict';

angular.module('core').controller('HeaderController', ['$window','$rootScope','$scope','$location', 'Authentication',
 'MainMenu','Order','User','blockUI','fancyboxService',
	function($window,$rootScope,$scope,$location, Authentication, MainMenu,Order,User,blockUI,fancyboxService) {
		$scope.authentication = Authentication;

		// $scope.isCollapsed = false;
		
		$scope.user = Authentication.user;
		$scope.search = {};
		$scope.menu = {};
		
		$scope.$watch(function(){ return $location.search().q; }, function(params){
			$scope.search.query = $location.search().q;
		});

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
			MainMenu.query().$promise.then(function(response,error,progressback){
				$scope.loja = response.loja;
				$scope.localStores = response.localStores;
				$scope.discount = response.discount;
			});

		};
		
		$scope.bindMenuEvent = function () {
			var menu = $('#menu-expanded');
			$scope.menu.show = false;
			menu.mouseup(function() { 
			    return false;
			});
			$('body').mouseup(function(menu) {
			    if(($(menu.target).parent('#menu-expanded').length <= 0)&&
			    	$(menu.target).parent('#mainmenu a').length<=0) {
			        $scope.menu.show = false;
			        $scope.$apply();
			    }
			});
    	};

		$scope.clickIconMenu = function(event){
			$scope.menu.show = !$scope.menu.show;
			$scope.menu.name = event.target.className;
		};

		$scope.clickLinkMenu = function(){
			$scope.menu.show = false;
			var boxUser = $('#userBox');
			boxUser.hide();
			var boxLogin = $('#loginBox');
			boxLogin.hide();

		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
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
			$('body').mouseup(function(login) {
			    if(($(login.target).parent('#loginButton').length <= 0)) {
			        button.removeClass('active');
			        box.hide();
			    }
			});
    	};
    	$scope.bindUserEvent = function () {
			var button = $('#userButton');
			var box = $('#userBox');
			var form = $('#userForm');
			button.removeAttr('href');
			button.mouseup(function(login) {
			    box.toggle();
			    button.toggleClass('active');
			});
			form.mouseup(function() { 
			    return false;
			});
			$('body').mouseup(function(login) {
			    if(($(login.target).parent('#userButton').length <= 0)) {
			        button.removeClass('active');
			        box.hide();
			    }
			});
    	};


	}

]);