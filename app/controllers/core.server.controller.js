'use strict';

/**
 * Module dependencies.
 */
 
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	Collection = mongoose.model('Collection'),
	Tag = mongoose.model('Tag'),
	Article = mongoose.model('Article'),
	Inventory = mongoose.model('Inventory'),
	LocalStore = mongoose.model('LocalStore'),
	SiteContent = mongoose.model('SiteContent'),
	nodemailer = require('nodemailer'),
	async = require('async'),
	config = require('../../config/config'),
	_ = require('lodash');
var	orderController = require('../../app/controllers/order.server.controller');
var	DiscountCode = mongoose.model('DiscountCode');
var request = require('request');

exports.index = function(req, res) {
	SiteContent.findOne({'visible':true,'_id':'socialPage'}).exec(function(err,content){
		res.render('index', {
			user: req.user || null,
			content: content,
		});
	 });
};

var translateDiscountCode = function(discountObject){
	var description = 'Use o código: <span class=\'code\'>'+ discountObject._id + '</span> para o desconto de ';

	switch(discountObject.typeForPay){
		case 'value':
			description = description +'R$ '+discountObject.valueOf;
			break;
		case 'percent':
			description = description +discountObject.valueOf+'% ';
			break;
	}
	
	switch(discountObject.ordersValidation){
		case 'all':
			description = description +', válido para qualquer produto';
			break;
		case 'overValue':
			description = description +', válido nas compras acima de R$' + discountObject.overValueOf ;
			break;
		case 'collections':
			description = description +', válido nas coleções '+ discountObject.collectionsSlug.toString();
			break;
		case 'specificProduct':
			description = description + ', válido para os produtos '+ discountObject.productSlugs.toString();
			break;
	}
	switch(discountObject.whereApply){
		case 'oncePerOrder':
			description = description + '; <span class=\'obs\'> Desconto válido apenas para cada compra.</span>';
			break;
		case 'toEveryProduct':
			description = description + '; <span class=\'obs\'> Desconto válido para cada itém comrado.</span>';
			break;
	}
	return description;
	
};


exports.mainMenu = function(req,res){
	async.waterfall([
	function(done) {
		//products out of stock
		/*Inventory.aggregate([{$group:{_id:'$product',inventories:{$push:'$$ROOT'},count:{$sum:1}}}])
			 		.exec(function(err, result){
		 			if(err){
						return res.status(400).send({
							message: err
						});
					}
					var productsId = [];
					result.forEach(function(product){
						var isToAdd= true;
						product.inventories.forEach(function(inventory){
							if(!inventory.orderOutOfStock&&(inventory.sellInOutOfStock||inventory.quantity>0)){
								isToAdd = false;
							}
						});
						if(isToAdd)
							productsId.push(product._id.oid);
					});
					productsId = productsId.slice(0,5);
					Product.find({ '_id':{$in:productsId}})
						.where('onLineVisible').equals(true)
					   	.select('-_id title slug ')
					   	.exec(function(err,products){
					   		if(err){
								return res.status(400).send({
									message: err
								});
							}
							var outOFStock = [];
							if(products){
					            products.forEach(function(product) {
									outOFStock.push({'slug':product.slug,'title':product.title}); 
					            });
							}
							var response = {'loja':{collection:{}}};
							if(outOFStock.length>0){
								response.loja.collection['Fora de estoque'] = outOFStock;
							}
							done(err,response);
					   	});
   		});*/
		var response = {'loja':{collection:{}}};
		done(undefined,response);
	},
	function(response,done) {
		Collection.find({'onLineVisible':true}).or([{'gender':true},{'mainMenu':true}])
		.select('-_id slug gender otherProducts')
		.exec(function(err, collectionsSlugs){
			if(err){
				return res.status(400).send({
					message: err
				});
			}		
			var collectionsSlugsMapped = [];
			var collectionSlugGender = [];
			var collectionsSlugsNotGender = [];
			var collectionsSlugsOtherProducts = [];

			collectionsSlugs.forEach(function(collection){
				if(collection.gender)
					collectionSlugGender.push(collection.slug);
				else if(collection.otherProducts)
					collectionsSlugsOtherProducts.push(collection.slug);
				else
					collectionsSlugsNotGender.push(collection.slug);
			});
			collectionsSlugsMapped = _.union(collectionSlugGender,collectionsSlugsOtherProducts,collectionsSlugsNotGender);
			//todo with inventory?
			Inventory.aggregate([
                     { $match: {'orderOutOfStock':false,$or:[{'quantity':{$gt:0}},{'sellInOutOfStock':true}]} },
                     { $group: { _id: '$genderSlug', models: { $push: '$type' } } },
                   ],function(err, reponses){
                   			var gender = {};
							var otherProducts = {}; 
							var collection = response.loja.collection;
							reponses.forEach(function(elem){
								if(collectionSlugGender.indexOf(elem._id)>=0){
									gender[elem._id] = _.unique(elem.models);
								}
								if(collectionsSlugsOtherProducts.indexOf(elem._id)>=0){
									otherProducts[elem._id] = _.unique(elem.models);
								}
								if(collectionsSlugsNotGender.indexOf(elem._id)>=0){
									collection[elem._id] = _.unique(elem.models);
								}
							}); 

							response.loja.gender = gender;
							response.loja.collection = collection;
							response.loja.otherProducts = otherProducts;
				            done(err, response);
	        				// res.json(mainMenu);
			});
			
		});
	},
	function(response, done) {
		LocalStore.find({'onLineVisible':true}).exec(function(err,localStores){
			if (!err&&localStores) {
				response.localStores = {};
				var localStoresSlugs = [];
				localStores.forEach(function(store){
					localStoresSlugs.push(store.slug);
					response.localStores[store.slug] = {'title':store.title};
				});
				// Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
				// 	.distinct('product.$id')
			 // 		.exec(function(err, productsId){
				Product.find({})
				// .find({ '_id':{$in:productsId}})
						.where('onLineVisible').equals(true)
					   	.where('localStoresSlugs').in(localStoresSlugs)
					   	.select('-_id localStoresSlugs type')
					   	.exec(function(err,products){
					   		products.forEach(function(product){
					   			product.localStoresSlugs.forEach(function(storeSlug){
					   				if(response.localStores[storeSlug].products)
										response.localStores[storeSlug].products.push(product.type);
									else{
										response.localStores[storeSlug].products = [];
										response.localStores[storeSlug].products.push(product.type);
									}
					   			});
								
					   		});
				   		  	done(err, response);
							// res.json(response);
				   	});
			   	// });
				// res.send({
				// 	message: 'An email has been sent to ' + user.email + ' with further instructions.'
				// });
			}else if(err){
				done(err);
			}else{
				done(err, response);
			}

		});
	},function(response, done) {
		DiscountCode.findOne({onLineVisible:true,active:true,
			$and:[{$or:[{noTimesLimits:true},{timesLeft:{$gt:0}}]},
					{$or:[{noDateLimits:true},{endDate:{$lte:new Date()}}]}
				 ]
			})
			.exec(function(err,discountObject){
				if (!err&&discountObject) {
					var description = translateDiscountCode(discountObject);
					response.discount = discountObject;
					response.discount.description = discountObject.description||description;
					res.json(response);
				}else if(err){
					done(err);
				}else{
					res.json(response);
				}
			});
	}], function(err) {
		if(err){
			return res.status(400).send({
				message: err
			});
		}	
	});
};


exports.mainPage = function(req,res){
	async.waterfall([
	function(done) {
		 SiteContent.findOne({'visible':true,'_id':'frontPage'}).exec(function(err,content){
		 	if(err){
				done(err);
			}else{
				if(content)
			 		done(err,{'content':content});
			 	else
			 		done(err,{'content':new SiteContent()});
			}	
		 });
	},function(response,done) {
		 Collection.find({'onLineVisible':true}).or([{'gender':true},{'front':true}])
		.select('-_id title description slug image front gender')
		.exec(function(err, collectionsSlugs){
		 	if(err){
				done(err);
			}else{
				if(collectionsSlugs){
					response.collections = collectionsSlugs;
			 		done(err,response);
				}
			}	
		 });
	},function(response,done) {
		 LocalStore.find({'onLineVisible':true})
		 .select('-_id images title slug')
		 .exec(function(err,localStores){
		 	if(err){
				done(err);
			}else{
				if(localStores){
					response.localStores = localStores;
			 		done(err,response);
				}
			}	
		 });
	},function(response, done) {
			Inventory.find({'orderOutOfStock':false}).or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
						.distinct('product.$id')
				 		.exec(function(err, productsId){

					Product.find({ '_id':{$in:productsId}})
							.where('onLineVisible').equals(true)
						   	.where('collectionsSlugs').in(['destaque'])
						   	.select('-_id newProduct slug price title priceFormatted priceOldFormatted priceCompareWith images')
						   	// .limit(10)
						   	.exec(function(err,products){
						   		if(!err){
			   						products.forEach(function(product,indexProduct){
										var images = [];

										var frontImages = product.images.filter(function(image,indexImage){
											return image.frontImage;
										});
										var notFrontImage = product.images.filter(function(image,indexImage){
											return !image.frontImage;
										});

										if(frontImages.length>0){
											images = _.union(frontImages.slice(0,1),notFrontImage.slice(0,1));
										}else{
											images = notFrontImage.slice(0,2);
										}
										products[indexProduct].images = images;
										products[indexProduct].inventories = [];
									});
							   		response.destaque = products;
									res.json(response);
									//done(err,response);
								}else{
									done(err);
								}
				   	});
			   });
 			
	}], function(err) {
		if(err){
			return res.status(400).send({
				message: err
			});
		}	
	});
};

/**
 * Forgot for reset password (forgot POST)
 */
exports.sendContact = function(req, res, next) {
	async.waterfall([
		// Lookup user by email
		function(done) {
			if(req.body.userContact.email&&req.body.userContact.content&&req.body.userContact.subject){

				res.render('templates/contact-email', {
					name: req.body.userContact.name,
					email: req.body.userContact.email,
					phone: req.body.userContact.phone,
					content: req.body.userContact.content,
					appName: config.app.title
				}, function(err, emailHTML) {
					done(err, emailHTML, req.body.userContact);
				});
			}else{
				return res.status(400).send({
					message: 'Por favor preencha os dados corretamente.'
				});
			}

		},
		// If valid email, send reset email using service
		function(emailHTML, userContact, done) {
			var smtpTransport = nodemailer.createTransport(config.mailer.options);
			var mailOptions = {
				to: config.mailer.from,
				from: config.mailer.from,
				subject: 'Contato - '+userContact.subject,
				html: emailHTML
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				if (!err) {
					res.send({
						message: 'Obrigado por entrar em contato a equipe '+config.app.title+' agradece!'
					});
				}

				done(err);
			});
		}
	], function(err) {
		if(err){
			return res.status(400).send({
				message: err
			});
		}	
	});
};

/**
 * Get Address by 3 party reques (Address GET)
 */
exports.address = function(req, res, next) {
	var cep = req.query.cep;
	request.get({url:'https://viacep.com.br/ws/'+cep+'/json/', 
		timeout: 120000},
		function (error, response, body) {
		    if (!error && response.statusCode === 200) {
				return res.json(JSON.parse(body));
		    }else{
		    	return res.status(400).send({
					message: error
				});
		    }
	});
};