var url = require('url');

function start(){
  console.log('in start handler');
  return 'Hi. This is the index page. Try going to the /time or /greet pages, too.';
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

  if(request.method == 'GET'){
    var pathname = url.parse(request.url).pathname;
    var greetStart = /\/greet\// ;
    var nStr = greetStart.exec(pathname);
    var nameStr = pathname.slice(nStr['index'] + 7);

    var greetingString = 'Hello ' + nameStr;
    return greetingString;
  }

  if(request.method == 'POST'){
    debugger;

  }


}

exports.start = start;
exports.upload = upload;
exports.time = time;
exports.greet = greet;
