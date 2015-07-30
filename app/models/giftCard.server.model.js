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
 var objectGiftCardSchema = {
	createdDate: {
		type: Date,
		default: Date.now
	},
	usedDate:{
		type: Date,
		default: Date.now
	},
	_id: {
		type: String,
		default: '',
		trim: true
	},
	price: {
		type: Number,
		default: '',
		trim: true
	},
	userIdFrom: {
		type: String,
		default: '',
		trim: true
	},
	userIdTo: {
		type: String,
		default: '',
		trim: true
	},
	active: {
		type: Boolean,
		default: false,
		trim: true
	},
	used: {
		type: Boolean,
		default: false,
		trim: true
	}

};
var GiftCardSchema = new Schema(objectGiftCardSchema);
exports.getGiftCardSchema = function(){
	return objectGiftCardSchema;
};
mongoose.model('GiftCard', GiftCardSchema,'giftCard');

