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


exports.listCollections = function(req, res) {
	
 	Collection.find({"onLineVisible":true}).exec(function(err, collections){
		if(err){
			return res.status(400).send({
				message: err
			});
		}		
 		res.json(collections);
	});
};
