'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * Product Schema
 */
var TagSchema = new Schema({
	
	title: {
		type: String,
		default: ''
	},
	slug: {
		type: String,
		default: ''
	},
	imageUrl: {
		type: String,
		default: ''
	}
});

mongoose.model('Tag', TagSchema,'tag');