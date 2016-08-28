function urlBuilder(endpoint){
  var endpoints = {
    statuses: ["user_timeline","mentions_timeline", "home_timeline", "retweets_of_me" , 
               "retweets", "show", "destroy", "update", "retweet", "unretweet", "update_with_media",
               "oembed", "retweeters", "lookup"
    ]
  }
  return endpoints[endpoint].reduce((acc,e) => {
    acc[e] = endpoint + "/" + e;
    return acc;
  }, {})
}
var x = urlBuilder("statuses");
console.log(x);