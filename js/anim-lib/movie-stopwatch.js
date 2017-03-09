
function run_movie_stopwatch(duration, repeat) {

  function draw_stopwatch_arc(angle){

    var r = 7.4
    var cx = 23.8
    var cy = 24.1

    var px = r * Math.sin(angle)
    var py = -1 * r * Math.cos(angle)

    var d = "M" + cx + "," + cy + " "
    d += "l" + px + "," + py + " "
    if (angle < Math.PI) {
      d += "A " + r + " " + r + " 0 " + "0 0" + " " + (cx) + " " + (cy - r) + " "
    } else {
      d += "A " + r + " " + r + " 0 " + "0 0" + " " + (cx) + " " + (cy + r) + " "
      d += "A " + r + " " + r + " 0 " + "0 0" + " " + (cx) + " " + (cy - r) + " "
    }

    d3.select("#stopwatch-path")
      .transition().duration(0)
        .attr("d", d)

  }

  function stopwatch_single_turn(duration){
    stop_animation_timer("movie_stopwatch_timer")
    animation_state.movie_stopwatch_timer = d3.timer(function(t){
      if (t > duration) { stop_animation_timer("movie_stopwatch_timer") }
      else { draw_stopwatch_arc(t * 2 * Math.PI / duration) }
    })
  }

  stop_animation_timer("movie_stopwatch_timer")
  stop_animation_interval("movie_stopwatch_interval")

  var count = 1
  animation_state.movie_stopwatch_interval = setInterval(function(){
    stopwatch_single_turn(duration)
    count += 1
    if (count >= repeat) { stop_animation_interval("movie_stopwatch_interval") }
  },duration)
  stopwatch_single_turn(duration)

}
