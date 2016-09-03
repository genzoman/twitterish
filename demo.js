let getDom = require("./getDom");
let getEndpointUrls = require("./getEndpointUrls")
let getParametersForEndpoint = require("./getParametersForEndpoint");
var Promise = require("bluebird");
var path = require("path");
let baseUrl = "https://dev.twitter.com";
let twitterEndpoints = [];
var selectors = require("./selectors")
// getDom("https://dev.twitter.com/rest/reference/get/statuses/mentions_timeline", [".leaf", ".param"])
//   .then(getEndpointUrls)
//   .then(getParametersPromises)
//   .then(data => {
//     console.log("a;ldjf;adjf;lkadjf;lkadj;l")
//   })
getDom({
  file: "./twitter.html",
  selectors: ["a"]
})
.then(data => {
  debugger;
});



function getParametersPromises(data) {
  return Promise.all(data.map(e => {
    return () => {
      return getDom(baseUrl + e, [selectors.endpoints])
        .then(data => {
          let params = getParametersForEndpoint(data);
          return {
            url: baseUrl + e,
            params: params
          }
        })
    }
    
  }).map(p => p()));
}