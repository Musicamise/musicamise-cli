'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	products = require('../../app/controllers/products.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/api/search/products')
		.get(products.search);
	app.route('/api/products')
		.get(products.list);
	app.route('/api/products/related/:productSlug')
		.get(products.listRelated);


	app.route('/api/productsAll')
		.get(products.listAll);

	app.route('/api/products/availableSize')
		.get(products.availableSize);

	app.route('/api/products/availableSize/:collectionSlug')
		.get(products.availableSizeWithCollectionSlug);

	app.route('/api/products/availablePrice')
		.get(products.availablePrice);
	app.route('/api/products/availablePrice/:collectionSlug')
		.get(products.availablePriceWithCollectionSlug);

	app.route('/api/products/availableColor')
		.get(products.availableColor);
	app.route('/api/products/availableColor/:collectionSlug')
		.get(products.availableColorWithCollectionSlug);
	
	app.route('/api/products/availableModel')
		.get(products.availableModel);
	app.route('/api/products/availableModel/:collectionSlug')
		.get(products.availableModelWithCollectionSlug);

	app.route('/inventories1')
		.get(products.listInventory);

	app.route('/api/products/:productSlug')
		.get(products.readProductSlug);

	app.route('/api/products/collection/:collectionSlug')
		.get(products.readProductCollectionSlug);


	// Finish by binding the article middleware
	app.param('productSlug', products.productBySlug);
	app.param('collectionSlug', products.productByCollectionSlug);

};