'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

var objectAddressSchema = {
    prazo: {type: String},
    name: {type: String},
    cep: {type: String},
    address: {type: String},
    number: {type: String},
    bairro: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    complemento: {type: String},
    _id:{type:String,default:''}
};
var AddressSchema = new Schema(objectAddressSchema);
exports.getAddressSchema = function(){
	return objectAddressSchema;
};
mongoose.model('Address', AddressSchema);