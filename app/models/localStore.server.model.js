'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * Product Schema
 */
var LocalStoreSchema = new Schema({
	
	title: {
		type: String,
		default: ''
	},
	slug: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	image: {},
	onLineVisible: {
		type: Boolean,
		default: false
	}
});

mongoose.model('LocalStore', LocalStoreSchema,'localStore');