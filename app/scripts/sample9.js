var body = d3.select("body");
var svg = body
      .append("svg")
      .attr("width", 400)
      .attr("height",400)
      .style("border", "1px solid black")
      .style("background-color", "steelblue")
      .append("g")
        .attr("transform", "translate(" + 20 + "," + 20 + ")");
      
var data = [{x:100, y:57}, {x:200, y:157}];
var circle = svg.selectAll("circle")
    .data(data);

circle.enter().append("circle")
    .attr("r", 0)
  .transition()
    .attr("r", 20);


circle
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
