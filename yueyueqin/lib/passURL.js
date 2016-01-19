const url = require('url');

exports.passURL = function(URL) {
  return url.parse(URL).pathname;
};
