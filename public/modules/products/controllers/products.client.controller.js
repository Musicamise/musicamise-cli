'use strict';

angular.module('products').controller('ProductsController', ['$rootScope','$scope','$location','$timeout','$stateParams','Product',
	'ProductRelated','Collection','Size','Price','Color','Model','Order','ProductSearch','blockUI',
	function($rootScope,$scope,$location,$timeout,$stateParams,Product,ProductRelated,Collection,Size,Price,Color,Model,Order,ProductSearch,blockUI) {
		// Products controller logic
		//in controller that doesn't reload
		$scope.$on('$locationChangeSuccess',function(){
		  //update your scope based on new $routeParams

		  	if($location.path()===$scope.path)
		  		$scope.find();
		});
		$scope.productQuery = {};
		$scope.find = function() {
			$scope.updateVariablesInProductsView();
			
			var queryObject = jQuery.extend(true, {}, $location.search());

			if($stateParams.genderSlug){
				queryObject.gender = $stateParams.genderSlug;
			}
			if($stateParams.model){
				queryObject.model = $stateParams.model;
			}
			if($stateParams.collectionSlug){
				queryObject.collection = $stateParams.collectionSlug;
			} 	
			$scope.products = [];
			$scope.productsServer = Product.query(queryObject);
			$scope.productsServer.$promise.then(function(p,error,progressback){
				if(p.products)
					$scope.products = p.products;

			},function(reason){
				console.log(reason);
			});

		};

		$scope.findNextPage = function(){
			if ($scope.productQuery.busy||$scope.productQuery.findNextPageStopCalling) return;
   			if ($scope.productQuery.page) 
   				$scope.productQuery.page=$scope.productQuery.page+1; 

   			$scope.productQuery.busy = true;

			var queryObject = jQuery.extend(true, {}, $location.search());

			if($stateParams.genderSlug){
				queryObject.gender = $stateParams.genderSlug;
			}
			if($stateParams.model){
				queryObject.model = $stateParams.model;
			}
			if($stateParams.collectionSlug){
				queryObject.collection = $stateParams.collectionSlug;
			} 	
			if ($scope.productQuery.page) 
				queryObject.page = $scope.productQuery.page;

			$scope.productsServer = Product.query(queryObject);
			$scope.productsServer.$promise.then(function(p,error,progressback){
				if(p.products)
					$scope.products = $scope.products.concat(p.products);
				if(p.products.length===0)
					$scope.productQuery.findNextPageStopCalling = true;
				$scope.productQuery.busy = false;
			},function(reason){
				console.log(reason);
			});

		};

		$scope.findOne = function() {
			$scope.product = Product.query({
				productSlug: $stateParams.productSlug
			});
		    //get 5 related items
		    $scope.relatedProducts = [];
		    $scope.product.$promise.then(function(product){
		    	if(product){
					var queryObject = {};
					queryObject.quantity = 4;
					queryObject.productSlug = product.slug;
					ProductRelated.get(queryObject,function(data) {
	                	if(data.products){
	                		$scope.relatedProducts = data.products;
	                	}
	            	});
					
					$scope.inventories = {};
					if(product.inventories){
						product.inventories.forEach(function(inventory){
							if(inventory!==null&&inventory!==undefined&&inventory._id!==undefined){
								if($.inArray(inventory.genderSlug,Object.keys($scope.inventories))<0){
									$scope.inventories[inventory.genderSlug] = [];
									$scope.inventories[inventory.genderSlug].push(inventory);
								}else{
									$scope.inventories[inventory.genderSlug].push(inventory);
								}
							}

						});
					}
		    	}

			},function(error){
				console.log('error '+ error);
				$location.path('/404');
			},function(progressback){
				console.log('progressback '+ progressback);
			});

		   	$scope.updateVariablesInSingleProductView();
			
		};

		$scope.loadEtalage = function(){
		 	$('#etalage').etalage({
				thumb_image_width: 300,
				thumb_image_height: 400,
				source_image_width: 900,
				source_image_height: 1200,
				show_hint: true,
				click_callback: function(image_anchor, instance_id){
					alert('Callback example:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
				}
			});
		};
		$scope.updateVariablesInSingleProductView = function(){
			$scope.inventoryChecked = {
		        id: ''
		      };
	      	$timeout(function(){
		      	$scope.loadEtalage();
		    	},1000);
		};

		$scope.updateVariablesInProductsView = function(){
			$scope.productQuery.busy = false;
			$scope.productQuery.page = 1;
			$scope.productQuery.findNextPageStopCalling = false;
			$scope.models = Model.query();
			$scope.models.$promise.then(function(allCollections){
				if($stateParams.model){
			  		var notModel = true;
					if(allCollections){
						allCollections.forEach(function(model){
							if(model===$stateParams.model){
								notModel = false;							
							}
						});
					}
					if(notModel){
						$location.path('/');
					}
				}	
			});
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

			

			$scope.path = $location.path();

			if($location.search().size){
				$scope.sizeMarked = $location.search().size;
			}else{
				$scope.sizeMarked = '';
				$scope.sizeMarkedStyle = {display:'none'};
			}

			if($location.search().price){
				$scope.priceMarked = $location.search().price;
			}else{
				$scope.priceMarked = '';
				$scope.priceMarkedStyle = {display:'none'};

			}

			if($location.search().color){
				$scope.colorMarked = $location.search().color;
			}else{
				$scope.colorMarked = '';
				$scope.colorMarkedStyle = {display:'none'};
			}

			if($location.search().sort){
				$scope.sortMarked = $location.search().sort;
			}else{
				$scope.sortMarked = '';
			}

			if($location.search().order){
				$scope.orderMarked = $location.search().order;
			}else{
				$scope.orderMarked = '';
			}

			if($stateParams.collectionSlug){
				$scope.collectionMarked = $stateParams.collectionSlug;
			}else{
				$scope.collectionMarked = '';
				$scope.collectionMarkedStyle = {display:'none'};
			}

			if($stateParams.genderSlug){
				$scope.genderMarked = $stateParams.genderSlug;
			}else{
				$scope.genderMarked =  '';
			}

			if($stateParams.model){
				$scope.modeloCamisaMarked = $stateParams.model;
			}else{
				$scope.modeloCamisaMarked =  '';
				$scope.modeloCamisaMarkedStyle = {display:'none'};
			}


			if($scope.colorMarked||$scope.priceMarked||$scope.sizeMarked||$scope.modeloCamisaMarked||$scope.genderMarked||$scope.collectionMarked){
				$scope.hasFilter = true;
			}else{
				$scope.hasFilter = false;
			}

		};

		$scope.cartAddItem = function(id){
			if(id){
				$scope.orderCall = Order.addItem({id:id});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					// console.log(p);
					if(response.order){
						$rootScope.order = response.order;
						$location.path('/cart');		
					}else if(error){
						$location.path('/products');		
					}


				});
			}
		};

		

		$scope.linkGender = function(gender){
			var queryString = $location.absUrl().split('?')[1];
			queryString = (queryString)?'?'+queryString:'';
			if($scope.collectionMarked&&$stateParams.model)
				return '#!/'+$stateParams.model+'/'+gender +'/'+$scope.collectionMarked+queryString;
			else if($scope.collectionMarked) 
				return '#!/products/collection'+'/'+gender+'/'+ $scope.collectionMarked+queryString;
			else if($stateParams.model)
				return '#!/'+$stateParams.model+'/'+gender+queryString;
			else
				return '#!/'+'products/gender/'+gender+queryString;
		};


		$scope.linkModel = function(model){
			var queryString = $location.absUrl().split('?')[1];
			queryString = (queryString)?'?'+queryString:'';
			if($scope.collectionMarked&&$stateParams.genderSlug)
				return '#!/'+model+'/'+$stateParams.genderSlug+'/'+$scope.collectionMarked+queryString;
			else if($scope.collectionMarked)
				return '#!/'+model+'/'+$scope.collectionMarked+queryString;
			else if($stateParams.genderSlug)
				return '#!/'+model+'/'+$stateParams.genderSlug+queryString;
			else 
				return '#!/'+model+queryString;
		};

		$scope.linkCollection = function(collection){
			var queryString = $location.absUrl().split('?')[1];
			queryString = (queryString)?'?'+queryString:'';
			if($scope.modeloCamisaMarked&&$stateParams.genderSlug)
				return '#!/'+$scope.modeloCamisaMarked+'/'+$stateParams.genderSlug+'/'+collection+queryString;
			else if ($scope.modeloCamisaMarked)
				return '#!/'+$scope.modeloCamisaMarked+'/collection/'+collection+queryString;
			else if($stateParams.genderSlug)
				return '#!/'+'products/collection/'+$stateParams.genderSlug+'/'+collection+queryString;
			else
				return '#!/'+'products/collection/'+collection+queryString;
		};

		
		$scope.clickOrder = function(order){
			
			if($scope.sortMarked===order){
				if($scope.orderMarked===''||$scope.orderMarked==='desc')
					$scope.orderMarked = 'asc';
				else
					$scope.orderMarked = 'desc';
			}else{
				$scope.orderMarked = 'asc';
			}

			$scope.sortMarked = order;
			var object = $location.search();
			object.sort = $scope.sortMarked;
			object.order = $scope.orderMarked;
			$location.search(object);

		};
		
		$scope.clickSize = function(value){
			$scope.sizesMarked = value;
			$scope.sizeMarkedStyle = {display:'block'};
			var object = $location.search();
			object.size = $scope.sizesMarked;
			$location.search(object);
		};
		$scope.removeSize = function(){
			$scope.sizeMarkedStyle = {display:'none'};

			var object = $location.search();
			delete object.size;
			$location.search(object);

		};


		$scope.clickColor = function(value){
			$scope.colorMarked = value;
			$scope.colorMarkedStyle = {display:'block'};

			var object = $location.search();
			object.color = $scope.colorMarked;
			$location.search(object);
		};
		$scope.removeColor = function(){
			$scope.colorMarkedStyle = {display:'none'};

			var object = $location.search();
			delete object.color;
			$location.search(object);

		};

		$scope.clickPrice = function(value){
			$scope.priceMarked = value;
			$scope.priceMarkedStyle = {display:'block'};

			var object = $location.search();
			object.price = $scope.priceMarked;
			$location.search(object);
		};
		$scope.removePrice = function(){
			$scope.priceMarkedStyle = {display:'none'};

			var object = $location.search();
			delete object.price;
			$location.search(object);

		};
		$scope.clickCollection = function(value){
			$scope.collectionMarked = value;
			$scope.collectionMarkedStyle = {display:'block'};
			// var object = $location.search();
			// object.collection = $scope.collectionMarked;
			// $location.search(object);
		};
		$scope.removeCollection = function(){
			$scope.collectionMarkedStyle = {display:'none'};
			var path = $location.path();
			if($stateParams.genderSlug&&$stateParams.model){
				path = path.replace('/'+$stateParams.collectionSlug,'');
			}else if($stateParams.genderSlug){
				path = path.replace('collection','gender');
				path = path.replace('/'+$stateParams.collectionSlug,'');
			}else if($stateParams.model){
				path = path.replace('/collection','');
				path = path.replace('/'+$stateParams.collectionSlug,'');
			}else{
				path = path.replace('/collection','');
				path = path.replace('/'+$stateParams.collectionSlug,'');
			}
			$scope.collectionMarked = '';

			$location.path(path);

		};
		$scope.removeModel = function(){
			$scope.modeloCamisaMarkedStyle = {display:'none'};
			var path = $location.path();
			if($stateParams.genderSlug&&$stateParams.collectionSlug){
				path = path.replace('/'+$stateParams.model,'/products/collection');
			}else if($stateParams.collectionSlug){
				path = path.replace('/'+$stateParams.model,'/products');
			}else if($stateParams.genderSlug){
				path = path.replace('/'+$stateParams.model,'/products/gender');
			}else{
				path = path.replace('/'+$stateParams.model,'/products');
			}
			$scope.modeloCamisaMarked =  '';	

			$location.path(path);

		};
		$scope.clearFilter = function(){
			$location.search({});
		};

	}
]);

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