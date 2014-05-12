var initialData = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];

var scaledData = [];
var minDataPoint = d3.min(initialData);
var maxDataPoint = d3.max(initialData);


var linearScale = d3.scale.linear()
										.domain([minDataPoint, maxDataPoint])
										.range([0,100]);

for (var i = 0; i < initialData.length; i++) {
	scaledData[i] =  linearScale(initialData[i]);
};

console.log(scaledData);
