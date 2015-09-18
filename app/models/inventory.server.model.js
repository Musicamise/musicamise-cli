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
var objectInventorySchema = {
	_id: {
		type: String,
		default: '',
		trim: true
	},
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
	genderSlug: {
		type: String,
		default: '',
		trim: true
	},
	quantity: {
		type: Number,
		default:0
	},
	priceWithQuantity: {
		type: Number,
		default: 0
	},
	priceWithQuantityFormatted: {
		type: String,
		default: '',
		trim: true
	},
	product:{type: DBRef, resolve: true}

};

var InventorySchema = new Schema(objectInventorySchema);
 
mongoose.model('Inventory', InventorySchema,'inventory');