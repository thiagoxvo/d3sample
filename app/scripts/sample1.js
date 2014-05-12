var circleRadii = [40, 20, 10];
var body = d3.select("body");
var svg = body
			.append("svg")
			.attr("width", 200)
			.attr("height",200);

var circles = svg
				.selectAll("circle")
				.data(circleRadii)
				.enter()
				.append("circle");


var circlesAttr = circles
					.attr("cx", 50)
					.attr("cy", 50)
					.attr("r", function(d) {
						return d;
					})
					.style("fill", function(d) {
					   switch(d) {
					      case 40: return "green";
					      case 20: return "purple";
					      case 10: return "red";
					  }
					});
