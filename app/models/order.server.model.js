'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var User = require('./clientUser.server.model').getUserSchema();
var Address = require('./address.server.model').getAddressSchema();
var DiscountCode = require('./discountCode.server.model').getDiscountCodeSchema();
var Product = require('./product.server.model').getProductSchema();
var GiftCard = require('./giftCard.server.model').getGiftCardSchema();
var moment = require('moment');

var DBRef = mongoose.SchemaTypes.DBRef;
var objectInventorySchema = {
 	_id: {
		type: String,
		default: '',
		trim: true
	},
	orderOutOfStock: {
		type: Boolean,
		default: true
	},
	sellInOutOfStock: {
		type: Boolean,
		default: true
	},
	size: {
		type: String,
		default: '',
		trim: true
	},
	genderSlug: {
		type: String,
		default: '',
		trim: true
	},
	quantity: {
		type: Number,
		default:0
	},
	priceWithQuantity: {
		type: Number,
		default: 0
	},
	priceWithQuantityFormatted: {
		type: String,
		default: '',
		trim: true
	},
	product:Product

};
/**
 * Product Schema
 */
var statusEnum = {
  values: 'AGUARDANDO PAGO DISPONIVEL EMDISPUTA DEVOLVIDA CANCELADO CHARGEBACK EMCONESTACAO'.split(' '),
  message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};
var StatusOrderSchema = new Schema({
    createdDate: {type: Date,default: Date.now},
    status: {type: String,enum: statusEnum,default:'' }
});
var OrderSchema = new Schema({
	friendlyId:{
		type: String,
		default: '',
	},
	products: {
		type: [objectInventorySchema],
		default:[]
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	updatedDate: {
		type: Date,
		default: Date.now
	},
	notes: {
		type: String,
		default: '',
	},
	email: {
		type: String,
		default: '',
		trim: true
	},
	status:{
		type:[StatusOrderSchema],
		default:[]
	},
	statusEntrega:{
		type: String,
		default: '',
	},
	user: {
	},
	shippingAddress: {
		type: Address
	},
	giftCard: {
		type: GiftCard
	},
	discountCode: {
		type: DiscountCode
	},
	totalItems: {
		type: Number,
		default:0
	},
	total: {
		type: Number,
		default:0
	},
	totalFormatted: {
		type: String,
		default: 'R$0,00',
		trim: true
	},
	totalValueItems: {
		type: Number,
		default:0
	},
	totalValueItemsFormatted: {
		type: String,
		default: 'R$0,00',
		trim: true
	},
	totalShipping: {
		type: Number,
		default:0
	},
	totalShippingFormatted: {
		type: String,
		default: 'R$0,00',
		trim: true
	},
	totalDiscount: {
		type: Number,
		default:0
	},
	totalDiscountFormatted: {
		type: String,
		default: 'R$0,00',
		trim: true
	},
	giftCardValue: {
		type: Number,
		default:0
	},
	giftCardValueFormatted: {
		type: String,
		default: 'R$0,00',
		trim: true
	},
	pagSeguroInfo:{},
	message:{},
	localvar:{},
	lastStatus:{}
});

/**
 * Hook a pre save method to hash the password
 */
OrderSchema.pre('save', function(next) {
	if(this.lastStatus)
		delete this.lastStatus;
	if(this.localvar)
		delete this.localvar;
	if(this.message)
		delete this.message;
	if (this.user) {
		delete this.user.createdDate;
		delete this.user.updatedDate;
		delete this.user.additionalProvidersData;
		delete this.user.providerData;
		this.email = this.user.email;
	}
	if(this.discountCode){
		delete this.discountCode.startDate;
		delete this.discountCode.endDate;
		delete this.discountCode.createdDate;
	}
	if(!this.friendlyId){
		this.friendlyId = 'ordem-'+
							Math.floor((Math.random() * 10000) + 1)+'-'+
							moment().format('DDMMYYYYHHmm');
	}
	next();

});
OrderSchema.virtual('localvar.lastStatus').get(function () {
	if(this.status.length>0){
  		return this.status[this.status.length-1].status;
	}else{
		return undefined;
	}
});
mongoose.model('Order', OrderSchema,'order');
mongoose.model('StatusOrder', StatusOrderSchema);
