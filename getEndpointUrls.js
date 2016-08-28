let url = "https://dev.twitter.com/rest/reference/get/search/tweets";
var getDom = require("./getDom");
function getUrls(arr, sel, fn) {
  let data = arr[sel];
  return data.map(e => {
    return fn(e);
  });
}
module.exports = function (data, sel) {
  return getUrls(data, ".leaf", (e) => {
    if (e.firstChild && e.firstChild.attributes &&
      e.firstChild.attributes.href.textContent)
      return e.firstChild.attributes.href.textContent
  }).filter(e => e)
}


//return a.firstChild.attributes.href.textContent;