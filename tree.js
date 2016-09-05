
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
let glyphs = {
  folderClosed: "caret glyphicon glyphicon-chevron-right",
  folderOpen: "caret glyphicon glyphicon-chevron-down"
}
var container = d3.select("body").append("div").attr("id","container");
let render = (data,parent) => {
   if(data && data.parent === null) {
      let divs = parent.selectAll("div")
    .data([data])
    .enter()
      .append("div")
      .text(d => {
        d.hasChildren = d.children && d.children.length > 0
        return d.data.name;
      })
      .classed("root",true)
      .attr("class",d => glyphs.folderClosed + " root")
  
   
  }
  else {
    let divs = parent.selectAll(".node")
      .data(data)
      .enter()
        .append("div")
        .text(d => {
          return d.data.name;
        })
        .style("padding-left",d => d.depth * 5 + "px")
        .classed("node",true)
        .attr("class","children");
      
  }
  events();
}
var shouldRemove = false;
json("./flare.json")
  .then(data =>{
    render(d3.hierarchy(data),container); 
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
    if(this.__data__.children) {
      d3.select(this).classed(glyphs.folderClosed, false);
      d3.select(this).classed(glyphs.folderOpen, true);
      render(e.children,d3.select(this));
    } 
  });
 }
