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
function update(data){

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

update(data);

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
//   update(generateRandomData());
// }, 1000);







