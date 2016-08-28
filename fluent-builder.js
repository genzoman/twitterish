var Twitter = require('twit');

var secrets = require("./secrets/secrets");
var fs = require("fs");
var Twit = require('twit')

var T = new Twit(secrets);

function fluentBuilder(options, terminator) {
  let locals = options.reduce((opt, e) => {
    opt[e] = "";
    return opt;
  }, {});
  var methods = options.reduce((opt, e) => {
    opt[e] = (val) => {
      if (val) {
        locals[e] = val;
        return opt;
      } else return locals[e];

    }
    return opt;
  }, {});
  methods["execute"] = function(){
    locals.required.some(e => {
      if(!locals[e]) throw new Error("required param");
    });
    terminator();
  };

  methods.required = function(required){
    locals.required = required || [];
  }
  return methods;
}

var geo = fluentBuilder(["lat"],function(){
  console.log("gonna hit the road and start looking for the end of that long white line")
});
geo.required(["lat"]);
geo.lat("*")
  .execute();