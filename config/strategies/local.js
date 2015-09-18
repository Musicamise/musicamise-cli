'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			User.findOne({
				email: email
			}).select('-__v -notes -tags').exec(function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Email ou senha inválido'
						// message: 'Unknown user or invalid password'
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Email ou senha inválido'
						// message: 'Unknown user or invalid password'
					});
				}
				user.password = undefined;
				user.salt = undefined;
				user.notes = undefined;
				user.tags = [];
				return done(null, user);
			});
		}
	));
};