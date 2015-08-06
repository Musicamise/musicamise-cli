'use strict';

module.exports = function(app) {
	// Root routing

	var core = require('../../app/controllers/core.server.controller');
	
	app.route('/').get(core.index);
	app.route('/api/mainmenu').get(core.mainMenu);
	app.route('/api/mainpage').get(core.mainPage);
	app.route('/api/sendcontact').post(core.sendContact);

	
};