let getDom = require("./getDom");
let getEndpointUrls = require("./getEndpointUrls")
let getParametersForEndpoint = require("./getParametersForEndpoint");
var Promise = require("bluebird");

let baseUrl = "https://dev.twitter.com";
let twitterEndpoints = [];
getDom("https://dev.twitter.com/rest/reference/get/statuses/mentions_timeline", [".leaf", ".param"])
  .then(data => {
    return getEndpointUrls(data, ".leaf")

  })
  .then(data => {
    var promises = getParametersPromises(data);
    promises = promises.map(e => e())
    Promise.all(promises)
      .then(data => {
        console.log("done")
        debugger;
      })

  })


function getParametersPromises(data) {
  return data.map(e => {
    return () => {
      return getDom(baseUrl + e, [".leaf", ".param"])
        .then(data => {
          let params = getParametersForEndpoint(data, ".param");
          return {
            url: baseUrl + e,
            params: params
          }
        })
    }

  });
}