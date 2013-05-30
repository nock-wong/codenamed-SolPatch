function print(res, message) {
	var body = '<?xml version="1.0" encoding="UTF-8"?>' +
		'<Response>' + 
		'<Gather action="/collect" method="POST" timeout="10">' +
				'<Play loop="10">' + message.twilio_play_link + '</Play>' +
		'</Gather>' +
		'</Response>';
	console.log(body)
    res.writeHead(200, {"Content-Type": "text/xml"});
    res.write(body);
    res.end();
}

exports.print = print;