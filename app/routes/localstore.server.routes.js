'use strict';

/**
 * Module dependencies.
 */


module.exports = function(app) {
	// Article Routes
	var users = require('../../app/controllers/users.server.controller'),
		localStore = require('../../app/controllers/localStore.server.controller');

	app.route('/api/localstore/')
		.get(localStore.getLocalStore);

	app.route('/api/localstore/:localStoreSlug')
		.get(localStore.readLocalStoreSlug);
		
	// Finish by binding the article middleware
	app.param('localStoreSlug', localStore.localStoreBySlug);
};