
// global variables ---


  var overview_state_locations = [{x: -70, y: -50}, {x: 50, y: -40}, {x: -10, y: 70}]

  var overview_states = []
  for (var i=0; i<10; i++) {
    var k = Math.floor(Math.random() * 3)
    overview_states.push({x: overview_state_locations[k].x - 10 + 10 * Math.random() - 10 * i,
                       y: overview_state_locations[k].y - 10 + 10 * Math.random()})
  }

  var overview_styles_overlap = [{x: 0, y: 12}, {x: -10, y: -43}, {x: -55, y: -43}, {x: -30, y: -5},
                              {x: -90, y: 30}, {x: -30, y: 30}, {x: -85, y: -25}, {x: -50, y: 15}]

  var overview_wh_locations = [{x: 20, y: -80}, {x: 20, y: 0}, {x: 20, y: 80}]

  var overview_style_locations = []
  for (var i=0; i<8; i++) {
    var k = Math.floor(Math.random() * 3)
    overview_style_locations.push({x: overview_wh_locations[k].x + 100 * Math.random() + overview_styles_overlap[i].x,
                                y: overview_wh_locations[k].y + overview_styles_overlap[i].y})
  }


// ---


function draw_overview_sneakpeek_labels() {

  d3.select('#sketch-animation-labels').selectAll("circle")
      .data(overview_state_locations)
    .enter().append("circle")
      .attr("cx", function(d){ return d.x + 180 })
      .attr("cy", function(d){ return d.y + 350 })
      .attr("r", 55)
      .attr("fill", "none")
      .attr("stroke", "#847c77")
      .attr("stroke-linecap", "round")
      .attr("stroke-dasharray", "4,8")
      .style("opacity", 0.6)

  d3.select('#sketch-animation-labels').selectAll("rect")
      .data(overview_wh_locations)
    .enter().append("rect")
      .attr("x", function(d){ return d.x + 580 })
      .attr("y", function(d){ return d.y + 325 })
      .attr("width", 200)
      .attr("height", 50)
      .attr("fill", "none")
      .attr("stroke", "#847c77")
      .attr("stroke-linecap", "round")
      .attr("stroke-dasharray", "4,8")
      .style("opacity", 0.6)

}

function overview_animation_run() {

  function overview_incoming_clothes() {

    d3.select("#sketch-animation").selectAll("path").remove()

    var clothes_data = []
    for (var i=0; i<1000; i++) {
      var k = Math.floor(Math.random() * 3)
      var form_n = Math.floor(Math.random() * 14)
      var delay1 = Math.random()*100000
      var delay2 = delay1 + 1000 + Math.random()*30000
      if (Math.random() < 0.2) { delay2 = 10000000 }
      var x1 = 295 + Math.random() * 90
      var y1 = 125 + 40 * k
      clothes_data.push({k:k, form_n: form_n, delay1: delay1, delay2: delay2, x1: x1, y1: y1})
    }

    d3.select("#sketch-animation").selectAll("path")
        .data(clothes_data)
      .enter().append("path")
        .attr("fill", "#fff")
        .attr("stroke", "#847c77")
        .attr("stroke-width", 0.5)
        .attr("transform", "scale(2)")
        .attr("d", function(d){ return silhouette_outline_d(d.form_n, 500, 180) })
        .transition().delay(function(d){ return d.delay1 }).duration(2000)
          .attr("d", function(d){ return silhouette_outline_d(d.form_n, d.x1, d.y1) })
        .transition().delay(function(d){ return d.delay2 }).duration(2000).ease("linear")
          .attrTween("d", function(d){
            return function(t) {
              var rx = 130
              var ry = d.y1 - 25
              var t_angle = (Math.PI) * t
              var t_x = rx * Math.cos(t_angle)
              var t_y = -1 * ry * Math.sin(t_angle)
              return silhouette_outline_d(d.form_n, d.x1 - rx + t_x, d.y1 + t_y)
            }
          })
          .style("opacity", 0.2)
          .remove()

  }

  function overview_state_machine() {
    for (var i=0; i<10; i++) {
      if (Math.random() < 0.1) {
        var k = Math.floor(Math.random() * 3)
        overview_states[i] = {x: overview_state_locations[k].x - 10 + 10 * Math.random() - 10 * i,
                           y: overview_state_locations[k].y - 10 + 10 * Math.random()}
      }
    }
    d3.selectAll("#sketch-clients, #sketch-client-selected").selectAll("g")
        .data(overview_states)
      .transition().duration(1000)
        .attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")" })
  }

  function overview_recsys_animation() {

    var arc = d3.svg.arc()

    var arc_colors = ["#F3A54A", "#AA7CAA", "#CCDE66", "#4B90A6"]
    var arc_inner_radius = [180, 210, 242, 274]
    var arc_outer_radius = [210, 242, 274, 305]
    var arc_x = [361.3, 416.3, 471.1, 525.7]
    var arc_y = 409.1

    var transition_duration = 2000

    var previous_datum = []
    var new_datum = []
    for (var k=0; k<4; k++){
      var p = []
      var n = []
      for (var i=0; i<4; i++){
        p.push( d3.select("#sketch-stylingAlgo").select(".sketch_recsys_arc_" + k + "_" + i).datum() )

        var score = 0.7 * Math.random()
        var startAngle = Math.random() * 2 * Math.PI
        var endAngle = startAngle + score * 2 * Math.PI
        n.push({startAngle: startAngle, endAngle: endAngle})

      }
      previous_datum.push(p)
      new_datum.push(n)
    }

    var this_timer = d3.timer(function(local_t){

      if (local_t > transition_duration) {
        this_timer.stop()
      } else {
        for (var k=0; k<4; k++){
          for (var i=0; i<4; i++){

            d3.select("#sketch-stylingAlgo").select(".sketch_recsys_arc_" + k + "_" + i)
                .datum({
                    startAngle: previous_datum[k][i].startAngle + (new_datum[k][i].startAngle - previous_datum[k][i].startAngle) * local_t / transition_duration,
                    endAngle: previous_datum[k][i].endAngle + (new_datum[k][i].endAngle - previous_datum[k][i].endAngle) * local_t / transition_duration,
                    innerRadius: arc_inner_radius[k] / 12.5,
                    outerRadius: arc_outer_radius[k] / 12.5
                  })
                .transition().duration(0)
                  .attr("d", arc)

          }
        }
      }
    })
  }

  function overview_recsys_draw() {

    var arc = d3.svg.arc()

    var arc_colors = ["#F3A54A", "#AA7CAA", "#CCDE66", "#4B90A6"]
    var arc_inner_radius = [180, 210, 242, 274]
    var arc_outer_radius = [210, 242, 274, 305]
    var arc_x = [361.3, 416.3, 471.1, 525.7]
    var arc_y = 409.1

    for (var k=0; k<4; k++){

      for (var i=0; i<4; i++){

        var score = 0.7 * Math.random()
        var startAngle = Math.random() * 2 * Math.PI
        var endAngle = startAngle + score * 2 * Math.PI

        d3.select("#sketch-stylingAlgo").selectAll(".sketch_recsys_arc_" + k + "_" + i).remove()

        d3.select("#sketch-stylingAlgo").append("path")
            .datum({
                startAngle: startAngle,
                endAngle: endAngle,
                innerRadius: arc_inner_radius[k] / 12.5,
                outerRadius: arc_outer_radius[k] / 12.5
              })
            .attr('class', "sketch_recsys_arc_" + k + "_" + i)
            .style("fill", arc_colors[k])
            .attr("d", arc)
            .attr("transform", "translate(" + arc_x[i] + "," + arc_y + ")")
            .attr('opacity', 1)

      }

    }

  }

  if (animation_state.overview_animation_interval == false) {
    overview_incoming_clothes()
    overview_state_machine()
    animation_state.overview_animation_interval = setInterval(overview_state_machine, 1100)
    overview_recsys_draw()
    //overview_recsys_animation()
    animation_state.overview_animation_interval2 = setInterval(overview_recsys_animation, 5000)
  }

}

function overview_reset() {

  stop_animation_interval("overview_animation_interval")
  stop_animation_interval("overview_animation_interval2")

  d3.select("#sketch-animation").selectAll("path").remove()

  d3.selectAll("#sketch-inventory, #sketch-clients, #sketch-client-selected, #sketch-styling-circle")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(0,0)")

}

function overview_sneakpeek(progress){

  function overview_hide(ids) {
      d3.selectAll(ids)
        .transition().duration(0)
          .attr("display", "block")
          .style("opacity", 0)
  }

  function overview_show(ids) {
      d3.selectAll(ids)
        .transition().duration(0)
          .attr("display", "block")
          .style("opacity", 1)
  }

  function overview_unveil(progress) {

    d3.select("#sketch-stylist")
      .transition().duration(0)
        .attr("display", "block")
        .style("opacity", Math.min(1, progress * 5))
        .attr("transform", "translate(0," + (-90 * progress) + ")")

    d3.select("#sketch-machines")
      .transition().duration(0)
        .attr("display", "block")
        .style("opacity", Math.min(1, progress * 5))
        .attr("transform", "translate(0," + (90 * progress) + ")")

    d3.select("#sketch-inventory").selectAll("g")
        .data(overview_style_locations)
      .transition().duration(0)
        .attr("transform", function(d){ return "translate(" + (d.x * progress) + "," + (d.y * progress) + ")" })

    if (progress < 1) {

      d3.selectAll("#sketch-clients, #sketch-client-selected").selectAll("g")
          .data(overview_states)
        .transition().duration(0)
          .attr("transform", function(d){ return "translate(" + (d.x * progress) + "," + (d.y * progress) + ")" })
    }

  }

  if (progress < 0.1 ) {

    overview_show("#sketch-styling-circle")
    overview_hide("#sketch-stylingAlgo, #sketch-animation-labels, #sketch-animation")
    overview_unveil(0)

    stop_animation_interval("overview_animation_interval")
    stop_animation_interval("overview_animation_interval2")

  } else if (progress < 0.2) {

    overview_hide("#sketch-stylingAlgo, #sketch-animation-labels, #sketch-animation")
    overview_unveil((progress - 0.1) / 0.25)

    d3.select("#sketch-styling-circle")
      .transition().duration(0)
        .style("opacity", 1 - (progress - 0.1) / 0.1)

    stop_animation_interval("overview_animation_interval")
    stop_animation_interval("overview_animation_interval2")

  } else if (progress < 0.35) {

    overview_hide("#sketch-styling-circle, #sketch-stylingAlgo, #sketch-animation-labels, #sketch-animation")
    overview_unveil((progress - 0.1) / 0.25)

    stop_animation_interval("overview_animation_interval")
    stop_animation_interval("overview_animation_interval2")

  } else if (progress < 0.8) {

    overview_hide("#sketch-styling-circle")
    overview_show("#sketch-stylist, #sketch-machines, #sketch-stylingAlgo, #sketch-animation-labels, #sketch-animation")
    overview_unveil(1)

    overview_animation_run()

  } else if (progress < 0.95) {

    overview_hide("#sketch-styling-circle, #sketch-stylingAlgo, #sketch-animation-labels, #sketch-animation")
    overview_unveil(1 - (progress - 0.8) / 0.15)

    stop_animation_interval("overview_animation_interval")
    stop_animation_interval("overview_animation_interval2")

  } else {

    overview_hide("#sketch-stylingAlgo, #sketch-animation-labels, #sketch-animation")
    overview_unveil(0)

    d3.select("#sketch-styling-circle")
      .transition().duration(0)
        .style("opacity", (progress - 0.95) / 0.05)

    stop_animation_interval("overview_animation_interval")
    stop_animation_interval("overview_animation_interval2")

  }

}