
function intro_slide(){

  d3.selectAll('#intro-matching-background-animation, #intro-matching-foreground-animation, #intro-matching-data, #intro-matching-style, #intro-landing-static')
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

  d3.selectAll("#intro-area-white-over")
    .transition().duration(0)
      .attr("display", "none")
      .style("opacity", 0)

  d3.selectAll("#intro-title")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

  stop_animation_interval("intro_matching_background_interval")
  stop_animation_interval("intro_matching_interval")

  d3.select("#intro-matching-background-animation").html("")
  d3.select("#intro-matching-foreground-animation").html("")

  var speed = 0.0001 // ticks per millisecond, background animation
  var duration = 4000  // duration of each pair matching in ms, foreground animation
  var svg_height = +d3.select("#intro-area").style("height").replace("px","")
  var svg_width = +d3.select("#intro-area").select("svg").style("width").replace("px","")
  var svg_px_height = 1526 * svg_height / svg_width

  // mapping functions
  var coord_x_client = function(r,a) { return -150 - 60 + 500 * r }
  var coord_x_style = function(r,a) { return -75 + 385 + 250 * r }

  // adding data-linked dom elements for bar graph and stylists

  var bars = []
  for (var i=0; i<11; i++){
    bars.push(Math.random())
  }

  d3.select("#intro-matching-foreground-animation").selectAll(".bar")
      .data(bars)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i){ return 418 - 36.5 + 15 * i })
      .attr("y", 302.5)
      .attr("width", 15)
      .attr("height", 0)
      .attr("fill", function(d,i){
          if (i < 6){
            return color_palette(i)
          } else {
            return color_palette(i - 6)
          }
        })
      .attr("opacity", 0.9)

  d3.select("#intro-matching-foreground-animation").selectAll(".stylist")
      .data([0,0,0,1,1,1])
    .enter().append("image")
      .attr("class", "stylist")
      .attr("overflow", "visible")
      .attr("width", 50)
      .attr("height", 50)
      .attr("x", function(d,i){ return 418 - 35 + 56.5 * (i - 3 * d) })
      .attr("y", function(d,i){ return 299.5 - 50 - 58 * d })
      .attr("xlink:href", function(d,i){ return "img/stylist" + (i + 1) + ".svg" })
      .style("opacity", 1)
      .attr("transform", function(d){ return "translate(0,0)" })


  // add some initial particles to background animation

  for (var i=0; i<100; i++) {

    var rad = Math.random()
    var total_trans_duration = 5 * ( 0.3 + Math.random() * 0.4 ) / speed
    var initial_position_ratio = Math.random()

    var client_outline_n = -1
    if (Math.random() < 0.25) {
      client_outline_n = Math.floor(Math.random() * 3) + 4
    } else {
      client_outline_n = Math.floor(Math.random() * 3) + 1
    }

    d3.select("#intro-matching-background-animation").append("g")
      .html(detailed_client_outline_g(client_outline_n))
      .attr("class", "client-cycle-silhouette")
      .style("opacity", 1)
      .attr("transform", "translate(" + coord_x_client(rad) + "," + (-50 + (svg_px_height + 50) * initial_position_ratio) + ")")
      .transition().duration((1 - initial_position_ratio) * total_trans_duration).ease("linear")
        .attr("transform", "translate(" + coord_x_client(rad) + "," + (svg_px_height + 50) + ")")
        .remove()


  }
  for (var i=0; i<150; i++) {

    var rad = Math.random()
    var total_trans_duration = 5 * ( 0.3 + Math.random() * 0.4 ) / speed
    var initial_position_ratio = Math.random()

    d3.select("#intro-matching-background-animation").append("path")
      .attr("class", "inventory-cycle-silhouette")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 0.25)
      .style("opacity", 1)
      .attr("d", silhouette_outline_d(Math.floor(Math.random() * 14), coord_x_style(Math.random()), -50))
      .attr("transform", "translate(0," + ((svg_px_height + 50) * initial_position_ratio) + ") scale(2)")
      .transition().duration((1 - initial_position_ratio) * total_trans_duration).ease("linear")
        .attr("transform", "translate(0," + (svg_px_height + 50) + ") scale(2)")
        .remove()

  }

  // background animation interval function
  function intro_background_animation() {

    // check for updated page configuration
    svg_height = +d3.select("#intro-area").style("height").replace("px","")
    svg_width = +d3.select("#intro-area").select("svg").style("width").replace("px","")
    svg_px_height = 1526 * svg_height / svg_width

    // add some new particles
    for (var i=0; i<2; i++) {

      var client_rad = Math.random()

      var client_outline_n = -1
      if (Math.random() < 0.25) {
        client_outline_n = Math.floor(Math.random() * 3) + 4
      } else {
        client_outline_n = Math.floor(Math.random() * 3) + 1
      }

      d3.select("#intro-matching-background-animation").append("g")
        .html(detailed_client_outline_g(client_outline_n))
        .attr("class", "client-cycle-silhouette")
        .style("opacity", 1)
        .attr("transform", "translate(" + coord_x_client(client_rad) + "," + (-50 - 50 * Math.random()) + ")")
        .transition().duration(5 * ( 0.3 + Math.random() * 0.4 ) / speed).ease("linear")
          .attr("transform", "translate(" + coord_x_client(client_rad) + "," + (svg_px_height + 50) + ")")
          .remove()

    }

    for (var i=0; i<3; i++) {

      d3.select("#intro-matching-background-animation").append("path")
        .attr("class", "inventory-cycle-silhouette")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.25)
        .style("opacity", 1)
        .attr("d", silhouette_outline_d(Math.floor(Math.random() * 14), coord_x_style(Math.random()), -50 - 50 * Math.random()))
        .attr("transform", "translate(0,0) scale(2)")
        .transition().duration(5 * ( 0.3 + Math.random() * 0.4 ) / speed).ease("linear")
          .attr("transform", "translate(0," + (svg_px_height + 50) + ") scale(2)")
          .remove()

    }

  }

  // foreground animation interval function
  function client_style_match_animation(){

    // check for updated page configuration
    svg_height = +d3.select("#intro-area").style("height").replace("px","")
    svg_width = +d3.select("#intro-area").select("svg").style("width").replace("px","")
    svg_px_height = 1526 * svg_height / svg_width

    // client and style pair

    var client_outline_n = -1
    var style_outline_n = -1
    if (Math.random() < 0.25) {
      client_outline_n = Math.floor(Math.random() * 3) + 4
      style_outline_n = Math.floor(Math.random() * 6) + 7
    } else {
      client_outline_n = Math.floor(Math.random() * 3) + 1
      style_outline_n = Math.floor(Math.random() * 9)
      if (style_outline_n == 7) { style_outline_n = 10 }
      if (style_outline_n == 8) { style_outline_n = 13 }
    }

    d3.select("#intro-client" + client_outline_n)
      .attr("transform", "translate(-40," + (-1 * intro_foreground_top_padding) + ")")
      .style("opacity", 1)
      .transition().duration(duration/3)
        .attr("transform", "translate(-40,365)")
        .style("opacity", 1)
      .transition().delay(duration * 2/3).duration(duration/3)
        .attr("transform", "translate(-40," + (svg_px_height + 50) + ")")
      .transition().delay(duration).duration(0)
        .attr("transform", "translate(-40," + (-1 * intro_foreground_top_padding) + ")")
        .style("opacity", 1e-6)

    d3.select("#intro-matching-style").append("path")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 0.125)
      .style("opacity", 1)
      .attr("transform", "translate(150," + (-200 - 1 * intro_foreground_top_padding) + ") scale(4)")
      .attr("d", silhouette_outline_d(style_outline_n, 160, 0) )
      .transition().duration(duration/3)
        .attr("transform", "translate(150,265) scale(4)")
      .transition().delay(duration * 2/3).duration(duration/3)
        .attr("transform", "translate(150," + (svg_px_height + 50) + ") scale(4)")
        .remove()

    // underlay halos around data flow
    d3.select("#intro-matching-data").append("rect")
      .attr("class", "underlay-data-halo")
      .attr("x", 100)
      .attr("y", 300)
      .attr("height", 30)
      .attr("width", 280)
    d3.select("#intro-matching-data").append("rect")
      .attr("class", "underlay-data-halo")
      .attr("x", 380 + 168)
      .attr("y", 300)
      .attr("height", 30)
      .attr("width", 280)
    d3.select("#intro-matching-data").append("circle")
      .attr("class", "underlay-data-halo")
      .attr("cx", 80)
      .attr("cy", 315)
      .attr("r", 100)
    d3.select("#intro-matching-data").append("circle")
      .attr("class", "underlay-data-halo")
      .attr("cx", 830)
      .attr("cy", 315)
      .attr("r", 100)

    d3.selectAll(".underlay-data-halo")
      .attr("stroke", "none")
      .attr("fill", "rgb(249,248,246)")
      .style("opacity", 0)
      .transition().delay(duration/6).duration(duration/6)
        .style("opacity", 0.8)
      .transition().delay(duration * 2/3).duration(duration/6)
        .style("opacity", 0)
        .remove()

    // data flow

    var client_data = ""
    var style_data = ""
    for (var i=0; i<47; i++){
      client_data += Math.floor(Math.random() * 2)
      style_data += Math.floor(Math.random() * 2)
    }

    d3.select("#intro-matching-data").append("text")
      .attr("class", "intro-matching-data-client")
      .attr("x", 50)
      .attr("y", 320)
      .attr("fill", "#847c77")
      .text("")

    d3.select("#intro-matching-data").append("text")
      .attr("class", "intro-matching-data-style")
      .attr("x", 830)
      .attr("y", 320)
      .attr("text-anchor", "end")
      .attr("fill", "#847c77")
      .text("")

    var client_data_timer = d3.timer(function(t){
      if (t > duration) {
        d3.select(".intro-matching-data-client").remove()
        client_data_timer.stop()
      } else if ((t > duration / 3) && (t < duration / 2)) {
        d3.select(".intro-matching-data-client")
          .text(client_data.substring(0,Math.floor(client_data.length * (t - duration / 3) / (duration / 6) )))
      } else if ((t > duration / 2) && (t < duration * 2 / 3)) {
        d3.select(".intro-matching-data-client")
          .attr("x", 50 + 350 * ( t - duration / 2) / (duration / 6) )
          .text(client_data.substring(0,Math.floor(client_data.length * ( -t + duration * 2 / 3) / (duration / 6) )))
      } else {
        d3.select(".intro-matching-data-client").text("")
      }

    })

    var style_data_timer = d3.timer(function(t){
      if (t > duration) {
        d3.select(".intro-matching-data-style").remove()
        style_data_timer.stop()
      } else if ((t > duration / 3) && (t < duration / 2)) {
        d3.select(".intro-matching-data-style")
          .text(style_data.substring(0,Math.floor(style_data.length * (t - duration / 3) / (duration / 6) )))
      } else if ((t > duration / 2) && (t < duration * 2 / 3)) {
        d3.select(".intro-matching-data-style")
          .attr("x", 830 - 350 * ( t - duration / 2) / (duration / 6) )
          .text(style_data.substring(0,Math.floor(style_data.length * ( -t + duration * 2 / 3) / (duration / 6) )))
      } else {
        d3.select(".intro-matching-data-style").text("")
      }

    })

    // bar chart

    bars.forEach(function(d,i){ bars[i] = Math.random() })

    d3.select("#intro-matching-foreground-animation").selectAll(".bar")
        .data(bars)
      .transition().delay(duration/2).duration(duration/6)
        .attr("y", function(d,i){ return 302.5 - 45 * d })
        .attr("height", function(d){ return 45 * d })
      .transition().delay(duration * 2/3).duration(duration/3)
        .attr("y", 302.5)
        .attr("height", 0)

    // vector chart

    var c_x = 434.5 - 36.5 + Math.random() * (546.5 - 484.5 + 2 * 36.5)
    var c_y = 194.5 - 2 * 36.5 + Math.random() * (242.5 - 194.5 + 2 * 36.5)
    var s_x = 434.5 - 36.5 + Math.random() * (546.5 - 484.5 + 2 * 36.5)
    var s_y = 194.5 - 2 * 36.5 + Math.random() * (242.5 - 194.5 + 2 * 36.5)

    var client_color = Math.floor(Math.random() * 6)
    var style_color = Math.floor(Math.random() * 6)
    if (style_color == client_color) {
      style_color += 1
      if (style_color > 5) { style_color = 0 }
    }

    d3.select("#intro-c-vector").select("line")
      .transition().duration(0)
        .attr("x2", c_x)
        .attr("y2", c_y)
        .attr("stroke", color_palette(client_color))

    d3.select("#intro-s-vector").select("line")
      .transition().duration(0)
        .attr("x2", s_x)
        .attr("y2", s_y)
        .attr("stroke", color_palette(style_color))

    d3.select("#intro-dotted-vector").select("line")
      .transition().duration(0)
        .attr("x1", c_x)
        .attr("y1", c_y)
        .attr("x2", s_x)
        .attr("y2", s_y)

    d3.select("#intro-c-text")
      .transition().duration(0)
        .attr("transform", "translate(" + (c_x + 10) + "," + (c_y - 10) + ")")

    d3.select("#intro-s-text")
      .transition().duration(0)
        .attr("transform", "translate(" + (s_x + 10) + "," + (s_y - 10) + ")")

    d3.selectAll("#intro-vector-axes, #intro-c-vector, #intro-s-vector, #intro-dotted-vector, #intro-c-text, #intro-s-text")
      .transition().delay(duration*6.5/12).duration(duration/6)
        .style("opacity", 1)
      .transition().delay(duration*5/6).duration(duration/6)
        .style("opacity", 0)

    // stylist selection animation

    var selected_stylist = Math.floor(Math.random() * 6)

    d3.select("#intro-matching-foreground-animation").selectAll(".stylist")
      .transition().delay(duration/2).duration(duration/6)
        .style("opacity", function(d,i){ return (i == selected_stylist) ? 1 : 0 })
        .attr("transform", function(d,i){
            if (i == selected_stylist) {
              var dy = (i > 2) ? -70 - 70 : -128 - 70
              var dx = 56.5 - 56.5 * (i - 3 * d)
              return "translate(" + dx + "," + dy + ")"
            } else {
              return "translate(0,-70)"
            }
          })
      .transition().delay(duration * 5/6).duration(duration/3)
        .style("opacity", 1)
        .attr("transform", function(d){ return "translate(0,0)" })

  }

  // call the background and foreground animations on repeat

  animation_state.intro_matching_background_interval = setInterval(intro_background_animation, 700)
  intro_background_animation()

  animation_state.intro_matching_interval = setInterval(client_style_match_animation, duration + 200)
  client_style_match_animation()


}

function stop_intro_animation(){

  stop_animation_interval("intro_matching_background_interval")
  stop_animation_interval("intro_matching_interval")

  d3.select("#intro-matching-background-animation").selectAll(".client-cycle-silhouette")
    .transition().duration(0)
      .remove()

  d3.select("#intro-matching-background-animation").selectAll(".inventory-cycle-silhouette")
    .transition().duration(0)
      .remove()

  d3.selectAll("#intro-area-white-over")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

  d3.selectAll("#intro-title")
    .transition().duration(0)
      .attr("display", "none")
      .style("opacity", 0)


}

