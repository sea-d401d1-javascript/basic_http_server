var url = require('url');

function start(){
  console.log('in start handler');
}

function time(){
  console.log('in time handler');
  var myTime = new Date();
  console.log(myTime);
  return myTime.toString();
}

function upload(){
  console.log('in upload handler');
}

function greet(request, response){
  console.log('in greet handler');
  var pathname = url.parse(request.url).pathname;
  var greetStart = /\/greet\// ;
  var nStr = greetStart.exec(pathname);
  var nameStr = pathname.slice(nStr['index'] + 7);

  var greetingString = 'Hello ' + nameStr;
  return greetingString;

}

exports.start = start;
exports.upload = upload;
exports.time = time;
exports.greet = greet;
