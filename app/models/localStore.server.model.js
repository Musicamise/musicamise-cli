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
	images: {
		type: [Imagem],
		default: []
	},
	onLineVisible: {
		type: Boolean,
		default: false
	}
});

mongoose.model('LocalStore', LocalStoreSchema,'localStore');