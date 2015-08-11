'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * Product Schema
 */
var CollectionSchema = new Schema({
	
	title: {
		type: String,
		default: ''
	},
	slug: {
		type: String,
		default: ''
	},
	image: {},
	onLineVisible: {
		type: Boolean,
		default: false
	},
	onLocalStore: {
		type: Boolean,
		default: false
	},
	front: {
		type: Boolean,
		default: false
	},
	gender: {
		type: Boolean,
		default: false
	},
	mainMenu: {
		type: Boolean,
		default: false
	},
});

mongoose.model('Collection', CollectionSchema,'collection');