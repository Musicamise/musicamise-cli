'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * Product Schema
 */
 var objectDiscountCode = {
	startDate: {
		type: Date,
		default: Date.now
	},
	endDate: {
		type: Date,
		default: Date.now
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	_id: {
		type: String,
		default: '',
		trim: true
	},
	valueOf: {
		type: Number,
		default: '',
		trim: true
	},
	typeForPay: {
		type: String,
		default: '',
		trim: true
	},
	ordersValidation: {
		type: String,
		default: '',
		trim: true
	},
	timesLeft: {
		type: Number,
		default:0
	},
	timesUsed: {
		type: Number,
		default:0
	},
	noTimesLimits: {
		type: Boolean,
		default:false
	},
	whereApply: {
		type: String,
		default: '',
		trim: true
	},
	noDateLimits: {
		type: Boolean,
		default: false,
		trim: true
	},
	active: {
		type: Boolean,
		default: false,
		trim: true
	},
	onLineVisible: {
		type: Boolean,
		default: false,
		trim: true
	},
	onLocalStore: {
		type: Boolean,
		default: false,
		trim: true
	},
	overValueOf: {
		type: Number,
		default: '',
		trim: true
	},
	collectionsSlug: {
		type: [String],
		default: [],
		trim: true
	},
	productSlugs: {
		type: [String],
		default: [],
		trim: true
	},
	description: {
		type: String
	},
}; 
var DiscountCodeSchema = new Schema(objectDiscountCode);

exports.getDiscountCodeSchema = function(){
	return objectDiscountCode;
};

mongoose.model('DiscountCode', DiscountCodeSchema,'discountCode');

