var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var jsdom = require("jsdom");
var webpage = require("./webpage");
const JQUERY_URL = "http://code.jquery.com/jquery.js";
var selectors = require("./selectors")

let getSelectorData = (selectors, window) => {
  var retVal = {};
  selectors.forEach(sel => {
    retVal[sel] = window.$(sel);
    retVal[sel] = Object.keys(retVal[sel])
      .map(key => retVal[sel][key]);
  });
  return retVal;
}

module.exports = getDom;

function getDom(options) {
 
  return new Promise(resolve => {
    if (options.url) {
      webpage(options.url)
        .then(data => {
          jsdom.env({
            url: options.url,
            scripts: ["http://code.jquery.com/jquery.js"],
            done: function (err, window) {
              resolve(getSelectorData(options.selectors, window));
            }
          });
        });
      
    }
    else {
      fs.readFileAsync(options.file, "utf-8")
        .then(data => {
          jsdom.env({
            file: options.file,
            scripts: ["http://code.jquery.com/jquery.js"],
            done: function (err, window) {
              resolve(getSelectorData(options.selectors,window));
            }
          });
        });
    }
  });
}
getDom({
  file: "./twitter.html",
  scripts: ["http://code.jquery/jquery.js"],
  selectors: ["a"]
})
.then(data => {
  let links = data[selectors.endpoints];
  debugger;
});
