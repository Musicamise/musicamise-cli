'use strict';

angular.module('products').controller('ProductSingleController', ['$rootScope','$scope','$location','$timeout','$stateParams','Product',
	'ProductRelated','Collection','Size','Price','Color','Model','Order','ProductSearch','blockUI','Authentication','User','SendContact',
	function($rootScope,$scope,$location,$timeout,$stateParams,Product,ProductRelated,Collection,Size,Price,Color,Model,Order,ProductSearch,blockUI,Authentication,User,SendContact) {
		// Products controller logic
		//in controller that doesn't reload
	    window.scrollTo(0, 0);
		$scope.fullUrl = $location.absUrl();
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.$on('$locationChangeSuccess',function(){
		  //update your scope based on new $routeParams

		  	if($location.path()===$scope.path)
		  		$scope.find();
		});
		$scope.product = {};
		$scope.productQuery = {};
		$scope.notStared = '<i class="fa fa-star-o"></i> Gostei!';
		$scope.stared = '<i class="fa fa-star"></i> Remover!';
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
						if(product.inventories.length===1&&
							// product.inventories[0].genderSlug.toLowerCase()==='unisex'&&
							product.inventories[0].size.toLowerCase()==='unico'){
							$scope.unico=true;
							$scope.inventoryChecked.id = product.inventories[0]._id;
						}
						product.inventories.forEach(function(inventory){
							if(inventory!==null&&inventory!==undefined&&inventory._id!==undefined){
								if($.inArray(inventory.genderSlug,Object.keys($scope.inventories))<0){
									$scope.inventories[inventory.genderSlug+'-'+inventory.type] = [];
									$scope.inventories[inventory.genderSlug+'-'+inventory.type].push(inventory);
								}else{
									$scope.inventories[inventory.genderSlug+'-'+inventory.type].push(inventory);
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

		$scope.like = function(productSlug){
			User.addWishList({productSlug:productSlug}).$promise.then(function(response){
				$scope.user = response;
				Authentication.user = response;
			},function(reason){
				console.log(reason);
			});
		};
		$scope.dislike = function(productSlug){
			User.removeWishList({productSlug:productSlug}).$promise.then(function(response){
				$scope.user = response;
				Authentication.user = response;
			},function(reason){
				console.log(reason);
			});
		};
		
		$scope.alreadyLiked = function(productSlug){
			if($scope.user&&$scope.user.wishList){
				return $scope.user.wishList.indexOf(productSlug)>=0;
			}else{
				return false;
			} 
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

		$scope.sendPedido = function(email) {
  			if(!email)
				$scope.error = 'Preencha o Email!';
			var userContact = {};
			userContact.name = $scope.user.displayName||email;
			userContact.email = email;
			userContact.phone = '';
			userContact.subject = 'Pedido de camisa '+$scope.product.title;
			userContact.content = 'Pedido de reprint feito pelo email: '+email+'\n com produto '+$scope.product.title;
			if(!$scope.error){
				SendContact.send({userContact:userContact}).$promise.then(function(response,error,progressback){
  					$scope.success = response.message;
	  			},function(reason){
	  				$scope.error = reason.data.message;
	  			});
			}
	  	};
	}
]);