'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	collections = require('../../app/controllers/collections.server.controller');

module.exports = function(app) {
	// Article Routes

	app.route('/api/collections')
		.get(collections.listCollections);
		
	// Finish by binding the article middleware
};