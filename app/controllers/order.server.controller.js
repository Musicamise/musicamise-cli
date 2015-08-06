'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	DiscountCode = mongoose.model('DiscountCode'),
	GiftCard = mongoose.model('GiftCard'),
	Inventory = mongoose.model('Inventory'),
	StatusOrder = mongoose.model('StatusOrder'),
	config = require('../../config/config'),
	Order = mongoose.model('Order'),
	session = require('express-session'),

	ObjectId = require('mongoose').Types.ObjectId,
	_ = require('lodash');


var parseString = require('xml2js').parseString;

var numeral = require('numeral');
var request = require('request');

var NodeCache = require('node-cache');
var myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });


var discountIsApplicable = function(cartItems,discountObject){

	var allCollections = [];
	var allProductSlugs = [];
	var total = 0;
	cartItems.forEach(function(product,index){
	 	allCollections = allCollections.concat(cartItems[index].product.collectionsSlugs);
	 	allProductSlugs.push(cartItems[index].product.slug);
	 	total = total+cartItems[index].product.total;
	});
	var discountCodeIsApplicable = false;

	if(discountObject){
		switch(discountObject.ordersValidation){
			case 'all':
				discountCodeIsApplicable = true;
				break;
			case 'overValue':
				discountCodeIsApplicable = total>=discountObject.overValueOf;
				break;
			case 'collections':
				discountObject.collectionsSlug.forEach(function(collectionSlug){
					if(allCollections.indexOf(collectionSlug)>=0){
						discountCodeIsApplicable = true;
					}
				});
				break;
			case 'specificProduct':
				discountObject.productSlugs.forEach(function(productSlug){
					if(allProductSlugs.indexOf(productSlug)>=0){
						discountCodeIsApplicable = true;
					}
				});
				break;
		}
	}
	return discountCodeIsApplicable; 

};

var processOrder = function(req,res,order,discountCodePost,giftCardPost){
	var key = 'order'+req.sessionID;
	
	order.totalValueItems = 0;
	order.totalItems = 0;
	if(order.products.length>0){
		order.products.forEach(function(product,index){

			order.products[index].priceWithQuantity = order.products[index].quantity* order.products[index].product.price;
			order.products[index].priceWithQuantityFormatted = 'R$'+ numeral(order.products[index].priceWithQuantity).format('0.00').replace('.',',');
			
			order.totalValueItems = order.totalValueItems +  order.products[index].quantity* order.products[index].product.price;
		 	order.totalItems =  order.totalItems +1;

		});
	}
	var discountCode ;
	if(order.discountCode)
		discountCode = order.discountCode._id;
	else if(discountCodePost)
		discountCode = discountCodePost;

	var giftCard ;
	if(order.giftCardCode)
		giftCard = order.giftCardCode._id;
	else if(giftCardPost)
		giftCard = giftCardPost;

	console.log('discountObject Process');
	console.log(discountCode);
	if(discountCode){
		DiscountCode.findOne({_id:discountCode,active:true,
			$and:[{$or:[{noTimesLimits:true},{timesLeft:{$gt:0}}]},
					{$or:[{noDateLimits:true},{endDate:{$lte:new Date()}}]}
				 ]
			})
			.exec(function(err,discountObject){

				if(!err&&discountObject){
					order.discountCode = discountObject;
					if(order.products.length>0){
						switch(discountObject.whereApply){
							case 'oncePerOrder':
								if(discountIsApplicable(order.products,discountObject)){
									switch(discountObject.typeForPay){
										case 'value':
											order.totalDiscount = discountObject.valueOf;
											break;
										case 'percent':
											order.totalDiscount = order.totalValueItems*discountObject.valueOf/100;
											break;
									}
								 	order.products.forEach(function(product,index){
										delete order.products[index].product.discountValue;
										delete order.products[index].product.discountValueFormatted;
									});
								}
								break;
							case 'toEveryProduct':
								order.totalDiscount = 0;
							 	order.products.forEach(function(product,index){

									if(discountIsApplicable([order.products[index]],discountObject)){
										switch(discountObject.typeForPay){
											case 'value':
												order.products[index].product.discountValue = order.products[index].quantity*discountObject.valueOf;
												order.products[index].product.discountValueFormatted = 'R$'+numeral(order.products[index].product.discountValue).format('0.00').replace('.',',');
												order.totalDiscount = order.totalDiscount+order.products[index].quantity*discountObject.valueOf;
												break;
											case 'percent': 
												order.products[index].product.discountValue = order.products[index].quantity*order.products[index].product.price*discountObject.valueOf/100; 
												order.products[index].product.discountValueFormatted = 'R$'+numeral(order.products[index].product.discountValue).format('0.00').replace('.',',');
												order.totalDiscount = order.totalDiscount+order.products[index].quantity*order.products[index].product.price*discountObject.valueOf/100; 
												break;
										}

									}		 							
								});
								break;
						}
					}
				}
				if(giftCard){
					GiftCard.find({_id:giftCard,active:true,used:false}).exec(function(err,giftCardObject){
						if(!err){
							if(giftCardObject){
								order.giftCard =giftCardObject;
								order.giftCardValue = giftCardObject.price;  
								order.giftCardValueFormatted = 'R$'+numeral(order.giftCardValue).format('0.00').replace('.',',');
							}
						}
						order.totalValueItemsFormatted = 'R$'+ numeral(order.totalValueItems).format('0.00').replace('.',',');
						order.totalShippingFormatted = 'R$'+numeral(order.totalShipping).format('0.00').replace('.',',');
						order.totalDiscountFormatted = 'R$'+numeral(order.totalDiscount).format('0.00').replace('.',',');
						order.total = order.totalValueItems + order.totalShipping - order.totalDiscount- (order.giftCardValue||0);
						order.totalFormatted = 'R$'+ numeral(order.total).format('0.00').replace('.',',');
			      		myCache.set(key,JSON.stringify(order) , function( err, success ){
							if( !err && success ){
						 		console.log('cache sucess:'+ success);

							}else{
								console.log('error:'+ err);
									return res.status(500).send({
									message: err
								});
							}
						});
			      		res.json({order:order});

					});
				}else{
					delete order.giftCard;
					delete order.giftCardValue;
					delete order.giftCardValueFormatted;
				}

				console.log('building last part');
				order.totalValueItemsFormatted = 'R$'+ numeral(order.totalValueItems).format('0.00').replace('.',',');
				order.totalShippingFormatted = 'R$'+numeral(order.totalShipping).format('0.00').replace('.',',');
				order.totalDiscountFormatted = 'R$'+numeral(order.totalDiscount).format('0.00').replace('.',',');
				order.total = order.totalValueItems + order.totalShipping - order.totalDiscount - (order.giftCardValue||0);
				order.totalFormatted = 'R$'+ numeral(order.total).format('0.00').replace('.',',');
				
				myCache.set(key,JSON.stringify(order) , function( err, success ){
					if( !err && success ){
				 		console.log('cache sucess:'+ success);

					}else{
						console.log('error:'+ err);
							return res.status(500).send({
							message: err
						});
					}
				});
	      		res.json({order:order});
		});
	}else{

		if(giftCard){
			GiftCard.find({_id:giftCard,active:true,used:false}).exec(function(err,giftCardObject){
				if(!err){
					if(giftCardObject){
						order.giftCard =giftCardObject;
						order.giftCardValue = giftCardObject.price;  
						order.giftCardValueFormatted = 'R$'+numeral(order.giftCardValue).format('0.00').replace('.',',');
					}
				}

				order.totalValueItemsFormatted = 'R$'+ numeral(order.totalValueItems).format('0.00').replace('.',',');
				order.totalShippingFormatted = 'R$'+numeral(order.totalShipping).format('0.00').replace('.',',');
				order.totalDiscountFormatted = 'R$'+numeral(order.totalDiscount).format('0.00').replace('.',',');
				order.total = order.totalValueItems + order.totalShipping - order.totalDiscount - (order.giftCardValue||0);
				order.totalFormatted = 'R$'+ numeral(order.total).format('0.00').replace('.',',');
	      		myCache.set(key,JSON.stringify(order) , function( err, success ){
					if( !err && success ){
				 		console.log('cache sucess:'+ success);

					}else{
						console.log('error:'+ err);
							return res.status(500).send({
							message: err
						});
					}
				});
	      		res.json({order:order});

			});
		}else{
			delete order.giftCard;
			delete order.giftCardValue;
			delete order.giftCardValueFormatted;
		}
		order.totalValueItemsFormatted = 'R$'+ numeral(order.totalValueItems).format('0.00').replace('.',',');
		order.totalShippingFormatted = 'R$'+numeral(order.totalShipping).format('0.00').replace('.',',');
		order.totalDiscountFormatted = 'R$'+numeral(order.totalDiscount).format('0.00').replace('.',',');
		order.total = order.totalValueItems + order.totalShipping - order.totalDiscount;
		order.totalFormatted = 'R$'+ numeral(order.total).format('0.00').replace('.',',');
		
		myCache.set(key,JSON.stringify(order) , function( err, success ){
			if( !err && success ){
		 		console.log('cache sucess:'+ success);

			}else{
				console.log('error:'+ err);
					return res.status(500).send({
					message: err
				});
			}
		});
  		res.json({order:order});
	}
};

var clone = function(obj) {
   return JSON.parse(JSON.stringify(obj));
};

var isEmptyObject = function(obj) {
  return !Object.keys(obj).length;
};

exports.getOrder = function(req, res) {
	
	var key = 'order'+req.sessionID;
	myCache.get(key, function( err, orderCachedJsonString ){
	  	if( !err ){
	    	if(!orderCachedJsonString){
	      	// key not found 
		      	var order = new Order();
		      	myCache.set(key,JSON.stringify(order), function( err, success ){
			  		if( !err && success ){
			     		console.log('order sucess:'+ success);
			  		}else{
			  			console.log('err err:'+ err);
			  		}
				});
				//res.json({cart:cart});
				console.log('going to proccess');
				// res.json({order:order});
				return processOrder(req,res,order);

	    	}else{
				var orderCached = new Order(JSON.parse(orderCachedJsonString)); 
	  			console.log('order found');
				return processOrder(req,res,orderCached);
	    	}
	  	}else{
		  	console.log('order error:'+err);
			res.json({order:{}});
	  	}
	});

};

exports.testeOrder = function(req,res){

	Inventory.findOne({ '_id':new ObjectId('55971baafe82f4a84ba0ccbb'),'orderOutOfStock':false})
		 .or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
		 .select('-_class')
		 .exec(function(err,inventory){
			if(!err){
				if(inventory){
					Product.findOne({'_id':inventory.product.oid})
					.where('onLineVisible').equals(true)
					.select('-_class -_id -userTags -inventories -storeVisible -localStoresSlugs')
					.exec(function(err,product){
						var discountCode = 'w6RqOlKfF6';
					 	DiscountCode.findOne({_id:discountCode,active:true,
						$and:[{$or:[{noTimesLimits:true},{timesLeft:{$gt:0}}]},
								{$or:[{noDateLimits:true},{endDate:{$lte:new Date()}}]}
							 ]
						})
						.exec(function(err,discountObject){

							var  order  = new Order();
							var inventoryClone = clone(inventory);
							inventoryClone.quantity = 1;
							order.discountCode = discountObject;
							order.products.push(inventoryClone);
							order.products[0].product = product;
							res.json({order:order});
						});

					});
				}
			}
		});
};

exports.getOrderJson = function(req, res) {
	var key = 'order'+req.sessionID;
	myCache.get(key, function( err, orderCached ){
	  if( !err ){
	    if(!orderCached){
	      // key not found 
	      	var order = {};
	      	myCache.set(key,order , function( err, success ){
		  		if( !err && success ){
		     		console.log('order sucess:'+ success);
		  		}
			});
			//res.json({cart:cart});
			return order;

	    }else{
  			console.log('order found 2' + orderCached);
			return orderCached;

	    }
	  }else{
	  	console.log('order error:'+err);
		return {};

	  }
	});

};


exports.updateOrderOrAddItem = function(req, res) {
	var key = 'order'+req.sessionID;
	var discountCode = req.body.discountCode;
	var giftCard = req.body.giftCard;

	var inventoryId = req.body.inventoryId||req.body.id;
	

	if(inventoryId){
		Inventory.findOne({ '_id':new ObjectId(inventoryId),'orderOutOfStock':false})
		 .or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
		 .select('-_class')
		 .exec(function(err,inventory){
			if(!err){
				if(inventory){
					Product.findOne({'_id':inventory.product.oid})
					.where('onLineVisible').equals(true)
					.select('-_class -_id -userTags -inventories -storeVisible -localStoresSlugs')
					.exec(function(err,product){

						if(err){
							console.log('error in product');  
							return res.status(500).send({
								message: err
							});
						}
						if(!product){
							console.log('no product found'); 
							return res.status(404).send({
								message: 'no product found'
							});
						}

						var quantity  = parseInt(req.body.quantity)||1;

						myCache.get(key, function( err, orderCachedJsonString ){
							if(err){ 	
								console.log('error:'+ err);
								return res.status(500).send({
									message: err
								});
							}
 				
							if(!orderCachedJsonString){
								if(inventory.quantity>=quantity){
									var order = new Order();
									inventory.quantity = quantity;
									order.products.push(inventory);
									order.products[0].product = product;
									return processOrder(req,res,order,discountCode,giftCard);
								}else{
									console.log('out of quantity');
									var orderCached = new Order(JSON.parse(orderCachedJsonString));
									return processOrder(req,res,orderCached,discountCode,giftCard);
								}
							}else{
								var orderCached2 = new Order(JSON.parse(orderCachedJsonString));
								var inventoryIndex = null;
								var orderContains = false;
								orderCached2.products.forEach(function(inventory,index){if(inventory._id+''===inventoryId+''){
									orderContains=true;
									inventoryIndex = index;
								}});

								if(orderCached2.products&&orderContains){

									if(req.body.quantity&&inventory.quantity>=quantity){
										orderCached2.products[inventoryIndex].quantity = quantity;
									}else if((orderCached2.products[inventoryIndex].quantity+1)<=inventory.quantity){
										orderCached2.products[inventoryIndex].quantity = orderCached2.products[inventoryIndex].quantity+1;
									}

									return processOrder(req,res,orderCached2,discountCode,giftCard);

								}else{
									if(inventory.quantity>=quantity){
										inventory.quantity = quantity;
										orderCached2.products.push(inventory);
										orderCached2.products[orderCached2.products.length-1].product = product;

										return processOrder(req,res,orderCached2,discountCode,giftCard);
										
									}else{
										console.log('out of quantity');
										return processOrder(req,res,orderCached2,discountCode,giftCard);
									}
								}
							}
						});							
					});
				}else{
					console.log('no inventory found');
					return res.status(404).send({
						message: 'no inventory found'
					});
				}
			}else{
				console.log('error');
				return res.status(500).send({
					message: err
				});
			}
		});
	}else{
		myCache.get(key, function( err, orderCachedJsonString ){
							if(err){ 	
								console.log('error:'+ err);
								return res.status(500).send({
									message: err
								});
							}
							var order ;
							if(orderCachedJsonString){
								order = new Order(JSON.parse(orderCachedJsonString));
							}else{
								order = new Order();
							}
							return processOrder(req,res,order,discountCode,giftCard);
						});
	}

};

exports.removeItemCart = function(req, res) {
	var key = 'order'+req.sessionID;
	// var quantity = parseInt(req.body.quantity)||1;
	// res.json({body:req.body,qunatity:quantity});
	var inventoryId = req.body.inventoryId||req.body.id;

	myCache.get(key, function( err, orderCachedJsonString ){
		if(err){ 	
			console.log('error:'+ err);
			return res.status(500).send({
				message: err
			});
		}


		if(orderCachedJsonString){
			var orderCached = new Order(JSON.parse(orderCachedJsonString));
			var inventoryIndex = null;
			var orderContains = false;
			if(orderCached.products){
				orderCached.products.forEach(function(inventory,index){if(inventory._id+''===inventoryId+''){
					orderContains=true;
					inventoryIndex = index;
				}});
				if(orderContains)
					orderCached.products.splice(inventoryIndex,1);
			}
			return processOrder(req,res,orderCached);

		}else{
			var order = new Order();
			return processOrder(req,res,order);
		}

	});	

};

exports.addDeliveryAddress = function(req,res){
	var key = 'order'+req.sessionID;
	var address = req.body.address;
	var user = req.user||req.body.user;


	if(!user){
		return res.status(500).send({
			message: 'Não logado ou usário nao encontrado!'
		});
	}
	if(address){
		myCache.get(key, function( err, orderCachedJsonString ){
			if(err){ 	
				console.log('error:'+ err);
				return res.status(500).send({
					message: err
				});
			}

			if(orderCachedJsonString){
				var orderCached = new Order(JSON.parse(orderCachedJsonString)); 
				if(!user.displayName)
					user.displayName = user.fullName;
				orderCached.shippingAddress = address;
				orderCached.user = user;

				myCache.set(key,JSON.stringify(orderCached) , function( err, success ){
					if( !err && success ){
				 		console.log('cache sucess:'+ success);

					}else{
						console.log('error:'+ err);
							return res.status(500).send({
							message: err
						});
					}
				});
	      		res.json({order:orderCached});
			}else{
				return res.status(500).send({
					message: 'order não achado'
				});
			} 


		});	
	}else{
		return res.status(500).send({
			message: 'Endereço não colocado'
		});
	}
};

exports.processToPagseguro = function(req,res){
	var key = 'order'+req.sessionID;
	var user = req.user;
	// request.post({url:'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout',
	//  form: {email:'administrador@musicamise.com.br',
	// 		token:'FC101192F9D3427DB332DB69DAE0AB4B',
	// 		currency:'BRL',
	// 		itemId1:'item1',
	// 		itemDescription1:'description',
	// 		itemAmount1: '10.00',
	// 		itemQuantity1:1
	// 		}},
 
	// 		function (error, response, body) {
	// 		    if (!error && response.statusCode === 200) {
	// 	    		parseString(body, function (err, result) {
	// 				    console.dir(result);
	// 				    //code={código de checkout}
	// 				    var code = result.checkout.code[0];
	// 				    console.log('code');
	// 				    console.log(code); 

	// 				    res.writeHead(301,
	// 				  		{Location: 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='+code}
	// 					);
	// 					res.end();
	// 				});
	// 		    }else{
	// 				return res.status(500).send({
	// 					message: error
	// 				});
	// 		    }
	// 		});

	// if(!user){
	// 	return res.status(500).send({
	// 		message: 'Não logado'
	// 	});
	// }
	myCache.get(key, function( err, orderCachedJsonString ){
		if(err){ 	
			console.log('error:'+ err);
			return res.status(500).send({
				message: err
			});
		}

		if(orderCachedJsonString){
			var orderCached = new Order(JSON.parse(orderCachedJsonString)); 
	        var paymentParameters = {};
	        paymentParameters.email =  config.pagseguro.clientMail;
	        // paymentParameters.charset = 'UTF-8';
	        paymentParameters.token = config.pagseguro.clientSecret;
	        paymentParameters.currency = 'BRL';

	        if(orderCached.user&&orderCached.shippingAddress&&orderCached.products.length>0){

		        //user - receiver
		        // paymentParameters.receiverEmail = orderCached.user.email;

		        //user - pay
		        // paymentParameters.senderEmail = orderCached.user.email;
		        // paymentParameters.senderName = orderCached.user.firstName;
		        // paymentParameters.senderAreaCode = '';
		        // paymentParameters.senderPhone = '';
		        // paymentParameters.senderCPF = ''; //Um número de 11 dígitos.
		        // paymentParameters.senderBornDate = ''; //dd/MM/yyyy (dia/mês/ano).

		        //reference
		        console.log('_id');
		        console.log(orderCached._id.toString());

		        paymentParameters.reference = orderCached._id.toString();

		     
		        // paymentParameters.shippingCost =  orderCached.totalShipping;//Total de shipping maior que 0.00 e menor ou igual a 9999999.00.

		        
		        //shipping address
		        paymentParameters.shippingType = 1;//1 - Encomenda normal (PAC). 2 -SEDEX 3-Tipo de frete não especificado.
		        paymentParameters.shippingAddressCountry = orderCached.shippingAddress.country||'Brasil';
		        if(orderCached.shippingAddress.state.length===2)
		        	paymentParameters.shippingAddressState = orderCached.shippingAddress.state; //Duas letras, em maiúsculo, representando a sigla do estado brasileiro correspondente.
		        paymentParameters.shippingAddressCity = orderCached.shippingAddress.city;
		        if(orderCached.shippingAddress.cep.length===8)
		        	paymentParameters.shippingAddressPostalCode = orderCached.shippingAddress.cep;//Um número de 8 dígitos.
		        paymentParameters.shippingAddressDistrict = orderCached.shippingAddress.bairro;
		        paymentParameters.shippingAddressStreet = orderCached.shippingAddress.address;
		        paymentParameters.shippingAddressNumber = orderCached.shippingAddress.number;
		        paymentParameters.shippingAddressComplement = orderCached.shippingAddress.complemento||'';

		        //extraAmount discount or gift card
		  //       paymentParameters.extraAmount = 0.00+'';
		  //       if(orderCached.totalDiscount>0)
		  //       	paymentParameters.extraAmount = -1*orderCached.totalDiscount;
				// if(orderCached.giftCardValue>0)
		  //       	paymentParameters.extraAmount = paymentParameters.extraAmount + (-1*orderCached.totalDiscount);
		        //redirect URL
		        paymentParameters.redirectURL = req.protocol+'://'+req.hostname+'/#!/thank-you';

		        //products
				orderCached.products.forEach(function(inventory,index){
				   	paymentParameters.itemId1 = inventory._id.toString();
			        paymentParameters.itemDescription1 = inventory.product.title;
			        paymentParameters.itemAmount1 = inventory.product.priceFormatted.replace('R$','').replace(',','.');//maior que 0.00 e menor ou igual a 9999999.00.
			        paymentParameters.itemQuantity1 =  inventory.quantity;//Um número inteiro maior ou igual a 1 e menor ou igual a 999.
			        // paymentParameters.itemShippingCost1 = ''; //maior que 0.00 e menor ou igual a 9999999.00.
			        // paymentParameters.itemWeight1 =  ''; // A soma dos pesos de todos os produtos não pode ultrapassar 30000 gramas
				});
				var status = new StatusOrder();
				status.status = 'AGUARDANDO';
				orderCached.status.push(status);
			 	orderCached.save(function(err,order){
					console.log('err');
					console.log(err); 
					console.log('order');
					console.log(order); 
			 	});
			 	console.dir(paymentParameters);
				request.post({url:'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout', 
					form: paymentParameters},
					function (error, response, body) {
					    if (!error && response.statusCode === 200) {
				    		parseString(body, function (err, result) {
							    console.dir(result);
							    //code={código de checkout}
							    var code = result.checkout.code[0];
							    console.log('code');
							    console.log(code); 

						    	res.json({url:'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='+code});

							 //    res.writeHead(301,
							 //  		{Location: 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='+code}
								// );
								// res.end();
							});
					    }else{
						    console.log(body);

							return res.status(500).send({
								message: error
							});
					    }
					});


		        
				 
	        }

		}else{
			return res.status(500).send({
				message: 'order não achado'
			});
		} 


	});	
};


exports.clean = function(req, res) {
	myCache.flushAll();
	res.json(true);
};
