
var d3 = require("d3");
var Promise = require("bluebird");
json = (path) => {
    return new Promise((resolve,reject) => {
        d3.json(path,function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    });
}
var ul = d3.select("body").append("ul");
json("./flare.json")
  .then(data => {
    var hierarchy = d3.hierarchy(data);
    let li = ul.selectAll("li.node")
      .data(data.children)
      .enter()
        .append("li")
        .text(d => {
          d.hasChildren = d.children && d.children.length > 0
          return d.name;
        })
        .attr("class",d =>{
          return !d.children || d.children.length === 0 ? "leaf" : "";
        );
      let leafs = d3.selectAll(".leaf")
        .on("click",e => console.log("no kids"));
      
  });