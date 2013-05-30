/*
var pickup_page = require('../views/pickup_page'),
	hangup_page = require('../views/hangup_page'),
	//cosm = require('cosm');
	//Windchimes = require('../data/windchime');
	
//var cosm_api_key = process.env.COSM_API_KEY;
//var twilio_play_link = process.env.TWILIO_PLAY_LINK;
//var cosm_id = parseInt(process.env.COSM_ID);
*/
var twilio = require('twilio');


exports.datalog = function(req, res) {
	console.log('datalog');
	var post = req.body,
		smsBody = post.Body;
	console.log(smsBody);

	var resp = new twilio.TwimlResponse();
	resp.sms('123');

	res.writeHead(200, {"Content-Type": "text/xml"});
	res.write(resp.toString());
	res.end();
}