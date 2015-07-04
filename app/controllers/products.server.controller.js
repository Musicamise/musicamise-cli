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


/**
 * Show the current article
 */
exports.readProductSlug = function(req, res) {
	res.json(req.product);
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
		console.log('tamanho :'+inventoriesObj.length);
		console.log('tamanho :'+inventoriesObj);

		Inventory.find({'_id':{$in:inventoriesObj}}).select('-product -_id -_class').exec(function(err,inventories){
					var count = 0;
			console.log('tamanho obt:'+inventories.length)
			console.log('tamanho obt:'+inventories);
			products.forEach(function(product,indexProduct){
				product.inventories.forEach(function(inventory,indexInventory){
					 products[indexProduct].inventories[indexInventory] = inventories.filter(function(i){
					 	if(i.oid===products[indexProduct].inventories[indexInventory]._id)
					 		{return i}
					 });
					 count++;
				});
			});
	 		res.json(products);
		});
	});
};
 
exports.list = function(req, res) {
	
	var price = req.query.price;
	var size = req.query.size;
	var model = req.query.model;
	var color = req.query.color;
	var quantity = req.query.quantity||10;
	var page = req.query.page;

	console.log('price='+price);
	console.log('size='+size);
	console.log('model='+model);
	console.log('color='+color);
	console.log('quantity='+quantity);
	console.log('page='+page);

	var query = Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}]);

 	
 	if(size){
 		query.where('size').equals(size);
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
			queryProduct.where('price').lte(price);
		}
		if(page){
			queryProduct.limit(quantity).skip(page*quantity);
		}
		queryProduct.exec(function(err,products){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
 			res.json(products);
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
 			res.json(prices);
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
		if (!product) return next(new Error('Failed to load article ' + productSlug));
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