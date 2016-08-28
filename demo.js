var twitter = require("./twitter/twitter")
var x = twitter.get.geocode().lat("123");
console.log(x.lat());