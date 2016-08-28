var Twitter = require('twit');

var secrets = require("../secrets/secrets");
var fs = require("fs");
var Twit = require('twit')

var T = new Twit({
  consumer_key: secrets.consumer_key,
  consumer_secret: secrets.consumer_secret,
  access_token: secrets.access_token,
  access_token_secret: secrets.access_token_secret,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

let get = {
  timeline(user) {
    return new Promise(resolve => {
      T.get("statuses/user_timeline", {
        screen_name: user
      })
    }, function (err, data, results) {
      resolve(data);
    });
  },
  tweets(str) {
    return new Promise(resolve => {
      T.get("search/tweets", {
        q: str
      }, function (err, data, results) {
        resolve(data);
      });
    });
  },
  favorites(str) {
    return new Promise(resolve => {
      T.get("favorites/list", {
        screen_name: str
      }, function (err, data, results) {
        resolve(data);
      });
    });
  },
  followers(user) {
    return new Promise(resolve => {
      T.get("followers/list", {
        screen_name: user
      }, function (err, data, results) {
        resolve(data);
      });
    });
  },
  blocks(user) {
    return new Promise(resolve => {
      T.get("blocks/list", {
        screen_name: user
      }, function (err, data, results) {
        resolve(data);
      });
    });
  },
  mentions() {
    return new Promise(resolve => {
      T.get("statuses/mentions_timeline", function (err, data, results) {
        resolve(data);
      });
    });
  },
  geocode(){
    var options = ["lat", "long", "accuracy", "granularity", "max_results"];
    var locals = options.reduce((opt, e) => {
      opt[e] = null;
      return opt;
    },{ });
    var methods = options.reduce((opt,e) => {
      opt[e] = (val) => {
        if(val) {
          locals[e] = val;
          return opt;
        } else return locals[e];
        
      }
      return opt;
    },{ });
    methods["send"] = () =>{
      return new Promise(resolve => {
        T.get("geo/reverse_geocode", locals,function(err, data, results){
          resolve(data);
        });
      });
    }
    return methods;
  }
}
function urlBuilder(endpoint) {
  var status = ["user_timeline", "home_timeline", "retweets_of_me", "show", "retweets",
    "update", "update_with_media", "retweet", "unretweet", "retweeters", "lookup"
  ],
    friendships = ["incoming", "outgoing", "create", "destroy", "update", "show"];
  let endpoints = {
    status: status,
    friendships: friendships
  }

  return [{}].map(el => {
    endpoints[endpoint].forEach && endpoints[endpoint].forEach(e => {
      el[e] = endpoint + "/" + e;
    });
    return el;

  })[0];
}

let post = {
  status(status) {
    return new Promise(resolve => {
      T.post('statuses/update', { status: status },
        function (err, data, response) {
          resolve(data);
        });
    });
  },
  upload(file, status) {
    return new Promise(resolve => {
      fs.readFile(file, {
        encoding: "base64"
      }, function (err, data) {
        T.post("media/upload", {
          media_data: data
        }, function (err, data, response) {
          mediaIdStr = data.media_id_string;
          var meta_params = {
            media_id: mediaIdStr
          }
          T.post("media/metadata/create", meta_params, function (err, data, response) {
            var params = {
              status: status,
              media_ids: [mediaIdStr]
            }
            T.post("statuses/update", params, function (err, data, response) {
              resolve(data);
            });
          });
        });
      });
    });
  }
}
module.exports = {
  get: get,
  post: post
}
