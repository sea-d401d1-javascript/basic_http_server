function postGreeting(res, req) {
  var query = url.parse(request.url, true).query;
  var json = JSON.stringify(query);
};

exports.postGreeting = postGreeting;
