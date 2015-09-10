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
		}).state('contact', {
			url: '/contact',
			templateUrl: 'modules/core/views/static/contact.client.view.html'
		}).state('faq', {
			url: '/faq',
			templateUrl: 'modules/core/views/static/faq.client.view.html'
		}).state('politicas', {
			url: '/politicas',
			templateUrl: 'modules/core/views/static/politicas.client.view.html'
		}).state('quemsomos', {
			url: '/quemsomos',
			templateUrl: 'modules/core/views/static/quemsomos.client.view.html'
		}).state('comocomprar', {
			url: '/comocomprar',
			templateUrl: 'modules/core/views/static/comocomprar.client.view.html'
		}).state('centrodeajuda', {
			url: '/centrodeajuda',
			templateUrl: 'modules/core/views/static/centrodeajuda.client.view.html'
		}).state('trabalheconosco', {
			url: '/centrodeajuda',
			templateUrl: 'modules/core/views/static/trabalhe_conosco.client.view.html'
		}).state('missao', {
			url: '/centrodeajuda',
			templateUrl: 'modules/core/views/static/missa_visao_e_valores.client.view.html'
		});
	}
]);

angular.module('core').config(function(blockUIConfig) {

  // Change the default overlay message
  blockUIConfig.message = 'Carregando!';

  // Change the default delay to 100ms before the blocking is visible
  blockUIConfig.delay = 100;

});


angular.module('core').run(['$rootScope', '$window', 'User','Authentication',
  function($rootScope, $window, User,Authentication) {

  	// $rootScope.user = {};
	// $rootScope.FB = {};
  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    // FB.init({ 

    //   appId: '539560766079177', 
    //   cookie: true, 
    //   xfbml: true
    // });

    //User.watchAuthenticationStatusChange();
   //  FB.getLoginStatus(function(response) {
	  //   //statusChangeCallback(response);
   //  	console.log(response);
  	// });


	// FB.Event.subscribe('auth.authResponseChange', function(res) {

	// 	if (res.status === 'connected') {
	// 		if(!Authentication.user){
	// 		  	FB.api('/me?fields=name,gender,email,birthday', function(res) {
	// 		  		console.dir(res);
	// 		  	});
	// 		}

	// 	} 
	// 	else {
	// 		$window.location = '/auth/signout/';
	// 	}

	// });

  };

    // Load the SDK asynchronously

  //  (function(d, s, id) {
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) return;
  //   js = d.createElement(s); js.id = id;
  //   js.src = '//connect.facebook.net/en_US/all.js';
  //   fjs.parentNode.insertBefore(js, fjs);
  // }(document, 'script', 'facebook-jssdk'));

	

}]);