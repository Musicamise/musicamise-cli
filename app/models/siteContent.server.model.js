'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * Product Schema
 */

var Imagem = require('./image.server.model').getImageSchema();


var SiteContentSchema = new Schema({
	_id: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
	visible: {
		type: Boolean,
		default: false
	},
	images: {
		type: [Imagem],
		default: []
	},
	email: {
		type: String,
		default: ''
	},
	facebook: {
		type: String,
		default: ''
	},
	twitter: {
		type: String,
		default: ''
	},
	gPlus: {
		type: String,
		default: ''
	},
	instagram: {
		type: String,
		default: ''
	},
});

mongoose.model('SiteContent', SiteContentSchema,'siteContent');