const chai = require('chai');
const server = require( __dirname + '/../server');

const chaiHttp = require('chai-http');

const chai = chai.use(chaiHttp);



// /time should respond with the time

// /greet/name should respond with name as any single-word string

// /name takes the request as a post request.

