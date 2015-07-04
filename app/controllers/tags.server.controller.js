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


exports.listTags = function(req, res) {
	
 	Tag.find().exec(function(err, tags){
		if(err){
			return res.status(400).send({
				message: err
			});
		}		
 		res.json(tags);
	});
};
