var width = 380, height = 400;

var projection = d3.geo.mercator()
    .scale(512)
    .center([-21,-20])

var path = d3.geo.path().projection(projection);

var svg = d3.select(".left-column").append("svg")
    .attr("width", width)
    .attr("height", height)

// var state_box = d3.select(".right-column")
//   .append('div')
//   .attr('id', 'state-info')

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

    register_places_listeners()
});


function load_people() {
  d3.csv("data/realpeople.csv", function(people) {
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
  if(percentage == 0) return "none";
  else if(percentage < 0.05) return "lowest";
  else if(percentage < 0.1) return "low";
  else if(percentage < 0.2) return "medium";
  else if(percentage < 0.3) return "high";
  else if(percentage <= 1) return "highest";
}

function register_places_listeners() {
  var panel_info = d3.select(".people-container")
  d3.selectAll('.place')
    .on('click', function(event) {

      var state = d3.select(this).datum().properties
          var people = filter_people_by_state(state.UF);


          var panel = '<div class="panel panel-default">'
                      +'<div class="panel-heading">'
                      +'<h3 class="panel-title">'+state.ESTADO+" - "+(window.people_per_state[state.UF] || 0)+'</h3>'
                      +'</div>'
                        +'<div class="panel-body">'
                          +'<ul></ul>'
                        +'</div>'
                      +'</div>';

          panel_info
            .html(panel)

          var info = "<li>no TWers here :(</li>";

          if (people.length > 0){
            people.forEach(function(person){

                var person_item =  d3.select(".panel-body ul")
                  .append("li")
                  .attr("class", "photo")
                  .append("div")
                  .attr("class", "row")

                  var photo_url = "/styles/img/no-photo.png";
                  if(person["Facebook"].trim().length > 0) {
                    photo_url = "http://graph.facebook.com/"+person["Facebook"]+"/picture?type=square";
                  }


                  person_item
                    .append("div")
                    .attr("class", "col-md-5")
                    .append("img")
                    .attr("src", photo_url)

                  person_item
                    .append("div")
                    .attr("class", "col-md-5 person-info")
                    .append("p")
                    .text(person["Name"])

                  person_item.select("div .person-info")
                    .append("p")
                    .text(person["City of birth"])

            });
          }

      d3.selectAll('.place').classed({"inactive": true, "active": false})
      var path = d3.select(this)
      path.classed({"active": true, "inactive": false})
    })

    svg.on('mouseenter', function() {
        d3.selectAll('.place').classed({"active": false, "inactive": false})
    });
}

function filter_people_by_state(state) {
  people = window.people || [];
  people_of_state = people.filter(function(person) {
    return person["State of Birth"] == state;
  });
  return people_of_state;
}

function extract_people_per_state(people) {
  var state_data = {};
  var brazil_quantity = 0;
  for(person in people) {
    brazil_quantity = brazil_quantity + 1;
    state = people[person]["State of Birth"].toUpperCase()
    var person = people[person];
    if(typeof(state_data[state]) == "undefined")
      state_data[state] = 1;
    else
      state_data[state] = state_data[state] + 1;
  }
  window.brazil_quantity = brazil_quantity
  return state_data;
}
