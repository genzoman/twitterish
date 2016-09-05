
var d3 = require("d3");
window.d3 = d3;
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
let toggleChildren = (e) => {
  // var children = e.children;
  // render(children);
}
let render = (data,isClicked) => {
   
   var hierarchy = !isClicked ? d3.hierarchy(data): data;
   if(hierarchy.parent === null) {
      let li = ul.selectAll("li.node")
    .data([hierarchy])
    .enter()
      .append("li")
      .text(d => {
        d.hasChildren = d.children && d.children.length > 0
        return d.data.name;
      })
      .classed("root",true);
  
   
  }
  else {
    let li = ul.selectAll("li .node")
      .data(data)
      .enter()
        .append("li")
        .text(d => {
          return d.data.name;
        })
        .style("padding-left",d => d.depth * 10 + "px")
        .classed("node",true)
        .attr("class","children");
      
  }
 
}
var shouldRemove = false;
json("./flare.json")
  .then(data =>{
    render(data,false); 
    events();
  });

 let events = () => {
   d3.selectAll(".children, .root")
  .on("click",function(e) {
    if(e.isOpen){
      d3.selectAll(".children").remove();
       e.isOpen = !e.isOpen;
      return;
    }
    e.isOpen = !e.isOpen;
    //toggleChildren(e);
    render(e.children,true)
  });
 }
