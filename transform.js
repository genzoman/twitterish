
var Promise = require("bluebird");
module.exports = function(data,sel,fn){
  if(!data[sel]) throw new Error(`Empty selection for ${sel}`);
    return data[sel].map(e => {
      return fn(e);
    }).filter(e => e);
    
}