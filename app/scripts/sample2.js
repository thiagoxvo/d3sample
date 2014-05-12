//Example 2
var spaceCircles = [30, 70, 110];
var body = d3.select("body");
var svg = body
			.append("svg")
			.attr("width", 200)
			.attr("height",200)
			.style("border", "1px solid black")
			.style("background-color", "blue");

var circles = svg.selectAll("circles")
				.data(spaceCircles)
				.enter()
				.append("circle");

var circlesAttr = circles
					.attr("cx", function(d){
						return d;	
					})
					.attr("cy", function(d){
						return d;	
					})
					.attr("r", 20)
					.style("fill", function(d) {
					   switch(d) {
					      case 30: return "green";
					      case 70: return "purple";
					      case 110: return "red";
					  }
					});
