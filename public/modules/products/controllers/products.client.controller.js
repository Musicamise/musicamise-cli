'use strict';

angular.module('products').controller('ProductsController', ['$scope','$location','$timeout','$stateParams','Product',
	'ProductCollection','Collection','Size','Price','Color','Model',
	function($scope,$location,$timeout,$stateParams,Product,ProductCollection,Collection,Size,Price,Color,Model) {
		// Products controller logic
		// ...

		

		$scope.allCollections = Collection.query();
		$scope.collectionsGender = [];
		$scope.collections = [];
		$scope.allCollections.$promise.then(function(allCollections){
			allCollections.forEach(function(collection){
				if(collection.gender){
					$scope.collectionsGender.push(collection);
				}else{
					$scope.collections.push(collection);
				}
			});
		});
		$scope.sizes = Size.query();
		$scope.prices = Price.query();
		$scope.colors = Color.query();
		$scope.models = Model.query();


		$scope.find = function() {
			var collection = $stateParams.collectionSlug;
			var modeloCamisa = $stateParams.model;

			$scope.products = Product.query($location.search());
			$scope.products.$promise.then(function(p){
				console.log(p);
			});
		};

		

		$scope.findOne = function() {
			$scope.products = Product.get({
				productSlug: $stateParams.productSlug
			});
			$timeout(function(){
		      loadEtalage();
		    },100);
		};
		$scope.findWithCollection = function() {
			$scope.products = ProductCollection.get({
				collectionSlug: $stateParams.collectionSlug
			});
			$scope.sizes = Size.get({
				collectionSlug: $stateParams.collectionSlug
			});
			$scope.prices = Price.get({
				collectionSlug: $stateParams.collectionSlug
			});

		};

		if($location.search().size){
			$scope.sizesMarked = $location.search().size.split(',');
		}else{
			$scope.sizesMarked = [];
		}

		if($location.search().price){
			$scope.sizesMarked = $location.search().price.split(',');
		}else{
			$scope.sizesMarked = [];
		}

		if($location.search().color){
			$scope.sizesMarked = $location.search().color.split(',');
		}else{
			$scope.sizesMarked = [];
		}

		
		$scope.clickSize = function(value){
			if($scope.sizesMarked.indexOf(value)>=0){
				$scope.sizesMarked.pop(value);
			}else{
				$scope.sizesMarked.push(value);
			}
			$location.search({'size': $scope.sizesMarked.toString()});
			$scope.find();
		};

		$scope.clickSize = function(value){
			if($scope.sizesMarked.indexOf(value)>=0){
				$scope.sizesMarked.pop(value);
			}else{
				$scope.sizesMarked.push(value);
			}
			$location.search({'size': $scope.sizesMarked.toString()});
			$scope.find();
		};

	}
]);

 