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
	_ = require('lodash');

/**
 * Show the current LocalStore
 */
exports.getLocalStore = function(req, res){
	LocalStore.find({})
		.select('-_class -onLineVisible')
		.where('onLineVisible').equals(true)
		.exec(function(err, localStores) {
			if (err){
				res.status(500).send({
						message: err
					});
			} 
			if (!localStores){
				res.status(404).send({
						message: 'not Found' 
					});
			}
			res.json(localStores);
		});
};

exports.readLocalStoreSlug = function(req, res) {
	if(req.err){
		return res.status(400).send({
				message: req.err
				});
	}
	var localStore = req.localStore;
	var response = {};
	response.localStore = localStore;
	if(localStore){
		Product.find({})
			.where('onLineVisible').equals(true)
		   	.where('localStoresSlugs').in([localStore.slug])
		   	.select('type description slug images title collectionsSlugs userTags')
		   	.exec(function(err,products){
		   		if(!err&&products){
					response.products = products;
				}
				res.json(response);
		});
	}else{
		res.json(response);
	}

};

exports.localStoreBySlug = function(req, res, next, localStoreSlug) {
	LocalStore.findOne({'slug':localStoreSlug})
		.where('onLineVisible').equals(true)
		.exec(function(err, localStore) {
			if (err) return next(err);
			if (!localStore){
				res.status(404).send({
						message: 'not Found' 
					});
			}
				//return next(new Error('Failed to load product ' + productSlug));
			req.localStore = localStore;
			next();
		});
};
