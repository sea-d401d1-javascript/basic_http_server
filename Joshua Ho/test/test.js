const chai = require('chai');
const server = require( __dirname + '/../server');		//Server is running here
const chaiHttp = require('chai-http');
chai = chai.use(chaiHttp);

const request = chai.request;
const expect = chai.expect;

serverIP = 'localhost:3000'

// /time should respond with the time

describe('The server' , () => {
	
	it('should print the current time' , (done) => {
		request('localhost:3000')
			.get('/time')
			.end( (err , res) => {
				expect(err).to.equal(null);
				expect(res.status).to.equal(200);
				expect(JSON.stringify(res.body)).to.eql(JSON.stringify({"date" : (new Date()).toString()}) );  //Tests the value printed
				done();
			});
	});

	it('should return test with a GET request to /greet/test' , (done) => {
		
		request('localhost:3000')
		.get('/greet/test')
		.end(( err , res ) => {
			expect( err ).to.eql(null);
			expect(res.body).to.eql({'name': 'test'});

			done();
		});
	});

	it('should respond to a {name: test} POST to /greet with "Hello (test)" ' , (done) => {

		request('localhost:3000')
			.post('/greet')
			.send({name: "test"})
			.end( (err , res) => {
				expect(res).to.have.status(200);
							//response OBJECT.name property
				expect(res.body.name).to.equal('hello test');
				done();
			});
	});


	// it('should respond to a POST request to /greet with the object posted' , (done) => {

	// 	request('localhost:3000')
	// 	.post('/greet')
	// 	.send({name:'test'})
	// 	.end(( err , res ) => {
	// 		expect(res.status).to.equal(200);
	// 		// expect(res.body).to.eql('Hello test blblblblb');

	// 		done();
	// 	});

	// });

});

//Used Chris Lee's server_test.js to as reference structure superagent syntax.

