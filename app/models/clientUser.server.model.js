'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
  	AddressSchema = require('./address.server.model').getAddressSchema(),
	crypto = require('crypto');
var Address = require('./address.server.model').getAddressSchema();


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var objectUserSchema = {
	firstName: {
		type: String,
		trim: true,
		default: ''
		// validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
		// validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	fullName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your name']
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Senha deve ser maior que 7 caracteres.']
	},
	marketingEmail:{
		type: Boolean,
		default: false
	},
	active:{
		type: Boolean,
		default: false
	},
	tags:{
		type:[String],
		default: [],
		select: false
	},
	notes:{
		type:String,
		default: '',
		select: false
	},
	address:{
		type:[Address]
	},
	fbId:{
		type:String,
		default:''
	},
	wishList:{
		type:[String],
		default:[]
	},
	displayName:{
		type:String,
		default:''
	},
	gender: {
		type: String
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		//required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	manager: {
		type: Boolean,
		default: false,
		select: false
	},
	updatedDate: {
		type: Date
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken:{
		type: String,
		default:'',
		select: false
	},
	resetPasswordExpires: {
		type: Date,
		select: false
	}
};
var UserSchema = new Schema(objectUserSchema);
exports.getUserSchema = function(){
	return objectUserSchema;
};
/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};
/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema,'user');
