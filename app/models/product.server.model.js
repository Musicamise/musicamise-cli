'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var Imagem = require('./image.server.model').getImageSchema();

/**
 * Product Schema
 */
var objectProductSchema = {
	
	createdDate: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	canBuy:{
		type: Boolean,
		default: true
	},
	images: {
		type: [Imagem],
		default: []
	},
	slug: {
		type: String,
		default: '',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	types: {
		type: [String],
		default: [],
		trim: true
	},
	collectionsSlugs: {
		type: [String],
		default: [],
		trim: true
	},
	localStoresSlugs:{
		type: [String],
		default: [],
		trim: true
	},
	price: {
		type: Number,
		default:0
	},
	priceFormatted: {
		type: String,
		default:''
	},
	
	discountValue: {
		type: Number,
		default:0
	},
	discountValueFormatted: {
		type: String,
		default:''
	},
	inventories:[{type: Schema.Types.Mixed,
		ref: 'Inventory'}]
};
var ProductSchema = new Schema(objectProductSchema);
exports.getProductSchema = function(){
	return objectProductSchema;
};
mongoose.model('Product', ProductSchema,'product');