var request = require("request");
var Promise = require("bluebird");
module.exports = function (url) {
  if(url.indexOf("undefined") > -1) return ;
  return new Promise(resolve => {
    request(url, function (err, data, response) {
      resolve(data.body);
    });
  });
}