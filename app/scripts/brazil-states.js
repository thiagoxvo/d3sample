var width = 600,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/br.json", function(error, br) {

var projection = d3.geo.mercator()
    .scale(830)
    .translate([831, 73]);

  var path = d3.geo.path()
              .projection(projection)

  svg.selectAll(".subunit")
      .data(br.features)
      .enter().append("path")
      .attr("class", function(d) { return "place subunit-" + d.properties.UF;})
      .attr("d", path);

svg.selectAll(".point")
    .data(br.features)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return path.centroid(d)[0];})
    .attr("cy", function(d){ return path.centroid(d)[1];})
    .attr("r", 2);


svg.selectAll(".place-label")
    .data(br.features)
  .enter().append("text")
    .attr("class", "place-label")
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .attr("x", "6")
    .text(function(d) { return d.properties.ESTADO; });


});