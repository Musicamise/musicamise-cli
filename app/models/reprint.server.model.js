'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var objectReprintSchema = {
	
	createdDate: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		default:''
	},
	productTitle: {
		type: String,
		default:''
	},
	productSlug: {
		type: String,
		default:''
	}
};
var ReprintSchema = new Schema(objectReprintSchema);
exports.getReprintSchema = function(){
	return objectReprintSchema;
};
mongoose.model('Reprint', ReprintSchema,'reprint');