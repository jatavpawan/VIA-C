// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Property', new Schema({ 
    city: String,
    province: String,
    address: String,
    image_url: String,
    term: Number, // in month
    min_invest_amount: Number,
    anual_return: Number, // in %
    end_date: Date,
    funding_amount: Number, // in dollar
    property_description: String,
    property_status: { type: String, default: 'ACTIVE' },
    property_description_address: String,
    property_strategy_city: String,
    ownership_type: String,
    property_size: String,
    beds: String,
    baths: String,
    investors: []
}));