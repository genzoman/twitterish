var request = require("request");
var Promise = require("bluebird");
let fs = Promise.promisifyAll(require("fs"));
var _ = require("lodash");
var jsdom = require("jsdom");
let page = (url) => {
  return new Promise(resolve => {
    request(url, function (err, data, response) {
      resolve(data.body);
    });
  });
}
let apiPredicate = (text) => {
  return text.indexOf("get/") > -1 || text.indexOf("post/") > -1;
}
let getEndpointUrls = (endpoints) => {
  let toHref = (e) => {
    return e.attributes && e.attributes.href.nodeValue;
  }
  var href = [];

  href = Object.keys(endpoints)
    .map(key => toHref(endpoints[key]))
    .filter(e => e && e.indexOf && (e.indexOf("post") > -1 || e.indexOf("get") > -1));

  return href;
}
let partitionByRequestType = (endpoints) => {
  let twitterEndpoints = getEndpointUrls(endpoints);
  let urls = {
    get: [],
    post: []
  }
  twitterEndpoints.forEach(e => {
    e.indexOf("get") > - 1 ? urls.get.push(e) : urls.post.push(e);
  });
  return urls;
}
let toTwitterEndpoint = (links) => {
  let twitterLinks = partitionByRequestType(links);
  twitterLinks.get = twitterLinks.get.map(req => {
    var toRemove = req.indexOf("/get/");
    return req.substring(toRemove);
  });
  twitterLinks.post = twitterLinks.post.map(req => {
    var toRemove = req.indexOf("/post/");
    return req.substring(toRemove);
  });
  return twitterLinks;
}
let splitByEndpoint = (endpoints) =>{
   endpoints.get.map(e => {
    return e.split("/").filter(el => {
      if(el === "" || el === "post" || el === "get") return false;
      else return true;
    });
  });
   endpoints.post.map(e => {
    return e.split("/").filter(el => {
      if(el === "" || el === "post" || el === "get") return false;
      else return true;
    });
  });
  return endpoints;
}
page("https://dev.twitter.com/rest/public")
  .then(data => {
    jsdom.env(data,
      ["http://code.jquery.com/jquery.js"],
      function (err, window) {
        var links = window.$(".leaf > a");
        var urls = toTwitterEndpoint(links);
        urls = splitByEndpoint(urls);
        debugger;
      }
    );
  });

