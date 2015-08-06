'use strict';


angular.module('core').controller('HomeController', ['$scope','$timeout', 'Authentication','MainPage','blockUI','fancyboxService','SendContact',
	function($scope,$timeout, Authentication,MainPage,blockUI,fancyboxService,SendContact) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.inicialCall = function() {
			$scope.mainContent = {};
			$scope.imagePromotion = [];
			$scope.destaque = {};
			blockUI.start();
			MainPage.get().$promise.then(function(response,error,progressback){
			 	$scope.mainContent = angular.copy(response.content);
			 	$scope.mainContent.images = [];
			 	$scope.imagePromotion = [];
		 	 	response.content.images.forEach(function(image){
					if(image.redirectUrl&&(image.redirectUrl.indexOf('http://')<0||image.redirectUrl.indexOf('https://')<0)){
						image.redirectUrl = 'http://'+image.redirectUrl;
					}
					if(image.promotion){
						$scope.imagePromotion.push(image);
					}else{
						$scope.mainContent.images.push(image);
					}
				});	
				if($scope.imagePromotion.length>0){
					$scope.initPromotionBanner();
				}
			 	$scope.destaque = response.destaque;
			 	blockUI.stop();
			});
		};

		$scope.initPromotionBanner = function(){
		 	$timeout(function() {
			 	$scope.openPromotionScreen();
		 	}, 14000);
		};

		$scope.promotionImage = {
            'padding'		: 0,
           	'href'			: 'http://farm9.staticflickr.com/8568/16388772452_f4d77a92c7_b.jpg',
            'title'   		: 'Lorem ipsum dolor sit amet',
            'transitionIn'	: 'elastic',
            'transitionOut'	: 'elastic',
            'scrolling'		: 'auto',
            'centerOnScroll' : 'true',
            'titlePosition'	 : 'inside',
            'titleFormat' 	: null
        };
        
        $scope.openPromotionScreen = function(){
        	$scope.promotionImage.href = $scope.imagePromotion[0].url;
        	$scope.promotionImage.title = $scope.imagePromotion[0].subtitle;
        	// $scope.manual1.content = '<a href = ''+$scope.imagePromotion[0].redirectUrl+''>Link<a>'
            fancyboxService.fancyboxPlus()($scope.promotionImage);
        };
		
		$scope.initCarousel = function(){
			$('#owl-demo').owlCarousel({

				navigation : false,
				slideSpeed : 300,
				paginationSpeed : 400,
				singleItem : true,
				navigationText: false,
				responsive: true,
				autoPlay:false,
				rewindNav:true,
				// 'singleItem:true' is a shortcut for:
				// items : 1, 
				// itemsDesktop : false,
				// itemsDesktopSmall : false,
				// itemsTablet: false,
				// itemsMobile : false

	      		});
		};
	 	

		$scope.stopPromotionBannerBlocker = function(){
			var myBlockUI = blockUI.instances.get('myBlockUI');

		  	$('body').mouseup(function(promotion) {
			    if(($(promotion.target).parent('#promotionBlock').length <= 0)) {
		  			myBlockUI.stop();
			    }
			});

	  	};

	  	$scope.contact = function() {
	  		$scope.userContact = {};
	  	};
	  	
  		$scope.sendContact = function() {
  			if(!$scope.userContact)
				$scope.error = 'Preencha o cadastro!';
			else if(!$scope.userContact.email)
				$scope.error = 'Preencha o Email!';
			else if(!$scope.userContact.subject)
				$scope.error = 'Preencha o Assunto!';
			else if(!$scope.userContact.content)
				$scope.error = 'Preencha a mensagem!';

			if(!$scope.error){
				SendContact.send({userContact:$scope.userContact}).$promise.then(function(response,error,progressback){
  					$scope.success = response.message;
	  			},function(reason){
	  				$scope.error = reason.data.message;
	  			});
			}
  			
	  	};
	  	
	}

]);

