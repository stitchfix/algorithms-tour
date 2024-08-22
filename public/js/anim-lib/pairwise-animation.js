
function remove_simple_pairs_stuff(prefix){
  d3.select("#" + prefix + "-greenbox").transition().duration(200).style("opacity", 0)
  d3.select("#" + prefix + "-blueboxes").select("rect").remove()
  d3.select("#" + prefix + "-greenarrows").selectAll("path, polygon").remove()
}

function remove_complex_pairs_stuff(prefix){
  d3.select("#" + prefix + "-blueboxes").select("rect").remove()
  d3.select("#" + prefix + "-orangebox").select("rect").remove()
  d3.select("#" + prefix + "-greenarrows").selectAll("path, polygon").remove()
  d3.select("#" + prefix + "-orangearrows").selectAll("path, polygon").remove()
}

function scroll_through_simple_pairs(prefix, state_running_prop, interval_length, transition_length, bluebox_height, blueboxes, greenarrows, orangearrows){

  d3.select("#" + prefix + "-blueboxes").append("rect")
    .attr("fill", "#4B90A6")
    .attr("height", bluebox_height)
    .attr("opacity", 0.5)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("x", blueboxes[0].x)
    .attr("y", blueboxes[0].y)
    .attr("width", blueboxes[0].width)

  d3.select("#" + prefix + "-greenarrows").append("path")
    .attr("fill", "none")
    .attr("stroke", "#AA7CAA")
    .attr("stroke-width", "5")
    .attr("stroke-miterlimit", "10")
    .attr("d", greenarrows[0].d)

  d3.select("#" + prefix + "-greenarrows").append("polygon")
    .attr("fill", "#AA7CAA")
    .attr("points", greenarrows[0].points)

  var count = -1
  animation_state[state_running_prop] = setInterval(function(){
    if (count >= blueboxes.length - 1) {
      stop_animation_interval(state_running_prop)
      remove_simple_pairs_stuff(prefix)
    } else {
      count += 1
      d3.select("#" + prefix + "-blueboxes").select("rect")
        .transition().duration(transition_length)
          .attr("x", blueboxes[count].x)
          .attr("y", blueboxes[count].y)
      d3.select("#" + prefix + "-greenarrows").select("path")
        .transition().duration(transition_length)
          .attr("d", greenarrows[count].d)
      d3.select("#" + prefix + "-greenarrows").select("polygon")
        .transition().duration(transition_length)
          .attr("points", greenarrows[count].points)
    }

  }, interval_length)

}

function scroll_through_complex_pairs(prefix, state_running_prop, interval_length, transition_length, bluebox_height, blueboxes, greenarrows, orangearrows){

  d3.select("#" + prefix + "-blueboxes").append("rect")
    .attr("fill", "#4B90A6")
    .attr("height", bluebox_height)
    .attr("opacity", 0.5)
    .attr("x", blueboxes[1].x)
    .attr("y", blueboxes[1].y)
    .attr("width", blueboxes[1].width)

  d3.select("#" + prefix + "-orangebox").append("rect")
    .attr("fill", "#F3A54A")
    .attr("height", bluebox_height)
    .attr("opacity", 0.5)
    .attr("x", blueboxes[0].x)
    .attr("y", blueboxes[0].y)
    .attr("width", blueboxes[0].width)

  d3.select("#" + prefix + "-greenarrows").append("path")
    .attr("fill", "none")
    .attr("stroke", "#AA7CAA")
    .attr("stroke-width", "10")
    .attr("stroke-miterlimit", "10")
    .attr("d", greenarrows[1].d)

  d3.select("#" + prefix + "-greenarrows").append("polygon")
    .attr("fill", "#AA7CAA")
    .attr("points", greenarrows[1].points)

  d3.select("#" + prefix + "-orangearrows").append("path")
    .attr("fill", "none")
    .attr("stroke", "#F3A54A")
    .attr("stroke-width", "10")
    .attr("stroke-miterlimit", "10")
    .attr("d", orangearrows[0][0].d)

  d3.select("#" + prefix + "-orangearrows").append("polygon")
    .attr("fill", "#F3A54A")
    .attr("points", orangearrows[0][0].points)

  var current_orange_word = 0
  var count = 0
  animation_state[state_running_prop] = setInterval(function(){
    count += 1
    if (count == current_orange_word) { count += 1 }
    if (count >= blueboxes.length) {
      count = 0
      current_orange_word += 1
      if (current_orange_word >= blueboxes.length){
        current_orange_word = 0
        count = 1
      }
      d3.select("#" + prefix + "-orangebox").select("rect")
        .transition().duration(transition_length)
          .attr("x", blueboxes[current_orange_word].x)
          .attr("y", blueboxes[current_orange_word].y)
          .attr("width", blueboxes[current_orange_word].width)
    }
    d3.select("#" + prefix + "-blueboxes").select("rect")
      .transition().duration(transition_length)
        .attr("x", blueboxes[count].x)
        .attr("y", blueboxes[count].y)
        .attr("width", blueboxes[count].width)
    d3.select("#" + prefix + "-greenarrows").select("path")
      .transition().duration(transition_length)
        .attr("d", greenarrows[count].d)
    d3.select("#" + prefix + "-greenarrows").select("polygon")
      .transition().duration(transition_length)
        .attr("points", greenarrows[count].points)

    d3.select("#" + prefix + "-orangearrows").select("path")
      .transition().duration(transition_length)
        .attr("d", orangearrows[current_orange_word][count].d)
    d3.select("#" + prefix + "-orangearrows").select("polygon")
      .transition().duration(transition_length)
        .attr("points", orangearrows[current_orange_word][count].points)

  }, interval_length)


}
