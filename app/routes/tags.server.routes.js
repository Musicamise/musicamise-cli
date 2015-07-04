'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	tags = require('../../app/controllers/tags.server.controller');

module.exports = function(app) {
	// Article Routes
		
	app.route('/api/tags')
		.get(tags.listTags);
	// Finish by binding the article middleware
};