
function animate_full_height_client(){

  d3.select("#stdm1a")
    .attr("display", "block")
    .style("opacity", 0)
    .transition().delay(0).duration(500)
      .style("opacity", 1)
    .transition().delay(1500).duration(500)
      .style("opacity", 0)
    .transition().delay(5000).duration(500)
      .style("opacity", 1)

  d3.select("#stdm1b")
    .attr("display", "block")
    .transition().delay(0).duration(0)
    .style("opacity", 0)
    .transition().delay(1500).duration(500)
      .style("opacity", 1)
    .transition().delay(3000).duration(500)
      .style("opacity", 0)
    .transition().delay(5000).duration(500)
      .style("opacity", 1)

  d3.select("#stdm1c")
    .attr("display", "block")
    .transition().delay(0).duration(0)
    .style("opacity", 0)
    .transition().delay(3000).duration(500)
      .style("opacity", 1)

}

function rotate_state_event_df(progress){

  var dy = (256.2 - 217.7)

  d3.select("#stdm2").style("opacity", (1-progress))

  d3.select("#stdm2b").selectAll("rect")
    .transition().duration(0)
      .attr("transform", function(d,i) {
        var x = (-365 + i * 77) * progress
        var y = (303 - i * dy) * progress
        var cx = d3.select(this)[0][0].x.animVal.value
        var cy = d3.select(this)[0][0].y.animVal.value
        return "translate(" + x + "," + y + ") rotate(" + (-90 * progress) + " " + cx + " " + cy +")"
      })
      .style("opacity", 1 - 0.5 * progress)

  d3.select("#stdm2c").selectAll("rect")
    .transition().duration(0)
      .attr("transform", function(d,i) {
        var x = (-468 + i * 77) * progress
        var y = (140 - i * dy) * progress
        var cx = d3.select(this)[0][0].x.animVal.value
        var cy = d3.select(this)[0][0].y.animVal.value
        return "translate(" + x + "," + y + ") rotate(" + (-90 * progress) + " " + cx + " " + cy +")"
      })
      .style("opacity", 1 - 0.5 * progress)


}

function state_events_client_to_dot(progress){

  var start_scale = 0.48
  var end_scale = 0.15
  var start_x = 95.8495
  var start_y = 373.8817

  var current_scale = start_scale * (1-progress) + end_scale * (progress)
  var current_x = start_x + (69 * 0.48 / (0.48 / 0.15)) * progress
  var current_y = start_y + (90 * 0.48 / (0.48 / 0.15)) * progress

  d3.select("#stdm3").select("image")
    .transition().duration(0)
      .attr("transform", "matrix(" + (current_scale) + " 0 0 " + (current_scale) + " " + (current_x) + " " + (current_y) + ")")
      .style("opacity", (1 - progress))

  d3.select("#stdm3-client-circle")
    .transition().duration(0)
      .style("opacity", progress)
      .attr("r", 20 * (1-progress) + 3 * (progress))

}

function state_transitions_stop(){
  stop_animation_interval("state_machine_animation_interval")
  stop_force_animation("state_machine_animation_force")
}

function state_transitions_clear(){
  d3.select("#state-transitions-animation").select(".animation-g").html("")
}

function state_transitions(show_history){

  d3.select("#state-transitions-animation")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

  state_transitions_stop()
  state_transitions_clear()

  var width = 900
  var height = 600

  var svg_height = +d3.select("#vis").style("height").replace("px","")
  var svg_width = +d3.select("#vis").select("svg").style("width").replace("px","")
  var svg_px_height = 926 * svg_height / svg_width
  var svg_px_top_padding = Math.max(0, (svg_px_height - 665)/2)

  var color = d3.scale.ordinal().range(["#aaa", "#CCDE66", "#F3A54A", "#4B90A6", "#AA7CAA"])
  var color_labels = d3.scale.ordinal().range(["#aaa", "#CCDE66", "#F3A54A", "#4B90A6", "#AA7CAA"])

  var svg = d3.select("#state-transitions-animation").select(".animation-g")
  var svg2 = d3.select("#q-t-model").select(".animation-g")

  svg.html("")
  svg2.html("")

  // state labels
  var add_label = function(d, i){
    svg.append('text')
        .attr("class", "state_count_" + i)
        .attr("x", d.x)
        .attr("y", d.y - 50)
        .attr("fill", color_labels(i))
        .attr("text-anchor", "middle")
        .text('')
  }

  var lines_margin = {top: 40, right: 15, bottom: 340, left: 500, top2: 320},
      lines_width = width - lines_margin.left - lines_margin.right,
      lines_height = height - lines_margin.top - lines_margin.bottom

  var x = d3.scale.linear()
      .domain([0,200])
      .range([0, lines_width])

  var y = d3.scale.linear()
      .domain([0,600])
      .range([lines_height, 0])

  var y2 = d3.scale.linear()
      .domain([0,240])
      .range([lines_height, 0])

  var demand_line = d3.svg.line()
      .x(function(d) { return x(d.t) })
      .y(function(d) { return y(d.demand) })

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")

  var yAxis2 = d3.svg.axis()
      .scale(y2)
      .orient("left")

  var line_g = svg.append("g")
                    .attr("transform", "translate(" + lines_margin.left + "," + lines_margin.top + ")")

  var line_g2 = svg2.append("g")
                    .attr("transform", "translate(" + lines_margin.left + "," + lines_margin.top2 + ")")


  var foci = [
    {"text": "Initial", "x": 100, "y": -100 - svg_px_top_padding, "type": "source"},
    {"text": "State 1", "x": 100, "y": 170, "type": "transient"},
    {"text": "State 2", "x": 250, "y": 250, "type": "transient"},
    {"text": "State 3", "x": 350, "y": 100, "type": "transient"}
  ]

  var stp = [
    [0, 1, 0, 0],
    [0, 0.90, 0.09, 0.01],
    [0, 0, 0.96, 0.04],
    [0, 0, 0.1, 0.90]
  ]

  var p_fix = [0.55, 0.65, 0.1]

  if (show_history) {

    // history chart 1 axes

    var xa = line_g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + lines_height + ")")
    xa
      .append("line")
        .attr("x1", x(0))
        .attr("x2", x(200))
        .attr("y1", 0)
        .attr("y2", 0)
    xa
      .append("text")
        .attr("x", x(200))
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text("time")

    var ya = line_g.append("g")
        .attr("class", "y axis")
    ya
      .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", y(0))
        .attr("y2", y(600))
    ya
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "-0.5em")
        .style("text-anchor", "end")
        .text("number of clients in each state")

    // history chart 2 axes

    var xa = line_g2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + lines_height + ")")
    xa
      .append("line")
        .attr("x1", x(0))
        .attr("x2", x(200))
        .attr("y1", 0)
        .attr("y2", 0)
    xa
      .append("text")
        .attr("x", x(200))
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text("time")

    var ya = line_g2.append("g")
        .attr("class", "y axis")
    ya
      .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", y2(0))
        .attr("y2", y2(240))
    ya
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "-0.5em")
        .style("text-anchor", "end")
        .text("demand for shipments")

  }

  var histry = []
  var focus_node_count = []
  foci.forEach(function(d,i){
    add_label(d, i)
    focus_node_count.push(0)
  })


  var source_i = foci.findIndex(function(d){ return d.type == "source" }),
      sink_i = foci.findIndex(function(d){ return d.type == "sink" })

  var nodes = []

  animation_state.state_machine_animation_force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .gravity(0)
      .friction(0.01)
      .charge(-1500)
      .size([width, height])
      .on("tick", tick)

  var node = svg.selectAll("circle")

  var t = 0
  var n = 0

  function tick(e) {
    var k = (0.001 + Math.pow(n,0.5) / 12) * e.alpha

    // Push nodes toward their designated focus.
    nodes.forEach(function(o, i) {
      o.y += (foci[o.state].y - o.y) * k
      o.x += (foci[o.state].x - o.x) * k
    })

    node
        .attr("fill", function(d) { return color(d.previous_state) })
        .attr("cx", function(d) { return d.x })
        .attr("cy", function(d) { return d.y })
  }

  var next_month = function(){

    // update time
    t += 1

    if (t > 199) {
      state_transitions_stop()
    } else {

      // nodes changing state (and compute updated foci counts)
      foci.forEach(function(d,i){
        focus_node_count[i] = 0
      })
      nodes.forEach(function(o, i) {
        var trans_probs = stp[o.state]
        var cum_trans_probs = []
        trans_probs.reduce(function(a,b,i) { return cum_trans_probs[i] = a+b },0)
        var r = Math.random()
        var new_state = cum_trans_probs.findIndex(function(d){ return d >= r })
        if (new_state != -1) {
          o.previous_state = o.state
          o.state = new_state
        }
        focus_node_count[o.state] += 1
      })

      // update state count above foci
      foci.forEach(function(d,i){
        if (focus_node_count[i] > 0) {
          d3.select(".state_count_" + i)
            .text(d.text)
            .transition()
              .duration(500)
              .attr("y", d.y - 20 - Math.pow(focus_node_count[i] * 10, 0.5) )
        } else {
          d3.select(".state_count_" + i).text('')
        }
      })
      if (t > 1){ histry.push({t: t-1, n1: focus_node_count[1], n2: focus_node_count[2], n3: focus_node_count[3],
                               demand: focus_node_count[1] * p_fix[0] + focus_node_count[2] * p_fix[1] + focus_node_count[3] * p_fix[2]}) }

      // entering nodes
      var num_new = 100
      if (t > 1) { num_new = Math.floor(Math.random() * 5) }
      if (t > 200) { num_new = 0 }

      for (var i=0; i<num_new; i++) {
        nodes.push({id: n, state: source_i, previous_state: source_i,
                    x: foci[source_i].x + 10 * Math.random(), y: foci[source_i].y + 10 * Math.random()})
        n += 1
      }

      if (t == 1 && page_state.state_machines_show_selected_client) {
        nodes.push({id: n, state: source_i, previous_state: source_i,
                    x: 112.4095, y: 395.4817})
        n += 1
      }

      animation_state.state_machine_animation_force.start()

      node = node.data(nodes, function(d) { return d.id })

      node.enter().append("circle")
          .attr("class", "node")
          .attr("cx", function(d) { return d.x })
          .attr("cy", function(d) { return d.y })
          .attr("r", 3)
          .attr("fill", color(0))
          .attr("stroke", "#333")
          .call(animation_state.state_machine_animation_force.drag)

      if (show_history) {

        // update history chart 1

        d3.selectAll(".state_history").remove()

        var state_history = line_g.selectAll(".state_history")
            .data(histry)

        state_history.enter().append("g")
            .attr("class", "state_history")

        state_history.append("rect")
            .attr("x", function(d){ return x(d.t) })
            .attr("y", function(d){ return y(d.n1) })
            .attr("width", 2.5)
            .attr("height", function(d){ return y(0) - y(d.n1) })
            .style("fill", color(1))

        state_history.append("rect")
            .attr("x", function(d){ return x(d.t) })
            .attr("y", function(d){ return y(d.n1 + d.n2) })
            .attr("width", 2.5)
            .attr("height", function(d){ return y(d.n1) - y(d.n1 + d.n2) })
            .style("fill", color(2))

        state_history.append("rect")
            .attr("x", function(d){ return x(d.t) })
            .attr("y", function(d){ return y(d.n1 + d.n2 + d.n3) })
            .attr("width", 2.5)
            .attr("height", function(d){ return y(d.n1 + d.n2) - y(d.n1 + d.n2 + d.n3) })
            .style("fill", color(3))


        // update history chart 2


        d3.selectAll(".state_history2").remove()

        line_g2.selectAll(".state_history2").remove()

        line_g2.append("path")
            .datum(histry)
            .attr("class", "state_history2")
            .attr("d", demand_line)
            .style("stroke-width", "2px")
            .style("stroke", "#000")
            .style("fill", "none")

      }

      // update current time
      var current_time = t

      // update dots' states and colors
      window.setTimeout(function() {
        if (t == current_time){
          nodes.forEach(function(d){ d.previous_state = d.state })
        }
      }, 400)

    }

  }

  animation_state.state_machine_animation_interval = setInterval(next_month,500)

  next_month()


}