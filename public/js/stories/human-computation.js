
function hcomp_labs_map_point(pt, t){

  var entry_point = [525, 380]
  var entry_ramp_dx = 100
  var speed = 0.5

  var scale = 0.8
  var x2 = 10 + scale * Math.min((entry_point[0] / scale) + entry_ramp_dx, Math.max(pt[0], pt[0] + (entry_point[0] / scale) - (t * speed)))
  var y2 = scale * pt[1] + 50

  if (x2 > 425) {
    y2 = entry_point[1] + Math.sin(Math.PI * 0.5 * (-1) * ((x2-625)/200)) * (y2 - entry_point[1])
  }

  return [x2, y2]
}

function hcomp_labs_map_path(original_path_d, map, t){
  var d = original_path_d

  var ds = d.split(" ")
  var ds2 = []
  ds.forEach(function(p){
    if (p == "z") {
      ds2.push(p)
    } else {
      var leading = ""
      if (!p[0].match(/[0-9\-]/)) {
        leading = p[0]
        p = p.substring(1)
      }
      var pt1 = [ +p.split(",")[0], +p.split(",")[1] ]
      var pt2 = map(pt1, t)
      ds2.push(leading + pt2[0] + "," + pt2[1])
    }

  })
  return ds2.join(" ")
}


function show_hcomp_labs() {

  var paths = d3.selectAll("#stylist-ui-sketch-background > path, #stylist-ui-sketch-lines > path").data(hcomp_labs_paths_d)

  // animate
  var timer = d3.timer(function(t){
    if (t > 2000) { timer.stop() }
    paths
      .attr("d", function(d){ return hcomp_labs_map_path(d, hcomp_labs_map_point, t) })
  })

}

function hide_hcomp_labs() {

  var paths = d3.selectAll("#stylist-ui-sketch-background > path, #stylist-ui-sketch-lines > path").data(hcomp_labs_paths_d)

  // animate
  var timer = d3.timer(function(t){
    if (t > 2000) { timer.stop() }
    paths
      .attr("d", function(d){ return hcomp_labs_map_path(d, hcomp_labs_map_point, 1500 - t) })
  })

}

function show_hcomp_labs_flat() {

  var paths = d3.selectAll("#stylist-ui-sketch-background > path, #stylist-ui-sketch-lines > path").data(hcomp_labs_paths_d)

  paths
    .attr("d", function(d){ return hcomp_labs_map_path(d, hcomp_labs_map_point, 0) })

}


