
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
var container = d3.select("body").append("div").attr("id","container");
let toggleChildren = (e) => {
  // var children = e.children;
  // render(children);
}
let render = (data,parent,isClicked) => {
   
   var hierarchy = !isClicked ? d3.hierarchy(data): data;
   if(hierarchy.parent === null) {
      let divs = parent.selectAll("div")
    .data([hierarchy])
    .enter()
      .append("div")
      .text(d => {
        d.hasChildren = d.children && d.children.length > 0
        return d.data.name;
      })
      .classed("root",true);
  
   
  }
  else {
    let divs = parent.selectAll(".node")
      .data(data)
      .enter()
        .append("div")
        .text(d => {
          return d.data.name;
        })
        .style("padding-left",d => d.depth * 10 + "px")
        .classed("node",true)
        .attr("class","children");
      
  }
  events();
}
var shouldRemove = false;
json("./flare.json")
  .then(data =>{
    render(data,container,false); 
    //events();
  });

 let events = () => {
   d3.selectAll(".children, .root")
  .on("click",function(e) {
    d3.event.stopPropagation();
    if(e.isOpen){
      d3.select(this).selectAll(".children").remove();
       e.isOpen = !e.isOpen;
      return;
    }
    e.isOpen = !e.isOpen;
    //toggleChildren(e);
    render(e.children,d3.select(this),true)
  });
 }
