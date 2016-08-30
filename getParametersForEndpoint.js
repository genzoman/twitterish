var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var jsdom = require("jsdom");
var webpage = require("./webpage");
const JQUERY_URL = "http://code.jquery.com/jquery.js";
var transform = require("./transform");
let url = "https://dev.twitter.com/rest/reference/post/statuses/destroy/%3Aid";

let selectors = {
  param: ".param"
}

module.exports = function (data) {
  return transform(data, selectors.param, e => {
    var params = data[selectors.param];
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
  });

}
