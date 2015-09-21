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
	async = require('async'),
	ObjectId = require('mongoose').Types.ObjectId,
	_ = require('lodash');

var moment = require('moment');

var parseString = require('xml2js').parseString;

var numeral = require('numeral');
var request = require('request');

var NodeCache = require('node-cache');
var myCache = new NodeCache({ stdTTL: 1000, checkperiod: 600 });
var cepOrigen = '52031300';

var discountIsApplicable = function(cartItems,discountObject){

	var allCollections = [];
	var allProductSlugs = [];
	var total = 0;
	cartItems.forEach(function(product,index){
	 	allCollections = allCollections.concat(cartItems[index].product.collectionsSlugs);
	 	allProductSlugs.push(cartItems[index].product.slug);
	 	total = total+cartItems[index].priceWithQuantity;
	});
	var discountCodeIsApplicable = false;
	
	if(discountObject){
		switch(discountObject.ordersValidation){
			case 'all':
				discountCodeIsApplicable = true;
				break;
			case 'overValue':
				console.log('overValue');

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

var contability = function(order,discountObject,giftCardObject){
	order.totalValueItems = 0;
	order.totalItems = 0;
	if(order.products.length>0){
		order.products.forEach(function(product,index){

			order.products[index].priceWithQuantity = order.products[index].quantity* order.products[index].product.price;
			order.products[index].priceWithQuantityFormatted = 'R$'+ numeral(order.products[index].priceWithQuantity).format('0.00').replace('.',',');
			
			order.totalValueItems = order.totalValueItems +  order.products[index].quantity* order.products[index].product.price;
		 	order.totalItems =  order.totalItems +1;

		});
	}else{
		order.totalShipping = 0.0;
		order.totalDiscount = 0.0;
	}

	if(discountObject){
		console.log('entrou com object discount');
		if(order.products.length>0){
			switch(discountObject.whereApply){
				case 'oncePerOrder':
					console.log('entrou com oncePerOrder');
					if(discountIsApplicable(order.products,discountObject)){
						console.log('is applicable');

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
	if(giftCardObject){
		order.giftCardValue = giftCardObject.price;  
		order.giftCardValueFormatted = 'R$'+numeral(order.giftCardValue).format('0.00').replace('.',',');
	}else{
		delete order.giftCard;
		delete order.giftCardValue;
		delete order.giftCardValueFormatted;
	}

	//
	order.totalValueItemsFormatted = 'R$'+ numeral(order.totalValueItems).format('0.00').replace('.',',');
	order.totalShippingFormatted = 'R$'+numeral(order.totalShipping).format('0.00').replace('.',',');
	order.totalDiscountFormatted = 'R$'+numeral(order.totalDiscount).format('0.00').replace('.',',');
	order.total = order.totalValueItems + order.totalShipping - order.totalDiscount- (order.giftCardValue||0);
	order.totalFormatted = 'R$'+ numeral(order.total).format('0.00').replace('.',',');
	return order;
};

var updateOrderByAvaibleInventories = function(order,inventories){
	var toRemove = [];
	var message = '';
	order.products.forEach(function(productOrder,productOrderIndex){
		var inventoryToCompare ;

 		inventories.forEach(function(inventory,index){
 			if(productOrder._id+''===inventory._id+''){
 				inventoryToCompare = inventory;
 			}
		});


 		if(!inventoryToCompare||
 			inventoryToCompare&&
 			inventoryToCompare.sellInOutOfStock===false&&
 			inventoryToCompare.quantity<productOrder.quantity){

 			console.log('entrou em message');

			message = message+ 'Produto '+ productOrder.product.title+' fora de estoque, desculpe o inconveniente!\n';
			toRemove.push(productOrder);

			console.log('message'); 				
			console.log(message); 		
		}

 	});
 	order.products = _.difference(order.products,toRemove);
 	return message;
};

var processOrder = function(req,res,order,discountCodePost,giftCardPost){
	async.waterfall([
	function(done){
		order.message = undefined;
		if(order.shippingUpdated){
			var cepDestino ;
			if(order.shippingAddress)
				cepDestino = order.shippingAddress.cep;
			else
				cepDestino = undefined;
			if(cepDestino){

				var object = {};
				object.nCdEmpresa = '';
				object.sDsSenha = '';
				object.sCepOrigem = cepOrigen;
				object.sCepDestino = cepDestino;
				object.nVlPeso = '1';
				object.nCdFormato = '1';
				object.nVlComprimento = '16';
				object.nVlAltura = '2';
				object.nVlLargura = '11';
				object.sCdMaoPropria = 'N';
				object.nVlValorDeclarado = '150';
				object.sCdAvisoRecebimento = 'N';
				object.nCdServico = '41106'; // outros sao possiveis
				object.nVlDiametro = '0';
				object.StrRetorno = 'xml';

				request.get({url:'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx', 
						qs: object,timeout: 120000},
						function (error, response, body) {

						    if (!error && response.statusCode === 200) {
					    		parseString(body, function (err, result) {
					    			console.log(result);
									done(err,{correios:result});
								});
						    }else{
								done(error);
						    }

						});
			}else{
				done(undefined,{correios:undefined});
			}
		}else{
			done(undefined,{correios:undefined});
		}

	},function(result,done){
		/*if(order.shippingUpdated){
			var cepDestino ;
			if(order.shippingAddress)
				cepDestino = order.shippingAddress.cep;
			else
				cepDestino = undefined;

			if(cepDestino){
				var urlTo = 'http://cep.correiocontrol.com.br/'+cepDestino+'.json';
				request.get({url:urlTo,timeout: 120000},
					function (error, response, body) {

					    if (!error && response.statusCode === 200) {
					    	if(body.indexOf('erro')<0){
					    		result.destinoAddress = JSON.parse(body);
				    			done(error,result);
					    	}else{
					    		result.destinoAddress = undefined;
					    		done('Endereço não encontrado');
					    	}
					    }else{
					    	done(error);
					    }

					});
			}else{
		    	result.destinoAddress = undefined;
				done(undefined,result);
			}
		}else{
			result.destinoAddress = undefined;
			done(undefined,result);
		}*/
		result.destinoAddress = undefined;
		done(undefined,result);

	},function(result,done) {
		var cepDestino ;
		if(order.shippingAddress)
			cepDestino = order.shippingAddress.cep;
		else
			cepDestino = undefined;	
		//calculate the frete!
		if(cepDestino&&order.shippingUpdated){
			//todo get result and set on shipping
			if(result.destinoAddress&&result.destinoAddress.uf==='PE'){
				order.totalShipping = 0.00;
			}
			else if(result.correios.Servicos.cServico.length>0&&result.correios.Servicos.cServico[0].Valor){
				order.totalShipping =parseFloat(result.correios.Servicos.cServico[0].Valor[0].replace(',','.'));
			}
			else if(result.correios.Servicos.cServico.length>0&&result.correios.Servicos.cServico[0].MsgErro){
				order.message = 'Algo errado com o cep. Entre em contato com a Equipe Musicamise: administrador@musicamise.com.br';
			}
			if(result.correios.Servicos.cServico.length>0&&result.correios.Servicos.cServico[0].PrazoEntrega){
				order.shippingAddress.prazo = result.correios.Servicos.cServico[0].PrazoEntrega[0]+' dias úteis';
			}
		}
		order.shippingUpdated = false;
	 	done(undefined,order);
	},function(order,done){
		var giftCard ;
		if(order.giftCardCode)
			giftCard = order.giftCardCode._id;
		else if(giftCardPost)
			giftCard = giftCardPost;
		if(giftCard){
			GiftCard.find({_id:giftCard,active:true,used:false}).exec(function(err,giftCardObject){
				if(!err){
					if(giftCardObject){
						order.giftCard =giftCardObject;
					}
				}

	  		 	done(err, order);

			});
		}else{
			done(undefined,order);
		}
	},function(order,done){
		var discountCode ;
		if(order.discountCode)
			discountCode = order.discountCode._id;
		else if(discountCodePost)
			discountCode = discountCodePost;

		if(discountCode){
			console.log('entrou em discount');
		DiscountCode.findOne({_id:discountCode,active:true,
				$and:[{$or:[{noTimesLimits:true},{timesLeft:{$gt:0}}]},
						{$or:[{noDateLimits:true},{endDate:{$lte:new Date()}}]}
					 ]
				})
				.exec(function(err,discountObject){
					console.log(discountObject);
					if(!err&&discountObject){
						order.discountCode = discountObject;
					}
  		  		 	done(err, order);
					// res.json({order:order});
			});
		}else{
			done(undefined,order);
		}
	},function(order, done) {
		//check for availality
		console.log('checking avaibality');
		
		if(order.products.length>0){
			var inventoryIds = [];
			order.products.forEach(function(product,_index){
				console.log(product);
				inventoryIds.push(product._id);
			});
			console.log(inventoryIds);
			Inventory.find({ '_id':{$in:inventoryIds},'orderOutOfStock':false})
				 .or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
				 .select('-_class')
				 .exec(function(err,inventories){
				 	if(err){
			 			done(err);
			 		}
			 		//check if all the order.products returned if not you can exclude already 
			 		//has not quantity==0 or just got orderOutOfStock true
			 		var message = updateOrderByAvaibleInventories(order,inventories);
 					order.message = message;
 					done(err,order);

				 });
		}else{
			done(undefined,order);
		}
	},function(order, done) {
		var key = 'order'+req.sessionID;

		var discountObject = order.discountCode;
		var giftCardObject = order.giftCard;
		console.log('doing the counts');
		order = contability(order,discountObject,giftCardObject);

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
	}], function(err) {
		if(err){
			return res.status(400).send({
				message: err
			});
		}	
	});
};

var clone = function(obj) {
   return JSON.parse(JSON.stringify(obj));
};

var isEmptyObject = function(obj) {
  return !Object.keys(obj).length;
};

exports.getOrderById = function(req,res){
	var id = req.query.id;
	var nowThreeMonthsAgo = moment();
	nowThreeMonthsAgo = nowThreeMonthsAgo.subtract(3,'months');
	Order.findOne({'_id':new ObjectId(id),
					'status':{$elemMatch:{$or:[{'status':'PAGO'},
											{'status':'CANCELADO'},
											{'status':'DEVOLVIDA'}]}},
					'createdDate':{$gte:nowThreeMonthsAgo.valueOf()}})
					.select(' -user -_class -emailSents  ')
					.exec(function(err,order){
						if(err){
							console.log('error in getOrderById');  
							return res.status(500).send({
								message: err
							});
						}
						if(order){
							order.lastStatus = order.localvar.lastStatus;
							res.json({order:order});
						}else{
							return res.status(404).send({
								message: 'no inventory found'
							});
						}
					});

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
				// return processOrder(req,res,order);
		  		res.json({order:order});

	    	}else{
				var orderCached = new Order(JSON.parse(orderCachedJsonString)); 
	  			console.log('order found');
				// return processOrder(req,res,orderCached);
		  		res.json({order:orderCached});

	    	}
	  	}else{
		  	console.log('order error:'+err);
			res.json({order:{}});
	  	}
	});

};


exports.updateOrderOrAddItem = function(req, res) {
	var key = 'order'+req.sessionID;
	var discountCode = req.body.discountCode;
	var giftCard = req.body.giftCard;

	var inventoryId = req.body.inventoryId||req.body.id;

	if(inventoryId){
		Inventory.findOne({ '_id':inventoryId,'orderOutOfStock':false})
		 .or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
		 .select('-_class')
		 .exec(function(err,inventory){
			if(!err){
				if(inventory){
					Product.findOne({'_id':inventory.product.oid})
					.where('onLineVisible').equals(true)
					.select('-_class -_id -userTags -inventories  -storeVisible -localStoresSlugs')
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
									var images = product.images.filter(function(image){ return image.frontImage;});
									if(images.length<=0){
										images = product.images.slice(0,1);
									}
									order.products[0].product = product;
									order.products[0].product.images = images;
									return processOrder(req,res,order,discountCode,giftCard);
								}else{
									console.log('out of quantity');

									var orderCached = new Order(JSON.parse(orderCachedJsonString));
									orderCached.message='Não foi possível atualizar.';
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
										var images2 = product.images.filter(function(imageTemp){return imageTemp.frontImage;});
										if(images2.length<=0){
											images2 = product.images.slice(0,1);
										}
										orderCached2.products[orderCached2.products.length-1].product = product;
										orderCached2.products[orderCached2.products.length-1].product.images = images2;
										return processOrder(req,res,orderCached2,discountCode,giftCard);
										
									}else{
										console.log('out of quantity');
										orderCached2.message='Não foi possível atualizar.';
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
				orderCached.products.forEach(function(inventory,index){
					if(inventory._id+''===inventoryId+''){
						orderContains=true;
						inventoryIndex = index;
				}});
				if(orderContains)
					orderCached.products.splice(inventoryIndex,1);
			}
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

	var checkPriceForDelivery = req.body.checkPriceForDelivery;

	if(!user&&!checkPriceForDelivery){
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
				if(!checkPriceForDelivery){
					orderCached.user = user;
					if(!user.displayName)
						user.displayName = user.fullName;
				}
				
				orderCached.shippingAddress = address;

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
				orderCached.shippingUpdated = true;
				return processOrder(req,res,orderCached);
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
	async.waterfall([
	function(done){
		var key = 'order'+req.sessionID;
		console.log('init');
		myCache.get(key, function( err, orderCachedJsonString ){
			if(err||!orderCachedJsonString){ 	
				console.log('error:'+ err);
				done(err);
			}else{
				var order = new Order(JSON.parse(orderCachedJsonString));
				order.message = undefined;
				if(order.products.length>0){
					console.log('order.products.length');

					var inventoryIds = [];
					order.products.forEach(function(product,_index){
						inventoryIds.push(product._id);
					});
					Inventory.find({ '_id':{$in:inventoryIds},'orderOutOfStock':false})
						 .or([{'quantity':{$gt:0}},{'sellInOutOfStock':true}])
						 .select('-_class')
						 .exec(function(err,inventories){
						 	if(err){
			 					done(err);
						 	}

						 	var message = updateOrderByAvaibleInventories(order,inventories);
						 	order.message = message;
						 	console.log('order.products');
						 	console.log(order.products);
						 	if(order.message){
	 							console.log('order.message');
	 							var discountObject = order.discountCode;
								var giftCardObject = order.giftCard;
								order = contability(order,discountObject,giftCardObject);
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
	 							
			 					done(order.message);
						 	}
			 				else{
								console.log('!order.message');
			 					done(err,order);
			 				}
						 });
				}else{
					done(err,order);
				}

			}
		});
	},function(order,done){
		var key = 'order'+req.sessionID;
		var user = req.user;
		if(order){
	        var paymentParameters = {};
	        paymentParameters.email =  config.pagseguro.clientMail;
	        // paymentParameters.charset = 'UTF-8';
	        paymentParameters.token = config.pagseguro.clientSecret;
	        paymentParameters.currency = 'BRL';

	        if(order.user&&order.shippingAddress&&order.products.length>0){
				console.log('init2');

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
		        console.log(order._id.toString());

		        paymentParameters.reference = order._id.toString();

		     
		        paymentParameters.shippingCost = numeral(order.totalShipping).format('0.00'); //Total de shipping maior que 0.00 e menor ou igual a 9999999.00.

		        
		        //shipping address
		        paymentParameters.shippingType = 1;//1 - Encomenda normal (PAC). 2 -SEDEX 3-Tipo de frete não especificado.
		        paymentParameters.shippingAddressCountry = order.shippingAddress.country||'Brasil';
		        if(order.shippingAddress.state.length===2)
		        	paymentParameters.shippingAddressState = order.shippingAddress.state; //Duas letras, em maiúsculo, representando a sigla do estado brasileiro correspondente.
		        paymentParameters.shippingAddressCity = order.shippingAddress.city;
		        if(order.shippingAddress.cep.length===8)
		        	paymentParameters.shippingAddressPostalCode = order.shippingAddress.cep;//Um número de 8 dígitos.
		        paymentParameters.shippingAddressDistrict = order.shippingAddress.bairro;
		        paymentParameters.shippingAddressStreet = order.shippingAddress.address;
		        paymentParameters.shippingAddressNumber = order.shippingAddress.number;
		        paymentParameters.shippingAddressComplement = order.shippingAddress.complemento||'';

		        //extraAmount discount or gift card
		  //       paymentParameters.extraAmount = 0.00+'';
		        if(order.totalDiscount>0)
		        	paymentParameters.extraAmount =  numeral(-1*order.totalDiscount).format('0.00'); 
				// if(order.giftCardValue>0)
		  //       	paymentParameters.extraAmount = paymentParameters.extraAmount + (-1*order.totalDiscount);
		        //redirect URL
		        paymentParameters.redirectURL = req.protocol+'://'+req.hostname+'/#!/thank-you';

		        //products
				order.products.forEach(function(inventory,index){
				   	paymentParameters['itemId'+(index+1)] = inventory._id.toString();
			        paymentParameters['itemDescription'+(index+1)] = inventory.product.title;
			        paymentParameters['itemAmount'+(index+1)]  = numeral(inventory.product.price).format('0.00'); //maior que 0.00 e menor ou igual a 9999999.00.
			        paymentParameters['itemQuantity'+(index+1)]  =  inventory.quantity;//Um número inteiro maior ou igual a 1 e menor ou igual a 999.
			        // paymentParameters.itemShippingCost1 = ''; //maior que 0.00 e menor ou igual a 9999999.00.
			        // paymentParameters.itemWeight1 =  ''; // A soma dos pesos de todos os produtos não pode ultrapassar 30000 gramas
				});
				
			 	console.dir(paymentParameters);
			 	var urlPagseguro =  config.pagseguro.clientUrl;
				request.post({url:urlPagseguro, 
					form: paymentParameters},
					function (error, response, body) {
					    if (!error && response.statusCode === 200) {
				    		parseString(body, function (err, result) {
							    console.dir(result);
							    //code={código de checkout}
							    var code = result.checkout.code[0];
						    	//check for availality
								
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

								if(order.message){
						    		res.json({url:'/'});
								}else{
									var status = new StatusOrder();
									status.status = 'AGUARDANDO';
									order.status.push(status);
									order.pagSeguroInfo = {};
									order.pagSeguroInfo.reference = code;
								 	order.save(function(err,orderSaved){
										console.log('err');
										console.log(err); 
										console.log('order');
										console.log(orderSaved); 
								 	});
						    		res.json({url:'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='+code,code:code});
					
								}
							 
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
	}], function(err) {
		if(err){
			return res.status(400).send({
				message: err
			});
		}	
	});
};


exports.clean = function(req, res) {
	myCache.flushAll();
	res.json(true);
};

