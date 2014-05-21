var width = 960,
    height = 500;

var projection = d3.geo.mercator(),
    path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black")
    .call(d3.behavior.zoom()
            .translate(projection.translate())
            .scale(projection.scale())
            .on("zoom", redraw)
    );

var axes = svg.append("g").attr("id", "axes"),
    xAxis = axes.append("line").attr("y2", height),
    yAxis = axes.append("line").attr("x2", width);

d3.json("data/br.json", function(error, br) {
  svg.selectAll("path")
    .data(br.features)
    .enter()
    .append("path");
  redraw();


});

function redraw(){
  if(d3.event){
    console.log(d3.event.scale)
    projection
      .translate(d3.event.translate)
      .scale(d3.event.scale);
  }
  svg.selectAll("path").attr("d", path);
  var t = projection.translate();
  console.log(t);
  xAxis.attr("x1", t[0]).attr("x2", t[0]);
  yAxis.attr("y1", t[1]).attr("y2", t[1]); 
}
