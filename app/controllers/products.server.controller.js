'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	Collection = mongoose.model('Collection'),
	Tag = mongoose.model('Tag'),
	Article = mongoose.model('Article'),
	Inventory = mongoose.model('Inventory'),
	_ = require('lodash');



exports.search = function(req,res){
	var query = req.query.q;
	query = '.*'+query+'.*';
	var productsOutOfStock = [];
	var productsForHome = [];//poster,obra_de_arte
	var prodcutsAccessories = [];//lenco,acessorio
	var productsInStock = [];
	var inventoriesObj = [];


	Product.find({'onLineVisible':true,$or:[{'title' : {$regex : query,$options:'i'}},{'slug' : {$regex : query,$options:'i'}},{'description' : {$regex : query,$options:'i'}},{'userTags' : {$elemMatch : {$regex:query,$options:'i'}}}]})
	.select('-_class -createdDate')
	.exec(function(err,products){

		products.forEach(function(product,index){
			if(product.type==='poster'||product.type==='obra_de_arte'){
				productsForHome.push(product);
			}else if(product.type==='lenco'||product.type==='acessorio'){
				prodcutsAccessories.push(product);
			}else{
				product.inventories.forEach(function(inventory){
					inventoriesObj.push(inventory.oid);
				});
			}
			products[index].inventories = [];
		});

		products.forEach(function(product,indexProduct){
			var images = [];

			var frontImages = product.images.filter(function(image,indexImage){
				return image.frontImage;
			});
			var notFrontImage = product.images.filter(function(image,indexImage){
				return !image.frontImage;
			});

			if(frontImages.length>0){
				images = _.union(frontImages.slice(0,1),notFrontImage.slice(0,1));
			}else{
				images = notFrontImage.slice(0,2);
			}
			products[indexProduct].images = images;
			products[indexProduct].inventories = [];
		});

		Inventory.find({'_id':{$in:inventoriesObj},'orderOutOfStock':false})
		.or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
		.distinct('product.$id')
		.exec(function(err,productIds){
			productIds.forEach(function(productId){
				productsInStock = productsInStock.concat(products.filter(function(obj){return productId+''===obj._id+'';}));
			});

			productsOutOfStock = _.difference(productsInStock,products);

			res.json({productsOutOfStock:productsOutOfStock,productsForHome:productsForHome,prodcutsAccessories:prodcutsAccessories,productsInStock:productsInStock});
		});
	});
};

/**
 * Show the current Product
 */
exports.readProductSlug = function(req, res) {
	if(req.err){
		return res.status(400).send({
				message: req.err
				});
	}
	var inventoriesObj = [];
	var product = req.product;
	
	if(product.inventories){
		product.inventories.forEach(function(inventory){
			if(inventory)
				inventoriesObj.push(inventory.oid);
		});
		console.log(inventoriesObj);
		var count = 0;
		Inventory.find({'_id':{$in:inventoriesObj},'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
		.select('-product -_class').exec(function(err,inventories){
			
			inventories.forEach(function(inventory,indexInventory){
				product.inventories.forEach(function(inventoryFromProduct,indexInventoryFromProduct){
					if(inventory._id.toString()+''===inventoryFromProduct.oid+''){
						product.inventories[indexInventoryFromProduct] = inventories[indexInventory];
					}
				});
			});
			res.json(product);

		});
	}else{
		res.json(product);
	}

};
exports.listRelated = function(req, res) {
	if(req.err){
		return res.status(400).send({
				message: req.err
			});
	}
	var inventoriesObj = [];
	var product = req.product;
	var quantity = req.query.quantity||4;
	var query = Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]);
	query.distinct('product.$id').exec(function(err, productsId){
		if(err){
			return res.status(400).send({
				message: err
			});
		}		 
		productsId = productsId.filter(function(productId){return productId+''!==product._id+'';});

		var queryProduct = Product.find({ '_id':{$in:productsId}})
									.where('onLineVisible').equals(true);
		var userTagQuery = {};
		if(product.userTags){
			userTagQuery = {'userTags':{$in:product.userTags}};
		}
		var collectionSlugQuery = {};
		if(product.collectionsSlugs){
			collectionSlugQuery = {'collectionsSlugs':{$in:product.collectionsSlugs}};
		}
		queryProduct.and([userTagQuery,collectionSlugQuery]);
		
		queryProduct.limit(quantity);
		queryProduct.exec(function(err,products){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
			products.forEach(function(product,indexProduct){
				var images = [];

				var frontImages = product.images.filter(function(image,indexImage){
					return image.frontImage;
				});
				var notFrontImage = product.images.filter(function(image,indexImage){
					return !image.frontImage;
				});

				if(frontImages.length>0){
					images = _.union(frontImages.slice(0,1),notFrontImage.slice(0,1));
				}else{
					images = notFrontImage.slice(0,2);
				}
				products[indexProduct].images = images;
				products[indexProduct].inventories = [];
			});
 			res.json({products:products,queryDate:new Date()});
		});
	});
	// if(product.inventories){
	// 	product.inventories.forEach(function(inventory){
	// 		inventoriesObj.push(inventory.oid);
	// 	});
	// 	var count = 0;
	// 	Inventory.find({'_id':{$in:inventoriesObj}}).select('-product -_id -_class').exec(function(err,inventories){
	// 		product.inventories.forEach(function(inventory,indexInventory){
	// 			 product.inventories[indexInventory] = inventories[count];
	// 			 count++;
	// 		});
	// 			res.json(product);

	// 	});
	// }else{
	// 	res.json(product);
	// }

};

exports.readProductCollectionSlug = function(req, res) {
	res.json(req.products);
};

 
/**
 * List of Articles
 */
exports.listAll = function(req, res) {
	
	var productsFinal = [] ;
	var inventoriesObj = [];
 	Product.find().exec(function(err, products){
		if(err){
			return res.status(400).send({
				message: err
			});
		}		
		productsFinal = products;
		products.forEach(function(product){
			product.inventories.forEach(function(inventory){
				inventoriesObj.push(inventory.oid);
			});
		});

		Inventory.find({'_id':{$in:inventoriesObj}}).select('-product -_id -_class').exec(function(err,inventories){
					var count = 0;
			products.forEach(function(product,indexProduct){
				product.inventories.forEach(function(inventory,indexInventory){
					 products[indexProduct].inventories[indexInventory] = inventories[count];
					 count++;
				});
			});
	 		res.json(products);
		});
	});
};
 
exports.list = function(req, res) {
	
	var collection = req.query.collection;
	var gender = req.query.gender;

	var price = req.query.price;
	var size = req.query.size;
	var model = req.query.model;
	var color = req.query.color;
	var userTags = req.query.userTags;

	var sort = req.query.sort;
	var order = req.query.order||'desc';

	var quantity = req.query.quantity||10;
	var page = req.query.page||1;

	console.log('collection='+collection);
	console.log('gender='+gender);
	console.log('price='+price);
	console.log('size='+size);
	console.log('model='+model);
	console.log('color='+color);
	console.log('userTags='+userTags);
	console.log('sort='+sort);
	console.log('order='+order);
	console.log('quantity='+quantity);
	console.log('page='+page);


	var query = Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]);

 	
 	if(size){
 		query.where('size').equals(size);
 	}
 	if(gender){
 		query.where('genderSlug').equals(gender);
 	}

 	query.distinct('product.$id').exec(function(err, productsId){
		if(err){
			return res.status(400).send({
				message: err
			});
		}		 
		console.log('productsId:'+productsId);
		var queryProduct = Product.find({ '_id':{$in:productsId}})
									.where('onLineVisible').equals(true);
		if(price){
			queryProduct.where('price').lte(parseFloat(price));
		}
		if(collection){
			queryProduct.where('collectionsSlugs').in([collection]);
		}
		if(color){
			queryProduct.where('color').equals(color);
		}
		if(model){
			queryProduct.where('type').equals(model);
		}
		if(userTags){
			queryProduct.where('userTags').in(userTags.split(','));
		}
		if(sort){
			switch(sort) {
				case 'price':
					if(order==='desc')
						queryProduct.sort({'price':-1});
					else
						queryProduct.sort({'price':1});
					break;
				case 'new':
					if(order==='desc')
						queryProduct.sort({'newProduct':-1});
					else
						queryProduct.sort({'newProduct':1});
					break;
				case 'discount':
					if(order==='desc')
						queryProduct.sort({'priceCompareWith':-1});
					else
						queryProduct.sort({'priceCompareWith':1});
					break;
			}
		}
		if(page){
			queryProduct.limit(quantity).skip((page-1)*quantity);
		}else{
			queryProduct.limit(quantity);
		}
		queryProduct.exec(function(err,products){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
			products.forEach(function(product,indexProduct){
				var images = [];

				var frontImages = product.images.filter(function(image,indexImage){
					return image.frontImage;
				});
				var notFrontImage = product.images.filter(function(image,indexImage){
					return !image.frontImage;
				});

				if(frontImages.length>0){
					images = _.union(frontImages.slice(0,1),notFrontImage.slice(0,1));
				}else{
					images = notFrontImage.slice(0,2);
				}
				products[indexProduct].images = images;
				products[indexProduct].inventories = [];
			});

 			res.json({products:products,queryDate:new Date()});
		});
	});
};

exports.availableSize = function(req,res){
	Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]).distinct('size').exec(function(err,sizes){
		if(err){
			return res.status(400).send({
				message: err
			});		
		}
		res.json(sizes);

	});
};

exports.availableSizeWithCollectionSlug = function(req,res){
	var productsIds = [];
	req.products.map(function(obj){
		productsIds.push(obj._id);
		return productsIds;
	});
	var query = Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]);
	if(productsIds.length>0){
		query.where('product.$id').in(productsIds);
		query.distinct('size').exec(function(err,sizes){
			if(err){
				return res.status(400).send({
					message: err
				});		
			}
			res.json(sizes);

		});
	}else{
		res.json([]);
	}

};

exports.availableColor = function(req,res){
	Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]).distinct('product.$id').exec(function(err,productsId){
		if(err){
			return res.status(400).send({
				message: err
			});		
		}
		Product.find({ '_id':{$in:productsId}}).distinct('color').exec(function(err,colors){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
			colors = colors.filter(function(color){return color!=='';});
 			res.json(colors);
		});
	});
};

exports.availableColorWithCollectionSlug = function(req,res){
	var productsIds = [];
	req.products.map(function(obj){
		productsIds.push(obj._id);
		return productsIds;
	});
	var query = Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]);
	if(productsIds.length>0){
		query.where('product.$id').in(productsIds);
		query.distinct('product.$id').exec(function(err,productsId){
			if(err){
				return res.status(400).send({
					message: err
				});		
			}
			Product.find({ '_id':{$in:productsId}}).distinct('color').exec(function(err,colors){
				if(err){
					return res.status(400).send({
						message: err
					});
				}		
	 			res.json(colors);
			});

		});
	}else{
		res.json([]);
	}
};
exports.availableModel = function(req,res){
	Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]).distinct('product.$id').exec(function(err,productsId){
		if(err){
			return res.status(400).send({
				message: err
			});		
		}
		Product.find({ '_id':{$in:productsId}}).distinct('type').exec(function(err,models){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
 			res.json(models);
		});
	});
};
exports.availableModelWithCollectionSlug = function(req,res){
	var productsIds = [];
	req.products.map(function(obj){
		productsIds.push(obj._id);
		return productsIds;
	});
	var query = Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]);
	if(productsIds.length>0){
		query.where('product.$id').in(productsIds);
		query.distinct('product.$id').exec(function(err,productsId){
			if(err){
				return res.status(400).send({
					message: err
				});		
			}
			Product.find({ '_id':{$in:productsId}}).distinct('type').exec(function(err,models){
				if(err){
					return res.status(400).send({
						message: err
					});
				}		
	 			res.json(models);
			});

		});
	}else{
		res.json([]);
	}
};

exports.availablePrice = function(req,res){
	Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]).distinct('product.$id').exec(function(err,productsId){
		if(err){
			return res.status(400).send({
				message: err
			});		
		}
		Product.find({ '_id':{$in:productsId}}).distinct('price').exec(function(err,prices){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
			var  pricesFormatted = [];
			prices.forEach(function(price){
				var formatted = ('R$ '+price).replace('.',',');
				pricesFormatted.push({price:price, priceFormatted:formatted});
			});
 			res.json(pricesFormatted);
		});
	});
};
exports.availablePriceWithCollectionSlug = function(req,res){
	var productsIds = [];
	req.products.map(function(obj){
		productsIds.push(obj._id);
		return productsIds;
	});
	var query = Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]);
	if(productsIds.length>0){
		query.where('product.$id').in(productsIds);
		query.distinct('product.$id').exec(function(err,productsId){
			if(err){
				return res.status(400).send({
					message: err
				});		
			}
			Product.find({ '_id':{$in:productsId}}).distinct('price').exec(function(err,prices){
				if(err){
					return res.status(400).send({
						message: err
					});
				}		
	 			res.json(prices);
			});

		});
	}else{
		res.json([]);
	}
};


exports.listInventory = function(req, res) {
	
 	Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]).distinct('product.$id').exec(function(err, productsId){
		if(err){
			return res.status(400).send({
				message: err
			});
		}		 
		
		Product.find({ '_id':{$in:productsId}})
		.where('newProduct').equals(true)
		//.where('collectionsSlugs').in([])
		//.where('userTags').in([])
		.exec(function(err,products){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
 			res.json(products);
		});
	});
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	});
};

exports.productBySlug = function(req, res, next, productSlug) {
	Product.findOne({'slug':productSlug})
		.where('onLineVisible').equals(true)
		.exec(function(err, product) {
			if (err) return next(err);
			if (!product){
				res.status(404).send({
						message: 'not Found' 
					});
			}
				//return next(new Error('Failed to load product ' + productSlug));
			req.product = product;
			next();
		});
};

exports.productByCollectionSlug = function(req, res, next, collectionSlug) {
	Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]).distinct('product.$id')
		.exec(function(err, productsId){
			// Collection.findOne({'slug':collectionSlug})
			// 		   .where('onLineVisible').equals(true)
			// 		   .exec(function(err,collection){
							
			// 				if (err) return next(err);
			// 				if(!collection){req.products = []; next();}

							Product.find({ '_id':{$in:productsId}})
							.where('collectionsSlugs').in([collectionSlug])
							.exec(function(err, products) {

								if (err) return next(err);
								if (!products) return next(new Error('Failed to load article ' + collectionSlug));
								
								req.products = products;
								next();
							});
		// });
	});
};



/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};