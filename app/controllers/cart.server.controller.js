'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	Inventory = mongoose.model('Inventory'),
	session = require('express-session'),
	ObjectId = require('mongoose').Types.ObjectId,
	_ = require('lodash');

var numeral = require('numeral');

var NodeCache = require('node-cache');
var myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

var processCart = function(cartItems){
	var cart = {};
	cart.items = cartItems;
	cart.totalItems = 0;
	cart.totalValueItems = 0.0;
	cart.totalValueItemsFormatted = '';
	cart.totalShipping = 0;
	cart.totalShippingFormatted = '';
	cart.totalDiscount = 0;
	cart.totalDiscountFormatted = '';
	cart.total = 0;
	cart.totalFormatted = '';

	Object.keys(cart.items).forEach(function(key,index){
		cart.totalValueItems = cart.totalValueItems +  cart.items[key].quantity* cart.items[key].product.price;
	 	cart.totalItems =  cart.totalItems +1;
	});
	cart.totalValueItemsFormatted = 'R'+ numeral(cart.totalValueItems).format('$0.00').replace('.',',');
	cart.totalShippingFormatted = 'R'+numeral(cart.totalShipping).format('$0.00').replace('.',',');
	cart.totalDiscountFormatted = 'R'+numeral(cart.totalDiscount).format('$0.00').replace('.',',');
	cart.total = cart.totalValueItems + cart.totalShipping - cart.totalDiscount;
	cart.totalFormatted = 'R'+ numeral(cart.total).format('$0.00').replace('.',',');
	return cart;
};


exports.getCart = function(req, res) {
	var key = 'cart'+req.sessionID;
	myCache.get(key, function( err, cartCached ){
	  if( !err ){
	    if(!cartCached){
	      // key not found 
	      	var cart = {};
	      	myCache.set(key,cart , function( err, success ){
		  		if( !err && success ){
		     		console.log('cache sucess:'+ success);
		  		}
			});
	      res.json({cart:processCart(cartCached)});
	    }else{
  			console.log('cache found');
      		res.json({cart:processCart(cartCached)});
	    }
	  }else{
	  	console.log('cache error:'+err);
  		res.json({cart:processCart({})});

	  }
	});

};

exports.addItemCart = function(req, res) {
	var key = 'cart'+req.sessionID;
	// var quantity = parseInt(req.body.quantity)||1;
	// res.json({body:req.body,qunatity:quantity});

	var inventoryId = req.body.inventoryId||req.body.id;
	console.log('inventory :'+inventoryId);
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

						myCache.get(key, function( err, cartCached ){
							if(err){ 	
								console.log('error:'+ err);
								return res.status(500).send({
									message: err
								});
							}
 
							if(!cartCached){
								if(inventory.quantity>=quantity){
									// inventory.product = {};
									// inventory.quantity = quantity;
									// var item = {'id':inventory._id,inventory:inventory,product:product};
									var cart = {};
									cart[inventory._id] = {product:product,size:inventory.size,genderSlug:inventory.genderSlug,quantity:quantity};
									// cart.push(item);
									//console.log(cart);
									myCache.set(key,cart , function( err, success ){
										if( !err && success ){
									 		console.log('cache sucess:'+ success);
								      		res.json({cart:processCart(cart)});

										}else{
											console.log('error:'+ err);
 											return res.status(500).send({
												message: err
											});
										}
									});
								}else{
									console.log('out of quantity');
						      		res.json({cart:processCart(cartCached)});

								}
							}else{

								// console.log('cache found');
								// var itemSelected = cartCached.filter(function(itemValue){
								// 			return itemValue.id === inventoryId;
								// 			});
								console.log(cartCached);
								if(cartCached[inventoryId]){

									if(req.body.quantity&&inventory.quantity>=quantity){
										cartCached[inventoryId].quantity = quantity;
									}else if((cartCached[inventoryId].quantity+1)<=inventory.quantity){
										cartCached[inventoryId].quantity = cartCached[inventoryId].quantity+1;
									}

									myCache.set(key,cartCached , function( err, success ){
										if( !err && success ){
									 		console.log('cache sucess update the quantity only:'+ success);
 											res.json({cart:processCart(cartCached)});
										}else{
											console.log('error:'+ err);
 											return res.status(500).send({
												message: err
											});
										}
									});
								}else{
									if(inventory.quantity>=quantity){
										// delete inventory.product;
										// inventory.quantity = quantity;
										// var item2 = {'id':inventory._id,inventory:inventory,product:product};
										var cart2 = {};
										// cart2.push(item2);
										cart2[inventory._id] = {product:product,size:inventory.size,genderSlug:inventory.genderSlug,quantity:quantity};

										myCache.set(key,cart2 , function( err, success ){
											if( !err && success ){
										 		console.log('cache sucess:'+ success);
									      		res.json({cart:processCart(cart2)});

											}else{
												console.log('error:'+ err);
	 											return res.status(500).send({
													message: err
												});
											}
										});
									}else{
										console.log('out of quantity');
							      		res.json({cart:processCart(cartCached)});

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
	}

};

exports.removeItemCart = function(req, res) {
	var key = 'cart'+req.sessionID;
	// var quantity = parseInt(req.body.quantity)||1;
	// res.json({body:req.body,qunatity:quantity});
	var inventoryId = req.body.inventoryId||req.body.id;

	myCache.get(key, function( err, cartCached ){
		if(err){ 	
			console.log('error:'+ err);
			return res.status(500).send({
				message: err
			});
		}

		if(cartCached){
			if(cartCached[inventoryId]){
				delete cartCached[inventoryId];
				myCache.set(key,cartCached , function( err, success ){
					if( !err && success ){
				 		console.log('cache sucess update the quantity only:'+ success);
					}else{
						console.log('error:'+ err);
							return res.status(500).send({
							message: err
						});
					}
				});
			}
		}
		res.json(processCart(cartCached));

	});	
};



exports.clean = function(req, res) {
	myCache.flushAll();
	res.json(true);

	// req.session.destroy(function(err){
	// 	if(err) 
	// 		res.json(false);
	// 	else
	// 		res.json(true);
	// });
};