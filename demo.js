let getDom = require("./getDom");
let getEndpointUrls = require("./getEndpointUrls")
let getParametersForEndpoint = require("./getParametersForEndpoint");
var Promise = require("bluebird");

let baseUrl = "https://dev.twitter.com";
let twitterEndpoints = [];
getDom("https://dev.twitter.com/rest/reference/get/statuses/mentions_timeline", [".leaf", ".param"])
  .then(getEndpointUrls)
  .then(getParametersPromises)
  .then(data => {
    console.log("a;ldjf;adjf;lkadjf;lkadj;l")
  })



function getParametersPromises(data) {
  let promises = data.map(e => {
    return () => {
      return getDom(baseUrl + e, [".leaf", ".param"])
        .then(data => {
          let params = getParametersForEndpoint(data);
          return {
            url: baseUrl + e,
            params: params
          }
        })
    }
    
  });
  let all = promises.map(p => p());
  return Promise.all(all);
}