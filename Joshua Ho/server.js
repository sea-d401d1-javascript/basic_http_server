const http = require('http');
const fs = require('fs');

var port = 3000;

var server = module.exports = exports = http.createServer( ( req, res ) => {

	var urlArray = (req.url).split('/');

	//TIME WORKS
	if (('/' + urlArray[1]) === '/time' && req.method === "GET") {

		var newDate = (new Date).toString();

		res.writeHead(200 , {'Content-Type' : 'application/json'});
		res.write(JSON.stringify({date: newDate	})); 								// Why aren't these in quotation marks?
		return res.end();	//Closes the connection

	}

	// /greet/name should prompt whatever is after greet/
	//THIS WORKS BTW
	if (('/' + urlArray[1]) === '/greet') {
		if (req.method === 'GET'){

			var theName = urlArray[2].toString();

			res.writeHead(200 , {'Content-Type' : 'application/json'});
			res.write(JSON.stringify({name: theName}));

			return res.end();
		}
		//To make a POST, use Superagent CLI or something else!
		//Accepts objects!!!
		if (req.method === 'POST') {

			var coolObject = "";

			//Accepts a JSON object, parses it into a Javascript object and retrieves .name property. 
			req.on('data' , (chunk) => {
			 coolObject += JSON.parse(chunk.toString()).name;
			});

			req.on('end' , () => {
				res.writeHead(200 , {'Content-Type' : 'application/json'});
				res.write(JSON.stringify({name: 'hello ' + coolObject}));		//Responds with a JSON string

				return res.end();
			});
		}
	} 


	if ((('/' + urlArray[1]) ==='/' || req.url === 'index.html') && req.method === 'GET') {

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


