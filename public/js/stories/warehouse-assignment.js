
// from http://bl.ocks.org/bycoffe/5575904
// from https://github.com/substack/point-in-polygon
var pointInPolygon = function (point, vs) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  var xi, xj, i, intersect,
      x = point[0],
      y = point[1],
      inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    xi = vs[i][0],
    yi = vs[i][1],
    xj = vs[j][0],
    yj = vs[j][1],
    intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// global variables ---

var map_vertices = d3.select("#swa-map-outline").select("polygon").attr("points")
                     .split(" ").map(function(d){
                       var x = (+d.split(",")[0]) * 0.5 + 280
                       var y = (+d.split(",")[1]) * 0.5 + 300
                       return [x, y]
                     })

var client1_dot_data = [{x: 450, y: 450}]

var hizzy_data = [{x: 300, y: 420},
                  {x: 490, y: 520},
                  {x: 560, y: 370},
                  {x: 630, y: 470},
                  {x: 670, y: 400}]

var many_clients_data = []
for (var i=0; i<2000; i++){
  var h = Math.floor(Math.random() * 6)
  if (h == 5) { h = 0 }
  var r = Math.pow(Math.random() * 8000, 0.56)
  var a = Math.random() * Math.PI * 2
  var x = hizzy_data[h].x + Math.sin(a) * r
  var y = hizzy_data[h].y + Math.cos(a) * r
  if (pointInPolygon([x,y], map_vertices)) {
    many_clients_data.push({h: h, x: x, y: y})
  }
}

var color_palette_warehouses = d3.scale.ordinal()
                      .range(["#52598B", "#F3A54A", "#AA7CAA", "#587868", "#4B90A6", "#CCDE66"])

// ---


function swa_0() {

  d3.selectAll(".hizzy_dot").remove()
  d3.selectAll(".hizzy_client1_line").remove()
  d3.selectAll(".client1_dot").remove()

  d3.select("#swa-map-outline").selectAll(".hizzy_dot").data(hizzy_data).enter().append("circle")
    .attr("class", "hizzy_dot")
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y - 200 })
    .attr("fill", function(d,i) { return color_palette_warehouses(i) })
    .attr("r", 3)
    .style("opacity", 0)

  d3.select("#swa-map-outline").selectAll(".hizzy_client1_line").data(hizzy_data).enter().append("line")
    .attr("class", "hizzy_client1_line")
    .attr("x1", function(d) { return d.x })
    .attr("y1", function(d) { return d.y - 200 })
    .attr("x2", client1_dot_data[0].x)
    .attr("y2", client1_dot_data[0].y - 200)
    .attr("stroke", function(d,i) { return color_palette_warehouses(i) })
    .attr("stroke-width", 0.5)
    .style("opacity", 0)

  d3.select("#swa-map-outline").selectAll(".client1_dot").data(client1_dot_data).enter().append("circle")
    .attr("class", "client1_dot")
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y - 200 })
    .attr("r", 3)
    .style("opacity",0)

  d3.select("#swa-cost1").transition().duration(0).attr("transform", "matrix(1 0 0 1 570 445)")
  d3.select("#swa-cost2").transition().duration(0).attr("transform", "matrix(1 0 0 1 650 520)")
  d3.select("#swa-cost3").transition().duration(0).attr("transform", "matrix(1 0 0 1 695 410)")
  d3.select("#swa-cost4").transition().duration(0).attr("transform", "matrix(1 0 0 1 770 430)").style("opacity", 1)
  d3.select("#swa-cost5").transition().duration(0).attr("transform", "matrix(1 0 0 1 750 495)").style("opacity", 1)

  d3.selectAll(".many_clients_dot").remove()

  d3.select("#swa-cost-calc")
    .style("opacity", 0)

  d3.select("#swa-cost-matrix-top-line")
    .style("opacity", 0)

}

function swa_0_progress(progress) {

  d3.select("#swa-map-outline").selectAll(".hizzy_dot")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, Math.min(1, -1 + 4 * progress)))

  d3.select("#swa-map-outline").selectAll(".hizzy_client1_line")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity",  Math.max(0, Math.min(1, -2 + 4 * progress)))

  d3.select("#swa-cost-calc")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, Math.min(1, -1 + 4 * progress)))

  d3.select("#swa-cost-matrix-top-line")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity",  Math.max(0, Math.min(1, -2 + 4 * progress)))


  var progress2 = Math.min(1, progress * 4)

  d3.select("#client1")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.min(1, 2 - progress * 4))
      .attr("transform", "translate(" + (422*progress2) + "," + (195*progress2) + ") scale(" + (1 - 0.9 * progress2) + ")")

  d3.select("#swa-map-outline").selectAll(".client1_dot")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, - 1 + progress * 4))


}


function swa_1() {

  d3.selectAll(".hizzy_dot").remove()
  d3.selectAll(".hizzy_client1_line").remove()
  d3.selectAll(".client1_dot").remove()

  d3.select("#swa-map-outline").selectAll(".many_clients_dot").data(many_clients_data).enter().append("circle")
    .attr("class", "many_clients_dot")
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y - 200 })
    .attr("r", 1)
    .style("opacity", 1e-6)

  d3.select("#swa-map-outline").selectAll(".hizzy_dot").data(hizzy_data).enter().append("circle")
    .attr("class", "hizzy_dot")
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y - 200 })
    .attr("fill", function(d,i) { return color_palette_warehouses(i) })
    .attr("r", 3)

  d3.selectAll(".cost_mat_o").style("opacity", 1e-6)

}

function swa_1_progress(progress) {

  var progress2 = Math.min(1, progress * 3)

  d3.select("#swa-cost1")
    .transition().duration(0)
      .attr("transform", "matrix(1 0 0 1 " + (570 * (1-progress2) + progress2 * 316.3404) + " " + (445 * (1-progress2) + progress2 * 355.7868) + ")")

  d3.select("#swa-cost2")
    .transition().duration(0)
      .attr("transform", "matrix(1 0 0 1 " + (650 * (1-progress2) + progress2 * 364.56) + " " + (520 * (1-progress2) + progress2 * 355.7868) + ")")

  d3.select("#swa-cost3")
    .transition().duration(0)
      .attr("transform", "matrix(1 0 0 1 " + (695 * (1-progress2) + progress2 * 412.7801) + " " + (410 * (1-progress2) + progress2 * 355.7868) + ")")

  d3.select("#swa-cost4")
    .transition().duration(0)
      .attr("transform", "matrix(1 0 0 1 " + (770 * (1-progress2) + progress2 * 461.0002) + " " + (430 * (1-progress2) + progress2 * 355.7868) + ")")
      .style("opacity", 1 - progress2)

  d3.select("#swa-cost5")
    .transition().duration(0)
      .attr("transform", "matrix(1 0 0 1 " + (750 * (1-progress2) + progress2 * 509.1) + " " + (495 * (1-progress2) + progress2 * 355.7868) + ")")
      .style("opacity", 1 - progress2)

  d3.select("#swa-map-outline").selectAll(".many_clients_dot")
    .transition().duration(0)
      .style("opacity",  Math.max(0, Math.min(1, -1 + 4 * progress)))

  d3.select("#swa-map-outline").selectAll(".hizzy_dot")
    .transition().duration(500)
      .attr("r", 3 + 2 * Math.min(1, progress * 4))

  d3.selectAll(".cost_mat_o")
    .transition().duration(0)
      .style("opacity",  Math.max(0, Math.min(1, -2 + 4 * progress)))

}


function swa_2() {

  d3.select("#swa-cost1").transition().duration(0).attr("transform", "matrix(1 0 0 1 316.3404 355.7868)")
  d3.select("#swa-cost2").transition().duration(0).attr("transform", "matrix(1 0 0 1 364.56 355.7868)")
  d3.select("#swa-cost3").transition().duration(0).attr("transform", "matrix(1 0 0 1 412.7801 355.7868)")
  d3.select("#swa-cost4").transition().duration(0).attr("transform", "matrix(1 0 0 1 461.0002 355.7868)")
  d3.select("#swa-cost5").transition().duration(0).attr("transform", "matrix(1 0 0 1 509.1 355.7868)")

  d3.selectAll("#swa-cost4, #swa-cost5")
    .style("opacity", 0)

}


function swa_3(progress){

  d3.select("#swa-assignment-matrix")
    .transition().duration(0)
      .style("opacity", progress)

  d3.select("#swa-map-outline").selectAll(".many_clients_dot").data(many_clients_data)
    .transition().duration(0)
      .attr("r", 1 + progress * 0.5)
      .style("fill", function(d){
          var interp = d3.interpolateRgb("#000", color_palette_warehouses(d.h))
          return interp(progress)
        })
}


function swa_4(){

  d3.selectAll(".hizzy_dot_selected").remove()
  d3.selectAll(".hizzy_client1_line").remove()
  d3.selectAll(".client1_dot").remove()

  d3.select("#swa-map-outline").selectAll(".hizzy_dot_selected").data([hizzy_data[1]]).enter().append("circle")
    .attr("class", "hizzy_dot_selected")
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y - 200 })
    .attr("fill", function(d,i) { return color_palette_warehouses(1) })
    .attr("r", 6)
    .style("opacity", 0)

  d3.select("#swa-map-outline").selectAll(".hizzy_client1_line").data([hizzy_data[1]]).enter().append("line")
    .attr("class", "hizzy_client1_line")
    .attr("x1", function(d) { return d.x })
    .attr("y1", function(d) { return d.y - 200 })
    .attr("x2", client1_dot_data[0].x)
    .attr("y2", client1_dot_data[0].y - 200)
    .attr("stroke", function(d,i) { return color_palette_warehouses(1) })
    .attr("stroke-width", 0.5)
    .style("opacity", 0)

  d3.select("#swa-map-outline").selectAll(".client1_dot").data(client1_dot_data).enter().append("circle")
    .attr("class", "client1_dot")
    .attr("cx", function(d) { return d.x })
    .attr("cy", function(d) { return d.y - 200 })
    .attr("r", 3)
    .style("opacity", 0)

}


function swa_4_progress(progress){

  d3.select("#swa-map-outline").selectAll(".hizzy_dot")
    .style("opacity", 1 - progress)

  d3.select("#swa-map-outline").selectAll(".many_clients_dot")
    .style("opacity", 1 - progress)

  d3.select("#swa-map-outline").selectAll(".hizzy_dot_selected")
    .style("opacity", progress)

  d3.select("#swa-map-outline").selectAll(".hizzy_client1_line")
    .style("opacity", progress)

  d3.select("#swa-map-outline").selectAll(".client1_dot")
    .style("opacity", progress)

}

