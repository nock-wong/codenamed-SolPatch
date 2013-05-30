function print(res, message) {
  	var body = '<?xml version="1.0" encoding="UTF-8"?>' +
		'<Response>' + 
			'<Hangup/>' +
		'</Response>';
    res.writeHead(200, {"Content-Type": "text/xml"});
    res.write(body);
    res.end();
}

exports.print = print;
