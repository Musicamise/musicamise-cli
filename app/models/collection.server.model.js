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
		default: true
	},
	onLocalStore: {
		type: Boolean,
		default: true
	},
});

mongoose.model('Collection', CollectionSchema,'collection');