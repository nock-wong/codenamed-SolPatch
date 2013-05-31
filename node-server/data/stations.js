var mongoose = require('mongoose');

var schema = mongoose.Schema({
	id: 			String,
	phonenumber:    String,
	portState:      Boolean,
	coordinates: 	{lat: Number, lon: Number},
	address:        {city: String, state: String, zip: String, country: String} 
});

var model = mongoose.model('Station', schema);

exports.model = model;
exports.schema = schema;