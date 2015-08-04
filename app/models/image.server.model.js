'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');


var objectImageSchema = {
    name: {type: String},
    frontImage: {type: String},
    size: {type: String},
    url: {type: String},
    subtitle: {type: String},
    redirectUrl: {type: String},
};
var ImageSchema = new Schema(objectImageSchema);
exports.getImageSchema = function(){
	return objectImageSchema;
};
