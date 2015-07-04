'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var DBRef = mongoose.SchemaTypes.DBRef;

/**
 * Article Schema
 */
var InventorySchema = new Schema({
	 
	orderOutOfStock: {
		type: Boolean,
		default: true
	},
	sellInOutOfStock: {
		type: Boolean,
		default: true
	},
	size: {
		type: String,
		default: '',
		trim: true
	},
	quantity: {
		type: Number,
		default:0
	},
	product:{type: DBRef, resolve: true}

});

mongoose.model('Inventory', InventorySchema,'inventory');