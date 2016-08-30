var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var jsdom = require("jsdom");
var webpage = require("./webpage");
const JQUERY_URL = "http://code.jquery.com/jquery.js";

module.exports = getDom;
function getDom(url, selectors) {
  return new Promise(resolve => {
    //
    webpage(url)
      .then(data => {
        jsdom.env(data,
          [JQUERY_URL]
          , function (err, window) {
            if(err) reject(err)
            var retVal = {};
            selectors.forEach(sel => {
              retVal[sel] = window.$(sel);
              retVal[sel] = Object.keys(retVal[sel])
                .map(key => retVal[sel][key]);
            });

            resolve(retVal);
          });
      });
    //
  }).catch(e =>{
    debugger 
  });
}