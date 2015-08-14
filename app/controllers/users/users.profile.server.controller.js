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
	Product = mongoose.model('Product'),
	User = mongoose.model('User');
var moment = require('moment');
moment().format();

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;
	delete req.body.password;
	delete req.body.salt;
	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updatedDate = Date.now();
		user.displayName = user.fullName||(user.firstName + ' ' + user.lastName);

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
						address._id = user.address.length+'';
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

exports.removeAddress = function(req,res){
	var userLogged = req.user;
	var address = req.body.address;

	var message = null;
	console.dir(address);
	if (userLogged) {
		if(address&&address._id!==undefined){

			User.findOne({email:userLogged.email},'-salt -password',function(err,user) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					if(address._id!==undefined){
						user.address = user.address.filter(function(addressInUser,index){
											return addressInUser._id+''!==address._id+'';
										});
					}else{
						res.status(400).send({
							message: 'Address não válido'
						});
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
			return res.status(400).send({
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

exports.orderHistory = function(req, res) {
	var user = req.user;
	if(!user){
		return res.status(500).send({
			message: 'Não logado ou usário nao encontrado!'
		});
	}

	var email = req.query.email;
	var nowThreeMonthsAgo = moment();
	nowThreeMonthsAgo = nowThreeMonthsAgo.subtract(3,'months');

	Order.find({'createdDate':{$gte:nowThreeMonthsAgo.valueOf()},
				'status':{$elemMatch:{$or:[{'status':'PAGO'},
											{'status':'CANCELADO'},
											{'status':'DEVOLVIDA'}]}},
				$or:[{'email':user.email},{'user.email':user.email}]})
			.sort('-updatedDate')
			.select('-pagSeguroInfo -user -_class -emailSents ')
			.exec(function(err,orders){
				if(err){ 	
					console.log('error:'+ err);
					return res.status(500).send({
						message: err
					});
				}
				orders.forEach(function(order){
					order.lastStatus = order.message.lastStatus;
				});

				var newOrders = [];
				var oldOrders = [];
				
				if(orders.length>0){
					newOrders = orders.filter(function(order){
						var dateOrder = moment(order.updatedDate);
						return dateOrder.isAfter(moment().subtract(1,'month'));
					});
					oldOrders = _.difference(orders,newOrders);
				}

				res.json({newOrders:newOrders,oldOrders:oldOrders});
	});
};
exports.addWishList = function(req,res){
	var userLogged = req.user;
	var productSlug = req.body.productSlug;

	var message = null;

	if (userLogged) {
		if(productSlug){
			Product.findOne({'slug':productSlug},function(err,product){
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}

				User.findOne({email:userLogged.email},'-salt -password',function(err,user) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {

				 		user.wishList = _.union(user.wishList, [product.slug]);
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
			});

		}else{
			return res.status(200).send({
						message: 'Produto Slug não passado'
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
exports.removeWishList = function(req,res){
	var userLogged = req.user;
	var productSlug = req.body.productSlug;

	var message = null;

	if (userLogged) {
		if(productSlug){
			User.findOne({email:userLogged.email},'-salt -password',function(err,user) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {

			 		user.wishList = _.difference(user.wishList, [productSlug]);
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
						message: 'Produto Slug não passado'
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
exports.getWishList = function(req,res){
	var userLogged = req.user;
	var productSlug = req.body.productSlug;

	var message = null;

	if (userLogged) {
		if(userLogged.wishList.length>0){

			Product.find({'slug':{$in:userLogged.wishList}},function(err,products){
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}
				if(!err&&products){
					res.json({products:products});
				}
			});

		}else{
			res.json({products:[]});
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

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};