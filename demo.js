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
    return data.map(e => {
      return () => {
        return getDom(baseUrl + e, [".leaf", ".param"])
          .then(data => {
            let params = getParametersForEndpoint(data, ".param");
            return {
              url: baseUrl+ e,
              params: params
            }
          })
      }

    });

  })
  .then(promises => {
    let things = promises.map(e =>{
      return e();
    });
    Promise.all(things)
      .then(data => {
        debugger;
      })
    
  });