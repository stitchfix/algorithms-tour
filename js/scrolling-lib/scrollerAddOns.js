
// highlight desired groups in the svg, turn others off

function highlight_svg_groups(group_names) {

  d3.select("#vis").select("svg").selectAll("svg > g")
    .transition().duration(0)
      .attr("display", function(){
          if (group_names.indexOf(this.id) > -1) {
            return "block"
          } else {
            return "none"
          }
        })
      .style("opacity",function(){
          if (group_names.indexOf(this.id) > -1) {
            return 1
          } else {
            return 1e-6
          }
        })

}

// smoothly change the footer

function update_footer(html_text) {
  if (html_text != page_state.current_footer) {
    d3.select("#footer")
      .style("opacity", 1)
      .transition()
        .duration(500)
        .style("opacity", 1e-6)
    setTimeout(function(){
      d3.select("#footer")
        .html(html_text)
        .transition()
          .duration(500)
          .style("opacity", 1)
    }, 500)
    page_state.current_footer = html_text

  }
}

// topic button behaviors

function highlight_topics(topic_names) {

  if (topic_names.length == 1) {

    // highlight topic button
    d3.selectAll(".topic")
      .transition().duration(0)
        .style("opacity",function(){
          if (topic_names.indexOf(this.id.replace("-topic","")) > -1) {
            return 0.8
          } else {
            return 0.25
          }
        })

    // update url
    if (!(page_state.current_highlighted_topic == topic_names[0])) {
      var url_hash = "#" + topic_names[0].replace(/_/g, "-")
      history.replaceState({}, "", url_hash)
      page_state.current_highlighted_topic = topic_names[0]
    }

  } else {

    // un-highlight all topic buttons
    d3.selectAll(".topic")
      .transition().duration(0)
        .style("opacity", 0.25)

    // update url
    if (!(page_state.current_highlighted_topic == "")) {
      history.replaceState({}, "", " ")
    }

  }

}

function hide_topics() {
  d3.selectAll('.topic')
    .transition().duration(0)
      .style("display", "none")
      .style("opacity", 1e-6)
  page_state.topic_buttons_on = false
}

function show_topics() {
  d3.selectAll('.topic')
    .style("display", "block")
    .transition().duration(500)
      .style("opacity", 0.25)
  page_state.topic_buttons_on = true
}

function topic_buttons_config_on_load(){

  // override standard <a> behaviour to stay highlighted on mouseout if is current topic
  d3.selectAll(".topic").on("mouseout", function(){
    if (page_state.topic_buttons_on && (this.id == page_state.current_highlighted_topic)) {
      d3.select(this)
        .transition().duration(0)
          .style("opacity", 0.8)
    }
  })

  d3.selectAll('.topic').style("display", "none")

}

// functions for stopping animations and keeping track of the overall animation state

function stop_animation_interval(interval_name){
  clearInterval(animation_state[interval_name])
  animation_state[interval_name] = false
}

function stop_animation_timer(timer_name){
  if (animation_state[timer_name] != false){
    animation_state[timer_name].stop()
  }
  animation_state[timer_name] = false
}

function stop_force_animation(force){
  if (animation_state[force] != false){
    animation_state[force].stop()
  }
  animation_state[force] = false
}
