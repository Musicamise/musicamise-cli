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
	session = require('express-session'),
	_ = require('lodash');

var NodeCache = require('node-cache');
var myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

exports.getCart = function(req, res) {
	var key = 'cart'+req.sessionID;
	myCache.get(key, function( err, value ){
	  if( !err ){
	    if(!value){
	      // key not found 
	      var obj = {};
	      myCache.set(key,obj , function( err, success ){
			  if( !err && success ){
			     console.log('cache sucess:'+ success);
			  }
			});
	      res.json(obj);
	    }else{
  			console.log('cache found');
      		res.json(value);
	    }
	  }else{
	  	console.log('cache error:'+err);
	  }
	});

	// req.sessionID
	// var sess = req.session;

	// if(!sess.cart)
	// 	sess.cart = []
	// res.json(sess.cart);
};

exports.addItemCart = function(req, res) {

	myCache.get(key, function( err, value ){
	  if( !err ){
	    if(!value){
	      // key not found 
	      var obj = {};
	      myCache.set(key,obj , function( err, success ){
			  if( !err && success ){
			     console.log('cache sucess:'+ success);
			  }
			});
	      res.json(obj);
	    }else{
  			console.log('cache found');
      		res.json(value);
	    }
	  }else{
	  	console.log('cache error:'+err);
	  }
	});



	
	// var sess = req.session;

	// if(!sess.cart)
	// 	sess.cart = [];

	// if(req.query.a)
	// 	sess.cart.push({tes:req.query.a});
	
	// res.json(sess.cart);

};
exports.clean = function(req, res) {
	req.session.destroy(function(err){
		if(err) 
			res.json(false);
		else
			res.json(true);
	});
};