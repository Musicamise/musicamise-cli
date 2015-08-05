'use strict';

angular.module('localStore').controller('LocalStoreController', ['$rootScope','$window','$scope','$location','$timeout','$stateParams','LocalStore','Authentication','blockUI',
	function($rootScope,$window,$scope,$location,$timeout,$stateParams,LocalStore,Authentication,blockUI) {
		// checkout controller logic
		// ...
		$scope.Authentication = Authentication;
		$scope.localStore = {};
		$scope.localStore.products = [];
		$scope.findLocalStore = function(){
			blockUI.start();
			if($stateParams.localStoreSlug){
				LocalStore.get({locaStoreSlug:$stateParams.localStoreSlug})
					.$promise.then(function(response,error,progressback){
						if(response.localStore)
							$scope.localStore = response.localStore;
						if(response.products)
							$scope.localStore.products = response.products;
						blockUI.stop();
				},function(reason){
					console.log(reason);
					$location.path('/');
					blockUI.stop();
				});
			}else{
				$location.path('/');
				blockUI.stop();
			}
		};
		$scope.findAllLocalStores = function(){
			blockUI.start();
			LocalStore.getAll()
				.$promise.then(function(response,error,progressback){
					$scope.localStores = response;
					$scope.localStores.forEach(function(localStore,index){
						var hasFrontImage = false;
						var frontImage = {};
						localStore.images.forEach(function(image){
							if(image.frontImage){
								hasFrontImage = true;
								frontImage = image;
							}
						});
						if(hasFrontImage){
							$scope.localStores[index].frontImage = frontImage;
						}else{
							$scope.localStores[index].frontImage = $scope.localStores[index].images[0];
						}
					});
					blockUI.stop();
			},function(reason){
				console.log(reason);
				$location.path('/');
				blockUI.stop();
			});
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
	}	
]);

 