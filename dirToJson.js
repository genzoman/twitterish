var path = require("path"),
  Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs"));

var results = [];
let read = (dir) =>  {
  return readDirectory(dir)
    .then(files => {
      return resolveFilePath(files,dir)
    })
    .then(files => { 
      return fileStats(files,results)
    })
    .then(done => {
      debugger;
    }) 
}
let readDirectory = (dir) => {
  return fs.readdirAsync(dir)
    .catch(e => console.log(e));
}

let resolveFilePath = (arr,dir) => {
  return arr.filter(file => file).map(file => {
    return path.resolve(dir,file);
  });
}

let fileStats = (files,arr) => {
  return Promise.all(files.map(file => {
    return new Promise((resolve,reject) => {
      return fs.statAsync(file)
      .then(stat => {
        if(stat && stat.isDirectory()){
          readDirectory(file)
            .then(files => {
              arr.push({
               name: path.basename(file),
               type: "folder",
               children: files
              });
              resolve(arr);
            });

        } else {
          arr.push({
            type: "file",
            name: path.basename(file)
          });
          resolve(arr);
        }
      })
      .catch(e => console.log(e));  
    })
    .catch(e => console.log(e));
    }))
    
}

read("./testDir")
  .then(data => {
    console.log(JSON.stringify(results,null,2));
  })