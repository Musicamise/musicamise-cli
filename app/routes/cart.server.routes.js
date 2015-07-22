'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	cart = require('../../app/controllers/cart.server.controller');

module.exports = function(app) {

	app.route('/api/cart')
		.get(cart.getCart);

	app.route('/api/cart/addItem')
		.post(cart.addItemCart);
		
	app.route('/api/cart/removeItem')
		.post(cart.removeItemCart);
		
	app.route('/api/cart/clean')
		.get(cart.clean);
};