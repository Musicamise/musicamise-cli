'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Address = mongoose.model('Address'),
	Order = mongoose.model('Order'),
	User = mongoose.model('User');


/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

exports.updateAddress = function(req,res){
	var userLogged = req.user;
	var address = req.body.address;

	var message = null;

	if (userLogged) {
		if(address&&address.cep&&address.cep!==''&&
			address.address&&address.address!==''&&
			address.city&&address.city!==''&&
			address.state&&address.state!==''&&
			address.number&&address.number!==''){

			User.findOne({email:userLogged.email},'-salt -password',function(err,user) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {

					// var addressObject = new Address(address);
			 		console.dir(address);	
			 		console.dir(address._id);	
			 		var indexSelect = -1;
					if(address._id!==undefined){
						user.address.forEach(function(addressInUser,index){
							if(addressInUser._id+''===address._id+''){
								indexSelect = index;
							}
						});
						if(indexSelect>=0){
							user.address[indexSelect].name = address.name;
							user.address[indexSelect].address = address.address;
							user.address[indexSelect].cep = address.cep;
							user.address[indexSelect].number = address.number;
							user.address[indexSelect].bairro = address.bairro;
							user.address[indexSelect].city = address.city;
							user.address[indexSelect].state = address.state;
							user.address[indexSelect].country = address.country;
							user.address[indexSelect].complemento = address.complemento;
							user.address[indexSelect]._id = address._id;
						}
					}else{
						address._id = user.address.length;
						user.address.push(address);
					}
					user.save(function (err) {
						console.log(err);
					});

					req.login(user, function(err) {
						if (err) {
							res.status(400).send(err);
						} else {
							res.json(user);
						}
					});
				}
			});
		}else{
			return res.status(200).send({
						message: 'Complete os campos do endereço'
					});
		}
	}else{
		res.status(400).send({
			message: 'User is not signed in'
		});
	}

	// res.status(400).send({
	// 		message: 'User is not signed in'
	// 	});
};

exports.orderHistory = function(req,res){
	var userLogged = req.user;
	var message = null;

	if (userLogged) {
		User.findOne({email:userLogged.email},'-salt -password',function(err,user) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				Order.find().or([{'user.email':userLogged.email},{'email':userLogged.email}])
				.exec(function(err,orders){
					res.json(orders);
				});
			}
		});
	}else{
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};
/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};