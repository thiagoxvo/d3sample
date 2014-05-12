var body = d3.select("body");
var svg = body
      .append("svg")
      .attr("width", 400)
      .attr("height",400)
      .style("border", "1px solid black")
      .style("background-color", "steelblue")
      .append("g")
        .attr("transform", "translate(" + 20 + "," + 20 + ")");
      

var circle = svg.selectAll("circle")
    .data([{x:100, y:57}, {x:200, y:157}]);

circle.enter().append("circle")
    .attr("cx", function(d){ return d.x;})
    .attr("cy", function(d){ return d.y;})
    .attr("r", 5);