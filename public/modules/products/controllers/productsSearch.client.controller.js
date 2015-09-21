'use strict';

angular.module('products').controller('ProductsSearchController', ['$rootScope','$scope','$location','$timeout','$stateParams','ProductSearch',
	function($rootScope,$scope,$location,$timeout,$stateParams,ProductSearch) {
	    window.scrollTo(0, 0);
		$scope.$watch(function(){ return $location.search(); }, function(params){
		    console.log(params);
		    $scope.search();
		});

	 	$scope.search = function() {
			 	
			$scope.productsServer = ProductSearch.query($location.search());
			$scope.productsServer.$promise.then(function(response,error,progressback){

					if(response.productsOutOfStock){
						$scope.productsOutOfStock = response.productsOutOfStock;
					}
					if(response.productsForHome){
						$scope.productsForHome = response.productsForHome;
					}
					if(response.prodcutsAccessories){
						$scope.prodcutsAccessories = response.prodcutsAccessories;
					}
					if(response.productsInStock){
						$scope.productsInStock = response.productsInStock;
					}
			});

		};
		$scope.initProductsCarousel = function(id){
			$('#'+id).owlCarousel({

				loop:true,
			    margin:10,
			    responsiveClass:true,
			   	navigation : true,
				rewindNav:true,
				navigationText: [
			      '<i class="icon-chevron-left icon-white"><</i>',
			      '<i class="icon-chevron-right icon-white">></i>'
			      ],
			    responsive:{
			        0:{
			            items:1,
			            loop:true

			        },
			        600:{
			            items:3,
			            loop:true

			        },
			        1000:{
			            items:5,
			            loop:true
			        }
			    }

      		});
		};
	}
]);