'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var DBRef = mongoose.SchemaTypes.DBRef;
/**
 * Product Schema
 */
var ProductSchema = new Schema({
	
	createdDate: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	type: {
		type: String,
		default: '',
		trim: true
	},
	collectionsSlugs: {
		type: [String],
		default: '',
		trim: true
	},
	price: {
		type: Number,
		default:0
	},
	inventories:[DBRef]
});

mongoose.model('Product', ProductSchema,'product');