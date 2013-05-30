var TWILIO_ACCOUNT_SID = 'AC3650d879968b58bd2c6e054364dee7b8',
	TWILIO_AUTH_TOKEN = '22c6316a00f547d3489b22fb4e9141db';
var client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

var twilio = require('twilio');

var resp = new twilio.TwimlResponse();
resp.sms('on');
console.log(resp.toString());

/*
http.createServer(function (req, res) {
	var twiml = new twilio.TwimlResponse()'
	twiml.sms
}
*/



