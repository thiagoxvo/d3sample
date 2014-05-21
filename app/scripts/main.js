var width = 380, height = 400;

var projection = d3.geo.mercator()
    .scale(512)
    .center([-21,-20])

var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

d3.json("data/br.json", function(error, br) {
  svg.selectAll("path")
    .data(br.features)
    .enter()
    .append("path")
    .attr("d", path);

  svg.selectAll(".subunit")
    .data(br.features)
    .enter().append("path")
    .attr("class", function(d) { return "place subunit-" + d.properties.UF;})
    .attr("d", path);

    load_people()
});


function load_people() {
  d3.csv("data/people.csv", function(people) {
    window.people = people;
    window.people_per_state = extract_people_per_state(people);

    d3.selectAll(".place")
      .attr("class", function(object) {
        current_class = d3.select(this).attr("class")
        state = current_class.match(/subunit-(\w{2})/)[1]
        return current_class+" "+density_by_quantity(state)
      });
  });
};

function density_by_quantity(state) {
  quantity = window.people_per_state[state] || 0;
  percentage = quantity / window.brazil_quantity;
  console.log(state+" "+percentage)
  if(percentage == 0) return "none";
  else if(percentage < 0.2) return "lowest";
  else if(percentage < 0.4) return "low";
  else if(percentage < 0.6) return "medium";
  else if(percentage < 0.8) return "high";
  else if(percentage <= 1) return "highest";

}

function extract_people_per_state(people) {
  var state_data = {};
  var brazil_quantity = 0;
  for(person in people) {
    brazil_quantity = brazil_quantity + 1;
    var person = people[person];
    if(typeof(state_data[person.state]) == "undefined")
      state_data[person.state] = 1;
    else
      state_data[person.state] = state_data[person.state] + 1;
  }
  window.brazil_quantity = brazil_quantity
  return state_data;
}
