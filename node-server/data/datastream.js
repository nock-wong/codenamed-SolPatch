var mongoose = require('mongoose');

var datapointSchema = mongoose.Schema({
	value:   		Number,
	timestamp: 		Date,
});

var schema = mongoose.Schema({
	record:   		[datapointSchema],
	units: 			String,
});
	
var model = mongoose.model("Datastream", schema);

exports.schema = schema;
exports.model = model;
