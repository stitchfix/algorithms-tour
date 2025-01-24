
function move_info_circles(phase_name, progress) {

  var previous_phase = {
    'start': 'prestart',
    'swa': 'start',
    'to_algo': 'swa',
    'to_machines': 'to_algo',
    'to_matchmaking': 'to_machines',
    'to_humans': 'to_matchmaking',
    'to_logistics': 'to_humans'
  }

  var opacity = {
    'prestart': [0,-1,-1],
    'start': [0,2,2],
    'swa': [5,1,1],
    'to_algo': [1,1,1],
    'to_machines': [1,1,1],
    'to_matchmaking': [1,1,1],
    'to_humans': [1,1,1],
    'to_logistics': [1,1,1]
  }

  var x0 = [460, -100, -100]
  var x0b = [478, 375, 416]
  var x1 = [582, 375, 416]
  var x2 = [660, 557, 578]

  var minus_x_logistics = 260
  var x_to_machines = 17

  var x2b = [661 + x_to_machines, 558 + x_to_machines, 578 + x_to_machines]

  var x3 = [661 - minus_x_logistics, 558 - minus_x_logistics, 578 - minus_x_logistics]

  var translate_x = {
    'prestart': x0,
    'start': x0b,
    'swa': x1,
    'to_algo': x2,
    'to_machines': x2b,
    'to_matchmaking': x2b,
    'to_humans': x2,
    'to_logistics': x3
  }

  var y0 = [460,0,0]
  var y0b = [309, 320, 360]
  var y1 = [595, 320, 360]
  var y2 = [581, 443, 464]

  var s_to_algo = 57
  var s_to_machines = 151
  var s_to_matchmaking = 151
  var s_to_humans = 230
  var s_to_logistics = 360 + 45

  var translate_y = {
    'prestart': y0,
    'start': y0b,
    'swa': y1,
    'to_algo': [y2[0] - s_to_algo, y2[1] - s_to_algo, y2[2] - s_to_algo],
    'to_machines': [y2[0] - s_to_machines, y2[1] - s_to_machines, y2[2] - s_to_machines],
    'to_matchmaking': [y2[0] - s_to_matchmaking, y2[1] - s_to_matchmaking, y2[2] - s_to_matchmaking],
    'to_humans': [y2[0] - s_to_humans, y2[1] - s_to_humans, y2[2] - s_to_humans],
    'to_logistics': [y2[0] - s_to_logistics, y2[1] - s_to_logistics, y2[2] - s_to_logistics]
  }

  var bottom_scale = 0.25

  var scale = {
    'prestart': [1,1,1],
    'start': [0.2,0.5,0.5],
    'swa': [0.5,0.5,0.5],
    'to_algo': [bottom_scale,bottom_scale,bottom_scale],
    'to_machines': [bottom_scale,bottom_scale,bottom_scale],
    'to_matchmaking': [bottom_scale,bottom_scale,bottom_scale],
    'to_humans': [bottom_scale,bottom_scale,bottom_scale],
    'to_logistics': [bottom_scale,bottom_scale,bottom_scale]
  }

  var opacity_0 = Math.min(1, Math.max(0, (1-progress) * opacity[previous_phase[phase_name]][0] + progress * opacity[phase_name][0] ) )
  var opacity_1 = Math.min(1, Math.max(0, (1-progress) * opacity[previous_phase[phase_name]][1] + progress * opacity[phase_name][1] ) )
  var opacity_2 = Math.min(1, Math.max(0, (1-progress) * opacity[previous_phase[phase_name]][2] + progress * opacity[phase_name][2] ) )

  if (phase_name == 'start' || phase_name == 'swa') { progress = Math.max(0, -1 + progress * 2) }

  var translate_x_0 = ( (1-progress) * translate_x[previous_phase[phase_name]][0] + progress * translate_x[phase_name][0] )
  var translate_x_1 = ( (1-progress) * translate_x[previous_phase[phase_name]][1] + progress * translate_x[phase_name][1] )
  var translate_x_2 = ( (1-progress) * translate_x[previous_phase[phase_name]][2] + progress * translate_x[phase_name][2] )

  var translate_y_0 = ( (1-progress) * translate_y[previous_phase[phase_name]][0] + progress * translate_y[phase_name][0] )
  var translate_y_1 = ( (1-progress) * translate_y[previous_phase[phase_name]][1] + progress * translate_y[phase_name][1] )
  var translate_y_2 = ( (1-progress) * translate_y[previous_phase[phase_name]][2] + progress * translate_y[phase_name][2] )

  var scale_0 = ( (1-progress) * scale[previous_phase[phase_name]][0] + progress * scale[phase_name][0] )
  var scale_1 = ( (1-progress) * scale[previous_phase[phase_name]][1] + progress * scale[phase_name][1] )
  var scale_2 = ( (1-progress) * scale[previous_phase[phase_name]][2] + progress * scale[phase_name][2] )

  d3.select("#wh2")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", opacity_0 )
      .attr("transform","translate(" + translate_x_0 + "," + translate_y_0 + ") scale(" + scale_0 + ")")

  d3.select('#calendar')
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", opacity_1 )
      .attr("transform","translate(" + translate_x_1 + "," + translate_y_1 + ") scale(" + scale_1 + ")")

  d3.select('#profile')
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", opacity_2 )
      .attr("transform","translate(" + translate_x_2 + "," + translate_y_2 + ") scale(" + scale_2 + ")")

}

function fix_progression(phase_name, progress) {

  if (phase_name == 'to_matchmaking'){
    progress = Math.min(1, progress * 2)
  }

  if (phase_name == 'to_humans'){
    progress = Math.min(1, progress * 2)
  }

  if (phase_name == 'to_logistics'){
    progress = Math.max(0, -1 + 2 * progress)
  }

  move_info_circles(phase_name, progress)

}

