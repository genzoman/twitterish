var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var jsdom = require("jsdom");
var webpage = require("./webpage");
const JQUERY_URL = "http://code.jquery.com/jquery.js";
var getDom = require("./getDom");
function getParams(endpoint) {
  return webpage(endpoint)

}
let url = "https://dev.twitter.com/rest/reference/post/statuses/destroy/%3Aid";

let getParams_ = (arr, sel) => {
  var params = arr[sel[0]];
  let paramTypes = {
    optional: [],
    required: []
  }
  params.forEach(param => {
    let text = param.textContent;
    if (text && text.indexOf) {
      text.indexOf("optional") > -1 ? paramTypes.optional.push(text.split(" ")[0])
        : paramTypes.required.push(text.split(" ")[0]);
    }

  });
  return paramTypes;
}
module.exports = function (url, sel) {
  return getDom(url, sel)
    .then(data => {
      let params = getParams_(data, sel);
      return params;
    });

}
