'use strict';

angular.module('products').controller('ProductsSearchController', ['$scope','$location','$timeout','$stateParams','ProductSearch',
	function($scope,$location,$timeout,$stateParams,ProductSearch) {

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
	}
]);