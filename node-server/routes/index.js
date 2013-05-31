/*
var pickup_page = require('../views/pickup_page'),
	hangup_page = require('../views/hangup_page'),
	//cosm = require('cosm');
	//Windchimes = require('../data/windchime');
	
//var cosm_api_key = process.env.COSM_API_KEY;
//var twilio_play_link = process.env.TWILIO_PLAY_LINK;
//var cosm_id = parseInt(process.env.COSM_ID);
*/

var TWILIO_ACCOUNT_SID = 'AC3650d879968b58bd2c6e054364dee7b8';
var TWILIO_AUTH_TOKEN = '22c6316a00f547d3489b22fb4e9141db';
var TWILIO_NUMBER = '+19177466409';

var twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
var twilio = require('twilio');
var Stations = require('../data/stations');

var dashboard = function(req, res) {
	console.log('dashboard');
	try {
		Stations.model.find({}, function(err, stations) {
			console.log(stations);
			console.log(stations.length);
			res.render('dashboard', {message:"", stations: stations});
		});
	}
	catch(err) {
		console.log(err);
	}
}

exports.toggle_port = function(req, res) {
	console.log('toggle_port');
	var post = req.body,
		stationID = post.id,
		portToggle = post.portToggle;
	try {
		Stations.model.findOne({id:stationID}, function(err, station) {
			var command = '';
			var portState;
			if (portToggle == 'on') {
				command = 'Y';
				portState = true;
			}
			else {
				command = 'N';
				portState = false;
			}
			twilioClient.sendSms({

				to: station.phonenumber,
				from: TWILIO_NUMBER,
				body: command
			
			}, function(err, responseData) {
				if (!err) {
					console.log('Command sent');
					console.log(responseData.from);
					console.log(responseData.body);
					station.portState = portState;
					station.save(function(err, station) {
						res.redirect('/dashboard');
						//dashboard(req, res);
					});
				}
				else {
					console.log(err);
					dashboard(req, res);
				}
			});
		});
	}
	catch(err) {
		console.log(err);
	}
}

exports.datalog = function(req, res) {
	console.log('datalog');
	var post = req.body,
		smsFrom = post.From,
		smsBody = post.Body;
	console.log(smsFrom);
	console.log(smsBody);
	
	// Update database.
	try {
		Stations.model.findOne({number:smsFrom}, function(err, station) {
			if (station === null) {
				create_station(req, res);
			}
		});	
	}
	catch(err) {
		console.log(err);
	}

	var resp = new twilio.TwimlResponse();
	resp.sms('123');

	res.writeHead(200, {"Content-Type": "text/xml"});
	res.write(resp.toString());
	res.end();
}

function create_station(req, res) {
	var post = req.body,
		smsFrom = post.From,
		smsFromCity = post.FromCity,
		smsFromState = post.FromState,
		smsFromZip = post.FromZip,
		smsFromCountry = post.FromCountry;

	var id = generate_id();
	var phonenumber = smsFrom;
	var latitude = 40.7;
	var longitude = 74.0;
	var port = false;

	var station = new Stations.model({
		id: 			id,
		phonenumber: 	phonenumber,
		coordinates:    {
			lat: 	latitude, 
			lon: 	longitude
		},
		address:        {
			city: 		smsFromCity, 
			state: 		smsFromState, 
			zip: 		smsFromZip, 
			country: 	smsFromCountry
		}, 
		portState: 		port,
	});
	station.save(function(err, user) {
		console.log("Station created." + phonenumber);
	});
}

function generate_id() {
	var id = random(0, 1000000);
	id = id.toString();
	while (id.length < 6) {
		id = '0' + id;
	}
	return id;	
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.dashboard = dashboard;