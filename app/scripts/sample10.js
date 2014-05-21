var data = [4, 8, 15, 16, 23, 42];

var width = 740,
    height = 300,
    barHeight = height / data.length;

var body = d3.select("body")
            .attr("class", "sample10");

var svg = body
      .append("svg")
      .attr("width", width)
      .attr("height",height)
      .attr("class", "chart")
      .style("border", "1px solid black")
      

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

//console.log(chart.selectAll("g"));
function updateHorizontal(data){

  var bar = chart.selectAll("g")
            .data(data, function(d) { return d; });
  
  //UPDATE
  bar
    .attr("class", "update")
    .attr("transform", function(d, i) { console.log(d, i); return "translate(0," + i * barHeight + ")"; });

  //ENTER
  var barEnter = bar.enter()
                  .append("g")
                    .attr("class", "enter")
                    .attr("transform", function(d, i) { console.log(d, i); return "translate(0," + i * barHeight + ")"; })
  
  barEnter
    .append("rect")
        .attr("width", 0)
        .attr("height", barHeight - 1)
        .transition()
          .duration(750)
          .attr("width", x)
    
  barEnter
    .append("text")
    .text(function(d){ return d; })
    .attr("dy", barHeight/2)
    .attr("x", 5)
    .style("fill","black")
  
  //EXIT
  bar
  .exit()
    .attr("class", "exit")
    .transition()
      .duration(500)
      .style("fill-opacity", 1e-6)
      .remove();

}

var color = d3.scale.category10();
var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var y = d3.scale.linear().range([height, 0]);

function updateVertical(data) {

  x.domain(data);  
  y.domain([0, d3.max(data)]);


  var node = chart.selectAll(".node")
              .data(data, String);

  node.each( function(d, i){
    console.log(this);
    var single = d3.select(this);
    single.selectAll("rect")
      .transition()
      .duration(300)
      .attr("x", x)
      .attr("y", y)
      .attr("height", function(d) { return height - y(d); })
      .attr("width", function(d){ return x.rangeBand(); })
      

  });

  var enter = node.enter().append("g")
                .attr("class", "node");

  enter.append("rect")
      .style("fill", color)
      .attr("x", x )
      .attr("y", y)
      .attr("ry", 5)
      .attr("ry", 5)
      .attr("height", function(d) { return height - y(d); })
      .attr("width", function(d){ return x.rangeBand(); })
      
  enter.selectAll("*")
        .style("opacity", 0)
        .transition()
        .duration(300)
        .style("opacity", 1)

  node.exit()
    .style("opacity", 1)
    .transition()
    .duration(300)
    .style("opacity", 0)
    .remove();


  // var bar = chart.selectAll("g")
  //           .data(data, function(d) { return d; })

  // bar
  //   .attr("class", "update")
  //   .attr("x", function(d) { return x(d); })
            
  // var barEnter = bar.enter()
  //                 .append("g")
  //                 .attr("class", "enter");

  // barEnter
  //   .append("rect")
  //   .attr("x", function(d) { return x(d); })
  //   .attr("y", function(d) { return y(d);})
  //   .attr("height", function(d) { return height - y(d); })
  //   .attr("width", function(d){ return x.rangeBand(); })

  // barEnter
  //   .append("text")
  //   .text(function(d) { return d; })
  //   .style("fill","black")
  //   .style("text-anchor", "middle")
  //   .attr("x", function(d) { return x(d); })
  //   .attr("y", function(d) { return y(d); })
  //   .attr("dy", function(d) { return height - y(d); })
  //   .attr("dx", function(d) { return x.rangeBand()/2; });


  // bar.exit()
  //   .attr("class", "exit")
  //   .remove();
}

// updateHorizontal(data);
updateVertical(data);






function generateRandomData() {
  var randomData = [generateNumber()];
  for(var i = 1; i < data.length; i++) {
    randomNumber = generateNumber();
    while(randomData.indexOf(randomNumber) > -1) {
      randomNumber = generateNumber();
    }
    randomData.push(randomNumber);
  }
  console.log(randomData);
  return randomData;
}

function generateNumber(minData) {
  return Math.floor(Math.random() * (d3.max(data) - d3.min(data)) + d3.min(data));
}

// setInterval(function(){
//   updateVertical(generateRandomData());
// }, 1000);







