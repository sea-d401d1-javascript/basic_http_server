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

exports.start = start;
exports.upload = upload;
exports.time = time;
