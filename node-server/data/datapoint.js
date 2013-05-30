var mongoose = require('mongoose');

var schema = mongoose.Schema({
	value:   		Number,
	timestamp: 		Date,
});
	
var model = mongoose.model("Datapoint", schema);

exports.model = model;
exports.schema = schema;
