'use strict';

angular.module('core').controller('HeaderController', ['$window','$rootScope','$scope','$location', 'Authentication',
 'MainMenu','Order','User','blockUI','fancyboxService',
	function($window,$rootScope,$scope,$location, Authentication, MainMenu,Order,User,blockUI,fancyboxService) {
		$scope.authentication = Authentication;

		// $scope.isCollapsed = false;
		
		$scope.user = Authentication.user;
		$scope.search = {};
		
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
		

		$scope.megamenuDone = function(){
			angular.element(document).ready(function () {
				$('.megamenu').megamenu();
		    });
		};

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
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

    	

	////facebook start
		// $scope.checkLoginState = function() {
		//     FB.getLoginStatus(function(response) {
		//       $scope.getUserInfo(response);
		//     });
	 //  	};

		// $scope.watchLoginChange = function() {

		//   var _self = this;

		//   FB.Event.subscribe('auth.authResponseChange', function(res) {

		//     if (res.status === 'connected') {
		      
		//       /* 
		//        The user is already logged, 
		//        is possible retrieve his personal info
		//       */
		//       _self.getUserInfo();

		      
		//        This is also the point where you should create a 
		//        session for the current user.
		//        For this purpose you can use the data inside the 
		//        res.authResponse object.
		      

		//     } 
		//     else {
		//     	console.dir(res);
		//       /*
		//        The user is not logged to the app, or into Facebook:
		//        destroy the session on the server.
		//       */
		       
		//     }

		//   });

		// };

		// $scope.getUserInfo = function() {

		//   var _self = this;

		//   FB.api('/me', function(res) {

		//     $rootScope.$apply(function() { 

		//       $rootScope.user = _self.user = res; 

		//     });

		//   });

		// };

		// $scope.logoutFacebook = function() {

		//   var _self = this;

		//   FB.logout(function(response) {

		//     $rootScope.$apply(function() { 

		//       $rootScope.user = _self.user = {}; 

		//     }); 

		//   });

		// };
    ///facebook end 

	}

]);