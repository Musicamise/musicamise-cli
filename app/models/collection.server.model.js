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
	imageUrl: {
		type: String,
		default:''
	},
	onLineVisible: {
		type: Boolean,
		default: false
	},
	onLocalStore: {
		type: Boolean,
		default: false
	},
});

mongoose.model('Collection', CollectionSchema,'collection');