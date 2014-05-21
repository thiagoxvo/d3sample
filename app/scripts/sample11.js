var dataset = [
        [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
        [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
        [600, 150]
        ];

var height = 450,
    width = 490,
    padding = 40;

var x = d3.scale.linear()
          .domain([0, d3.max(dataset, function(d){ return d[0]; })])
          .rangeRound([padding, width - padding ]);
    

var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

var y = d3.scale.linear()
          .domain([0, d3.max(dataset, function(d){ return d[1]; })])
          .rangeRound([height - padding, padding]);

var yAxis = d3.svg.axis()
              .orient("left")
              .scale(y);

var r = d3.scale.linear()
           .domain([0, d3.max(dataset, function(d) { return d[1]; })])
           .rangeRound([2, 5]);

var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", width)
    .attr("height", height)


chart.selectAll("line.x")
    .data(x.ticks(10))
  .enter().append("line")
    .attr("class", "x")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", padding)
    .attr("y2", height - padding)
    .style("stroke", "#ccc");

chart.selectAll("line.y")
    .data(y.ticks(10))
  .enter().append("line")
    .attr("class", "y")
    .attr("x1", padding)
    .attr("x2", width - padding)
    .attr("y1", y)
    .attr("y2", y)
    .style("stroke", "#ccc");

//Create circles
chart.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
      return x(d[0]);
   })
   .attr("cy", function(d) {
      return y(d[1]);
   })
   .attr("r", function(d) {
      return r(d[1]);
   });


//Create labels
chart.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
      return d[0] + "," + d[1];
   })
   .attr("x", function(d) {
      return x(d[0]);
   })
   .attr("y", function(d) {
      return y(d[1]);
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "red");

chart.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (height - padding) + ")")
  .call(xAxis);

chart.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);    

