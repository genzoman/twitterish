let url = "https://dev.twitter.com/rest/reference/get/search/tweets";
var getDom = require("./getDom");
let transform = require("./transform");
var selectors = require("./selectors")
module.exports = function (data) {
  return transform(data, selectors.endpoint, e => {
    if (e.firstChild && e.firstChild.attributes &&
      e.firstChild.attributes.href.textContent)
      return e.firstChild.attributes.href.textContent
  });
  
}


//return a.firstChild.attributes.href.textContent;