
function animated_fit_learning_narrative(current_narrative_position) {

  var n_clients = 10
  var n_styles = 10
  var n_pairs = 10
  var n_clients_visible = 10
  var n_styles_visible = 10
  var show_histogram = false
  var show_uncertainty = false
  var sim_speed = 25

  if (current_narrative_position == 1) {
    n_clients = 10
    n_styles = 10
    n_pairs = 10
    n_clients_visible = 1
    n_styles_visible = 0
    show_uncertainty = true
    show_histogram = false
    sim_speed = 200
  }

  if (current_narrative_position == 2) {
    n_clients = 10
    n_styles = 10
    n_pairs = 10
    n_clients_visible = 0
    n_styles_visible = 1
    show_uncertainty = true
    show_histogram = false
    sim_speed = 200
  }

  if (current_narrative_position == 3) {
    n_clients = 10
    n_styles = 10
    n_pairs = 10
    n_clients_visible = 10
    n_styles_visible = 10
    show_uncertainty = false
    show_histogram = false
    sim_speed = 40
  }

  if (current_narrative_position == 4) {
    n_clients = 100
    n_styles = 100
    n_pairs = 100
    n_clients_visible = 100
    n_styles_visible = 100
    show_uncertainty = false
    show_histogram = true
    sim_speed = 70
  }

  var svg = d3.select("#animated-fit-learning-narrative")

  var x = d3.scale.linear().range([200,500]).domain([0,1])

  var learning_rate = 0.2
  var hist_n = 15

  var clients = []
  var styles = []
  var clients_visible = []
  var styles_visible = []


  for (var i=0; i < n_clients; i++){
    var latent_size = Math.random()
    if (n_clients_visible == 1 && i == 0) {
      if (Math.random() < 0.5){ latent_size = 0.01 }
      else { latent_size = 0.99 }
    }
    clients.push({id: i, latent_size: latent_size,
                  current_position: 0.5, next_position: 0.5,
                  current_n_tests: 0, next_n_tests: 0})
  }

  for (var i=0; i < n_styles; i++){
    var latent_size = Math.random()
    if (n_styles_visible == 1 && i == 0) {
      if (Math.random() < 0.5){ latent_size = 0.01 }
      else { latent_size = 0.99 }
    }
    styles.push({id: i, latent_size: latent_size,
                 current_position: 0.5, next_position: 0.5,
                 current_n_tests: 0, next_n_tests: 0})
  }

  clients_visible = clients.slice(0, n_clients_visible)
  styles_visible = styles.slice(0, n_styles_visible)

  svg.selectAll(".client").remove()
  svg.selectAll(".style").remove()

  var client_bodies = svg.selectAll(".client").data(clients_visible, function(d){ return d.id })
    .enter().append("g")
      .attr("class", "client")
      .attr("transform", "translate(" + (350 - 283.5) + "," + (130 - 399.1 - 12) + ")")

  client_bodies
      .append("circle")
        .attr("cx", 283.5)
        .attr("cy", 399.1)
        .attr("r", 3.3)
        .style("fill", "#52598B")

  client_bodies
      .append("path")
        .attr("d", "M288.7,409.4v8.2c-0.7,0.3-1.5,0.6-2.2,0.8c-0.9,0.2-1.9,0.4-2.9,0.4c-1,0-2-0.1-2.9-0.4c-0.8-0.2-1.5-0.4-2.2-0.8v-8.2c0-2.8,2.3-5.2,5.2-5.2C286.4,404.2,288.7,406.5,288.7,409.4z")
        .style("fill", "#52598B")

  svg.selectAll(".style").data(styles_visible, function(d){ return d.id })
    .enter().append("g")
      .attr("class", "style")
      .attr("transform", "translate(0,0)")
      .append("path")
        .attr("d", function(d){ return silhouette_outline_d(Math.floor(Math.random() * 7), 350 - 10, 170 - 7) })
        .style("fill", "#4B90A6")

  function animation_step(){

    // actual simulation

    var pairs = []

    for (var i=0; i < n_pairs; i++) {
      var client_id = Math.floor(Math.random()*n_clients)

      // stlye selection a stochastic function of distance from client's current_position
      var weights = styles.map(function(d){ return d.current_position - clients[client_id].current_position })
      var cum_weights = []
      weights.reduce(function(a,b,i) { cum_weights[i] = {v: a+b, id:i}; return a + b },0)
      cum_weights = cum_weights.sort(function(a,b){ return a.v > b.v })
      var style_id = Math.floor(Math.random()*n_styles)
      if (cum_weights[cum_weights.length - 1].v != 0) {
        var sel_random = Math.random() * cum_weights[cum_weights.length - 1].v
        var sel = cum_weights.find(function(d){ return d.v >= sel_random })
        if (!(sel == null)) {
          style_id = sel.id
        }
      }

      pairs.push({client_id: client_id, style_id: style_id})

      // for uncertainty calc
      clients[client_id].next_n_tests += 1
      styles[style_id].next_n_tests += 1

      // big = 1, small = -1
      var feedback = -1 + 2 * (clients[client_id].latent_size > styles[style_id].latent_size)

      // use feedback if it contradicts current
      if ((feedback == -1) && (clients[client_id].current_position <= styles[style_id].current_position)) {
        clients[client_id].next_position = clients[client_id].current_position + Math.random() * learning_rate
        styles[style_id].next_position = styles[style_id].current_position - Math.random() * learning_rate
      }

      if ((feedback == 1) && (clients[client_id].current_position >= styles[style_id].current_position)) {
        clients[client_id].next_position = clients[client_id].current_position - Math.random() * learning_rate
        styles[style_id].next_position = styles[style_id].current_position + Math.random() * learning_rate
      }

      clients[client_id].next_position = Math.min(1, Math.max(0, clients[client_id].next_position))
      styles[style_id].next_position = Math.min(1, Math.max(0, styles[style_id].next_position))

    }

    // histograms

    var client_hist_dy = 200 / n_clients
    var client_hist = []
    for (var i=0; i < hist_n; i++) {
      var this_count = 0
      clients.forEach(function(d){
        if ((d.current_position >= i/hist_n) && (d.current_position < (i+1)/hist_n)) {
          this_count += 1
        }
      })
      client_hist.push(this_count)
    }

    var style_hist_dy = 200 / n_styles
    var style_hist = []
    for (var i=0; i < hist_n; i++) {
      var this_count = 0
      styles.forEach(function(d){
        if ((d.current_position >= i/hist_n) && (d.current_position < (i+1)/hist_n)) {
          this_count += 1
        }
      })
      style_hist.push(this_count)
    }

    // prep for visible parts of sim

    clients_visible = clients.slice(0, n_clients_visible)
    styles_visible = styles.slice(0, n_styles_visible)

    pairs = pairs.filter(function(d){
      var keep = true
      if (d.client_id >= n_clients_visible) { keep = false }
      if (d.style_id >= n_styles_visible) { keep = false }
      return keep
    })

    // dom manipulation

    var delay = 400 * 25 / sim_speed
    var move = 500 * 25 / sim_speed
    var wait = 300 * 25 / sim_speed

    var line_stroke = "#000"
    if (pairs.length > 20) { line_stroke = "#999" }

    svg.selectAll(".fix").remove()

    svg.selectAll(".fix").data(pairs).enter().append("line")
      .attr("class", "fix")
      .attr("y1", 130)
      .attr("y2", 170)
      .style("stroke", line_stroke)
      .style("stroke-width", 0.25)
      .style("fill", "none")
      .attr("x1", function(d){ return x(clients[d.client_id].current_position) })
      .attr("x2", function(d){ return x(styles[d.style_id].current_position) })
      .transition().delay(delay).duration(move)
        .attr("x1", function(d){ return x(clients[d.client_id].next_position) })
        .attr("x2", function(d){ return x(styles[d.style_id].next_position) })

    svg.selectAll(".client")
      .transition().delay(delay).duration(move)
        .attr("transform", function(d){ return "translate(" + (x(d.next_position) - 283.5) + "," + (130 - 399.1 - 12) + ")" })

    svg.selectAll(".style")
      .transition().delay(delay).duration(move)
        .attr("transform", function(d){ return "translate(" + (x(d.next_position) - 350) + ",0)" })


    svg.selectAll(".client_uncertainty").remove()
    svg.selectAll(".style_uncertainty").remove()

    if (show_uncertainty) {

      svg.selectAll(".client_uncertainty").data(clients_visible, function(d){ return d.id })
        .enter().append("rect")
          .attr("class", "client_uncertainty")
          .style("opacity", 0.25)
          .style("fill", "#52598B")
          .attr("y", 127)
          .attr("height", 6)
          .attr("x", function(d){ return x(d.current_position) - 150 / Math.sqrt(1 + d.current_n_tests) })
          .attr("width", function(d){ return 300 / Math.sqrt(1 + d.current_n_tests) })
          .transition().delay(delay).duration(move)
            .attr("x", function(d){ return x(d.next_position) - 150 / Math.sqrt(1 + d.next_n_tests) })
            .attr("width", function(d){ return 300 / Math.sqrt(1 + d.next_n_tests) })

      svg.selectAll(".style_uncertainty").data(styles_visible, function(d){ return d.id })
        .enter().append("rect")
          .attr("class", "style_uncertainty")
          .style("opacity", 0.25)
          .style("fill", "#4B90A6")
          .attr("y", 167)
          .attr("height", 6)
          .attr("x", function(d){ return x(d.current_position) - 150 / Math.sqrt(1 + d.current_n_tests) })
          .attr("width", function(d){ return 300 / Math.sqrt(1 + d.current_n_tests) })
          .transition().delay(delay).duration(move)
            .attr("x", function(d){ return x(d.next_position) - 150 / Math.sqrt(1 + d.next_n_tests) })
            .attr("width", function(d){ return 300 / Math.sqrt(1 + d.next_n_tests) })

    }

    svg.selectAll(".client_hist").remove()
    svg.selectAll(".style_hist").remove()

    if (show_histogram) {

      svg.selectAll(".client_hist").data(client_hist).enter().append("rect")
        .attr("class", "client_hist")
        .style("opacity", 0.25)
        .style("fill", "#52598B")
        .attr("x", function(d,i){ return x(i/hist_n) })
        .attr("y", function(d){ return 120 - Math.min(60,client_hist_dy * d) })
        .attr("width", 300 / hist_n)
        .attr("height", function(d){ return Math.min(60,client_hist_dy * d) })

      svg.selectAll(".style_hist").data(style_hist).enter().append("rect")
        .attr("class", "style_hist")
        .style("opacity", 0.25)
        .style("fill", "#4B90A6")
        .attr("x", function(d,i){ return x(i/hist_n) })
        .attr("y", 180)
        .attr("width", 300 / hist_n)
        .attr("height", function(d){ return Math.min(60,style_hist_dy * d) })

    }

    // prep next timestep

    clients.forEach(function(d){
      d.current_position = d.next_position
      d.current_n_tests = d.next_n_tests
    })

    styles.forEach(function(d){
      d.current_position = d.next_position
      d.current_n_tests = d.next_n_tests
    })

    animation_state.latent_size_animation_interval = setTimeout(animation_step, (delay + move + wait))

  }

  stop_animation_interval("latent_size_animation_interval")

  animation_step()

}

function latent_size_animation_1(){
  animated_fit_learning_narrative(1)
  animation_state.latent_size_meta1_interval = setTimeout(function(){animated_fit_learning_narrative(2)}, 3000)
}

function latent_size_animation_2(){
  animated_fit_learning_narrative(3)
  animation_state.latent_size_meta2_interval = setTimeout(function(){animated_fit_learning_narrative(4)}, 5000)
}

