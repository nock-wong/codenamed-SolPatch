var mongoose = require('mongoose'),
	Datastream = require('./datastream.js');

var schema = mongoose.Schema({
	id:          		Number,
	phone:              String,
	location: {
		streetNumber:   String,
		streetName:     String,
		zipcode:        String,
		longitude: 		Number,
		latitude:   	Number,  
	},
	lastUpdated: 		Date,
	data:{
		temperature:   	[Datastream.schema],
		humidity: 		[Datastream.schema],
		windSpeed: 		[Datastream.schema],
		windDirection: 	[Datastream.schema],
		rainSpeed: 		[Datastream.schema],
		insolation:     [Datastream.schema],
		air: 			[Datastream.schema],
		noise:          [Datastream.schema],
		occupancy:  	[Datastream.schema], 
	}
});
	
var model = mongoose.model("Windchime", schema);

exports.model = model;
exports.schema = schema;