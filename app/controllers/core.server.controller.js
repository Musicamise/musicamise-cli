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
	LocalStore = mongoose.model('LocalStore'),
	SiteContent = mongoose.model('SiteContent'),
	async = require('async'),
	_ = require('lodash');
var	orderController = require('../../app/controllers/order.server.controller');
var	DiscountCode = mongoose.model('DiscountCode');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
	});
};

var translateDiscountCode = function(discountObject){
	var description = 'Use o código: <span class=\'code\'>'+ discountObject._id + '</span> para o desconto de ';

	switch(discountObject.typeForPay){
		case 'value':
			description = description +'R$ '+discountObject.valueOf;
			break;
		case 'percent':
			description = description +discountObject.valueOf+'% ';
			break;
	}
	
	switch(discountObject.ordersValidation){
		case 'all':
			description = description +', válido para qualquer produto';
			break;
		case 'overValue':
			description = description +', válido nas compras acima de R$' + discountObject.overValueOf ;
			break;
		case 'collections':
			description = description +', válido nas coleções '+ discountObject.collectionsSlug.toString();
			break;
		case 'specificProduct':
			description = description + ', válido para os produtos '+ discountObject.productSlugs.toString();
			break;
	}
	switch(discountObject.whereApply){
		case 'oncePerOrder':
			description = description + '; <span class=\'obs\'> Desconto válido apenas para cada compra.</span>';
			break;
		case 'toEveryProduct':
			description = description + '; <span class=\'obs\'> Desconto válido para cada itém comrado.</span>';
			break;
	}
	return description;
	
};


exports.mainMenu = function(req,res){
	async.waterfall([
	function(done) {
		Collection.find({'onLineVisible':true}).or([{'gender':true},{'mainMenu':true}])
		.select('-_id slug')
		.exec(function(err, collectionsSlugs){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
			var collectionsSlugsMapped = [];
			collectionsSlugs.map(function(collection){
				collectionsSlugsMapped.push(collection.slug);
			});
			//todo with inventory?
			Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
					.distinct('product.$id')
			 		.exec(function(err, productsId){

				Product.find({ '_id':{$in:productsId}})
						.where('onLineVisible').equals(true)
					   	.where('collectionsSlugs').in(collectionsSlugsMapped)
					   	.select('-_id collectionsSlugs type')
					   	.exec(function(err,products){

							var mainMenu = {};
							if(products){
					            products.forEach(function(product) {
						       		product.collectionsSlugs.forEach(function(collection){
							   			if(mainMenu[collection]){
											mainMenu[collection].push(product.type);         				
							   			}else{
											mainMenu[collection]  = [];
											mainMenu[collection].push(product.type);         				
							   			}
							   		});
					            });
							}

				            done(err, {'loja':mainMenu});
	        				// res.json(mainMenu);

				}); 
			});
			
		});
	},
	function(response, done) {
		LocalStore.find({'onLineVisible':true}).exec(function(err,localStores){
			if (!err&&localStores) {
				response.localStores = {};
				var localStoresSlugs = [];
				localStores.forEach(function(store){
					localStoresSlugs.push(store.slug);
					response.localStores[store.slug] = {'title':store.title};
				});
				// Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
				// 	.distinct('product.$id')
			 // 		.exec(function(err, productsId){
				Product.find({})
				// .find({ '_id':{$in:productsId}})
						.where('onLineVisible').equals(true)
					   	.where('localStoresSlugs').in(localStoresSlugs)
					   	.select('-_id localStoresSlugs type')
					   	.exec(function(err,products){
					   		products.forEach(function(product){
					   			product.localStoresSlugs.forEach(function(storeSlug){
					   				if(response.localStores[storeSlug].products)
										response.localStores[storeSlug].products.push(product.type);
									else{
										response.localStores[storeSlug].products = [];
										response.localStores[storeSlug].products.push(product.type);
									}
					   			});
								
					   		});
				   		  	done(err, response);
							// res.json(response);
				   	});
			   	// });
				// res.send({
				// 	message: 'An email has been sent to ' + user.email + ' with further instructions.'
				// });
			}else if(err){
				done(err);
			}else{
				done(err, response);
			}

		});
	},function(response, done) {
		DiscountCode.findOne({onLineVisible:true,active:true,
			$and:[{$or:[{noTimesLimits:true},{timesLeft:{$gt:0}}]},
					{$or:[{noDateLimits:true},{endDate:{$lte:new Date()}}]}
				 ]
			})
			.exec(function(err,discountObject){
				if (!err&&discountObject) {
					var description = translateDiscountCode(discountObject);
					response.discount = discountObject;
					response.discount.description = discountObject.description||description;
					res.json(response);
				}else if(err){
					done(err);
				}else{
					res.json(response);
				}
			});
	}], function(err) {
		if(err){
			return res.status(400).send({
				message: err
			});
		}	
	});
};


exports.mainPage = function(req,res){
	async.waterfall([
	function(done) {
		 SiteContent.findOne({'visible':true,'_id':'frontPage'}).exec(function(err,content){
		 	if(err){
				return res.status(400).send({
					message: err
				});
			}else{
				if(content)
			 		done(err,{'content':content});
			 	else
			 		done(err,{'content':new SiteContent()});
			}	
		 });
	},
	function(response, done) {
			Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
						.distinct('product.$id')
				 		.exec(function(err, productsId){

					Product.find({ '_id':{$in:productsId}})
							.where('onLineVisible').equals(true)
						   	.where('collectionsSlugs').in(['destaque'])
						   	.select('-_id price title priceCompareWith images')
						   	.limit(4)
						   	.exec(function(err,products){
						   		if(!err){
							   		response.destaque = products;
									res.json(response);
									//done(err,response);
								}else{
									done(err);
								}
				   	});
			   });
 			
	}], function(err) {
		if(err){
			return res.status(400).send({
				message: err
			});
		}	
	});
};

