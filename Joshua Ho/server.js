const http = require('http');
const fs = require('fs');

var port = 3000;

var server = module.exports = exports = http.createServer( ( req, res ) => {

	var urlArray = (req.url).split('/');

	//TIME WORKS
	if (('/' + urlArray[1]) === '/time' && req.method === "GET") {

		var newDate = (new Date).toString();

		res.writeHead(200 , {'Content-Type' : 'application/json'});
		res.write(JSON.stringify({date: newDate	})); // Why aren't these in quotation marks?
		return res.end();
	}

	// /greet/name should prompt whatever is after greet/

	if (('/' + urlArray[1]) === '/greet'  && req.method === 'GET') {

		var dispName = req.url;

		res.writeHead(200 , {'Content-Type' : 'application/json'});
		res.write( JSON.stringify( {name: dispName} ) );
		return res.end();

	}

	if (('/' + urlArray[1]) ==='/' || req.url === 'index.html' && req.method === 'GET') {

		res.writeHead(200 , {'Content-Type' : 'text/html'});
		var index = fs.createReadStream( __dirname + '/public/index.html');
		return index.pipe(res);	

	}

});

//Start the server
server.listen( port , () => {

	console.log("Server is running at port " + port);
	console.log()

});



// /name takes the request as a post request.

