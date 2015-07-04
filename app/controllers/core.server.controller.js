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

exports.index = function(req, res) {
	Collection.find({'mainMenu':true,'onLineVisible':true}).select('-_id slug').exec(function(err, collectionsSlugs){
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
		Inventory.find().or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
				.distinct('product.$id')
		 		.exec(function(err, productsId){

			Product.find({ '_id':{$in:productsId}})
					.where('onLineVisible').equals(true)
				   	.where('collectionsSlugs').in(collectionsSlugsMapped)
				   	.select('-_id collectionsSlugs type')
				   	.exec(function(err,products){

						var mainMenu = {};

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

						res.render('index', {
							user: req.user || null,
							request: req,
							mainMenu:mainMenu
						});

			}); 
		});
		
	});

	
};