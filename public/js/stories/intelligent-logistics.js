
// global variables ---

var other_wh_logistics = []

for (var x=209; x<370; x=x+10) {
  if ((x != 319) && (x != 329) && (x != 239) && (x != 229)) {
    other_wh_logistics.push( {x: x, y: 145 } )
    other_wh_logistics.push( {x: x, y: 185 } )
    other_wh_logistics.push( {x: x, y: 205 } )
    other_wh_logistics.push( {x: x, y: 245 } )
    other_wh_logistics.push( {x: x, y: 265 } )
  }
}


var wh_logistics = [
  {x: 209 , y: 145 },
  {x: 269 , y: 145 },
  {x: 249 , y: 205 },
  {x: 299 , y: 205 },
  {x: 339 , y: 245 }
]

var persisted_lines_data = [
  {t: 9000, x1: 200, x2: wh_logistics[0].x, y1: wh_logistics[0].y + 20, y2: wh_logistics[0].y + 20 },
  {t: 9500, x1: wh_logistics[0].x, x2: wh_logistics[1].x, y1: wh_logistics[0].y + 20, y2: wh_logistics[0].y + 20 },
  {t: 10000, x1: wh_logistics[1].x, x2: wh_logistics[2].x - 15, y1: wh_logistics[0].y + 20, y2: wh_logistics[0].y + 20 },
  {t: 10500, x1: wh_logistics[2].x - 15, x2: wh_logistics[2].x - 15, y1: wh_logistics[0].y + 20, y2: wh_logistics[2].y + 20 },
  {t: 11000, x1: wh_logistics[2].x - 15, x2: wh_logistics[2].x, y1: wh_logistics[2].y + 20, y2: wh_logistics[2].y + 20 },
  {t: 11500, x1: wh_logistics[2].x, x2: wh_logistics[3].x, y1: wh_logistics[2].y + 20, y2: wh_logistics[2].y + 20 },
  {t: 12000, x1: wh_logistics[3].x, x2: wh_logistics[4].x, y1: wh_logistics[2].y + 20, y2: wh_logistics[2].y + 20 },
  {t: 13000, x1: wh_logistics[4].x, x2: 375, y1: wh_logistics[2].y + 20, y2: wh_logistics[2].y + 20 },
]


var logistics_fix_elements = {
  'note':       {type: 'note_path', fill: "none", stroke: "#000", dx: 70, dy: 10,
                  progression: [
                    {t: 5000, x: 455, y: 190, i: 'linear'},
                    {t: 6000, x: 455, y: 190, i: 'linear'},
                    {t: 13000, x: 455, y: 190, i: 'linear'},
                    {t: 14000, x: 455, y: 230, a: -56, i: 'circular'},
                    {t: 15000, x: 455, y: 530, a: 60, i: 'circular'},
                    {t: 15000, x: 444.4, y: 555.6, i: 'linear'},
                    {t: 16500, x: 367, y: 545, i: 'linear'},
                    {t: 19000, x: 367, y: 545, i: 'linear'},
                  ]
                },
  'picker':   {type: 'circle', fill: "#000", r: 3,
                  progression: [
                    {t: 8500, cx: 200, cy: wh_logistics[0].y + 20, i: 'linear'},
                    {t: 9000, cx: wh_logistics[0].x, cy: wh_logistics[0].y + 20, i: 'linear'},
                    {t: 9500, cx: wh_logistics[1].x, cy: wh_logistics[1].y + 20, i: 'linear'},
                    {t: 10000, cx: wh_logistics[2].x - 15, cy: wh_logistics[1].y + 20, i: 'linear'},
                    {t: 10500, cx: wh_logistics[2].x - 15, cy: wh_logistics[2].y + 20, i: 'linear'},
                    {t: 11000, cx: wh_logistics[3].x, cy: wh_logistics[3].y + 20, i: 'linear'},
                    {t: 11500, cx: wh_logistics[3].x, cy: wh_logistics[4].y - 20, i: 'linear'},
                    {t: 12000, cx: wh_logistics[4].x, cy: wh_logistics[4].y - 20, i: 'linear'},
                    {t: 13000, cx: 375, cy: wh_logistics[4].y - 20, i: 'linear'},
                  ]
                },
  'feedback':   {type: 'circle', fill: color_palette(5), r: 5,
                  progression: [
                    {t: 18000, cx: 400, cy: 620, i: 'linear'},
                    {t: 19500, cx: 700, cy: 580, i: 'linear'},
                  ]
                }
}

var copy_selected_items = JSON.parse(JSON.stringify(selected_items))
copy_selected_items.sort(function (a, b) {
  return a.rank - b.rank
})

for (var i=0; i<5; i++){

  logistics_fix_elements['selection' + i] = {
    type: 'path', fill: "#58595b", stroke: "none", form_n: copy_selected_items[i].sil_n,
    dx: 0, dy: 0,
    progression: [
      {t: 5000, x: 385 + i*15, y: 200, i: 'linear'},
      {t: 6000, x: 385 + i*15, y: 200, i: 'linear'},
      {t: 7000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
    ]
  }
}


for (var i=0; i<other_wh_logistics.length; i++){

  logistics_fix_elements['other_styleoutline' + i] = {
    type: 'path', fill: "none", stroke: "#777", form_n: Math.floor(Math.random()*7),
    dx: 0, dy: 0,
    progression: [
      {t: 5500, x: other_wh_logistics[i].x - 10, y: other_wh_logistics[i].y - 10, i: 'linear'},
      {t: 14000, x: other_wh_logistics[i].x - 10, y: other_wh_logistics[i].y - 10, i: 'linear'},
    ]
  }
}


var i = 0
  logistics_fix_elements['styleoutline' + i] = {
    type: 'path', fill: "#fff", stroke: "#000", form_n: copy_selected_items[0].sil_n,
    dx: outline_locs[i].dx, dy: outline_locs[i].dy,
    progression: [
      {t: 7000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 8500, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 9000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10 + 20, i: 'linear'},
                    {t: 9500, x: wh_logistics[1].x - 10, y: wh_logistics[1].y + 20 - 10, i: 'linear'},
                    {t: 10000, x: wh_logistics[2].x - 15 - 10, y: wh_logistics[1].y + 20 - 10, i: 'linear'},
                    {t: 10500, x: wh_logistics[2].x - 15 - 10, y: wh_logistics[2].y + 20 - 10, i: 'linear'},
                    {t: 11000, x: wh_logistics[3].x - 10, y: wh_logistics[3].y + 20 - 10, i: 'linear'},
                    {t: 11500, x: wh_logistics[3].x - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
                    {t: 12000, x: wh_logistics[4].x - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
                    {t: 13000, x: 375 - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
      {t: 14000, x: outline_locs[i].dx + 385, y: outline_locs[i].dy + 220, a: -56, i: 'circular'},
      {t: 15000, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 15800, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 17000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 18000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 18000, x: 324, y: 572, i: 'linear'},
      {t: 19000, x: 248, y: 620, i: 'linear'},
      {t: 20000, x: 248, y: 620, i: 'linear'},
    ]
  }

var i = 2
  logistics_fix_elements['styleoutline' + i] = {
    type: 'path', fill: "#fff", stroke: "#000", form_n: copy_selected_items[2].sil_n,
    dx: outline_locs[i].dx, dy: outline_locs[i].dy,
    progression: [
      {t: 7000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 10000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 10500, x: wh_logistics[i].x - 10, y: wh_logistics[i].y + 20 - 10, i: 'linear'},
                    {t: 11000, x: wh_logistics[3].x - 10, y: wh_logistics[3].y + 20 - 10, i: 'linear'},
                    {t: 11500, x: wh_logistics[3].x - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
                    {t: 12000, x: wh_logistics[4].x - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
                    {t: 13000, x: 375 - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
      {t: 14000, x: outline_locs[i].dx + 385, y: outline_locs[i].dy + 220, a: -56, i: 'circular'},
      {t: 15000, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 15800, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 17000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 18000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 18000, x: 294, y: 602, i: 'linear'},
      {t: 19000, x: 228, y: 620, i: 'linear'},
      {t: 20000, x: 228, y: 620, i: 'linear'},
    ]
  }


var i = 4
  logistics_fix_elements['styleoutline' + i] = {
    type: 'path', fill: "#fff", stroke: "#000", form_n: copy_selected_items[4].sil_n,
    dx: outline_locs[i].dx, dy: outline_locs[i].dy,
    progression: [
      {t: 7000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 11500, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 12000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 20 - 10, i: 'linear'},
                    {t: 13000, x: 375 - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
      {t: 14000, x: outline_locs[i].dx + 385, y: outline_locs[i].dy + 220, a: -56, i: 'circular'},
      {t: 15000, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 15800, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 17000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 18000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 18000, x: 354, y: 602, i: 'linear'},
      {t: 19000, x: 268, y: 620, i: 'linear'},
      {t: 20000, x: 268, y: 620, i: 'linear'},
    ]
  }



var i = 1
  logistics_fix_elements['styleoutline' + i] = {
    type: 'path', fill: "#fff", stroke: "#000", form_n: copy_selected_items[1].sil_n,
    dx: outline_locs[i].dx, dy: outline_locs[i].dy,
    progression: [
      {t: 7000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 9000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 9500, x: wh_logistics[i].x - 10, y: wh_logistics[i].y + 20 - 10, i: 'linear'},
                    {t: 10000, x: wh_logistics[2].x - 15 - 10, y: wh_logistics[1].y + 20 - 10, i: 'linear'},
                    {t: 10500, x: wh_logistics[2].x - 15 - 10, y: wh_logistics[2].y + 20 - 10, i: 'linear'},
                    {t: 11000, x: wh_logistics[3].x - 10, y: wh_logistics[3].y + 20 - 10, i: 'linear'},
                    {t: 11500, x: wh_logistics[3].x - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
                    {t: 12000, x: wh_logistics[4].x - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
                    {t: 13000, x: 375 - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
      {t: 14000, x: outline_locs[i].dx + 385, y: outline_locs[i].dy + 220, a: -56, i: 'circular'},
      {t: 15000, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 15800, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 17000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 18000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 19000, x: 385, y: 520, a: 260, i: 'circular'},
    ]
  }


var i = 3
  logistics_fix_elements['styleoutline' + i] = {
    type: 'path', fill: "#fff", stroke: "#000", form_n: copy_selected_items[3].sil_n,
    dx: outline_locs[i].dx, dy: outline_locs[i].dy,
    progression: [
      {t: 7000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 10500, x: wh_logistics[i].x - 10, y: wh_logistics[i].y - 10, i: 'linear'},
      {t: 11000, x: wh_logistics[i].x - 10, y: wh_logistics[i].y + 20 - 10, i: 'linear'},
                    {t: 11500, x: wh_logistics[3].x - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
                    {t: 12000, x: wh_logistics[4].x - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
                    {t: 13000, x: 375 - 10, y: wh_logistics[4].y - 20 - 10, i: 'linear'},
      {t: 14000, x: outline_locs[i].dx + 385, y: outline_locs[i].dy + 220, a: -56, i: 'circular'},
      {t: 15000, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 15800, x: 385, y: 520, a: 60, i: 'circular'},
      {t: 17000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 18000, x: 385, y: 520, a: 85, i: 'circular'},
      {t: 19000, x: 385, y: 520, a: 260, i: 'circular'},
    ]
  }


// ---


function draw_warehouse_animation_lines(){

  d3.select("#logistics-dist-function").append("line")
    .attr("x1", 324 + 112)
    .attr("x2", 324 + 112)
    .attr("y1", 110)
    .attr("y2", 282)
    .style("fill", "none")
    .style("stroke", "#000")
    .style("stroke-width", "0.5")
    .style("stroke-linecap", "round")
    .style("stroke-dasharray", "4,4")

  d3.select("#logistics-dist-function").append("line")
    .attr("x1", 234 + 112)
    .attr("x2", 234 + 112)
    .attr("y1", 110)
    .attr("y2", 282)
    .style("fill", "none")
    .style("stroke", "#000")
    .style("stroke-width", "0.5")
    .style("stroke-linecap", "round")
    .style("stroke-dasharray", "4,4")

  d3.select("#logistics-dist-function").append("path")
    .attr("d","M289.3,350.8c0.4-0.4,0.4-0.3,0.5-0.7c0.2-0.7,0.3-1.5,0.3-2.3c0-0.5,0-2.5-1.1-2.5c-0.5,0-1,0.3-1.2,0.7c-0.1,0.2-0.1,0.2-0.2,0.2c-0.1,0-0.1-0.1-0.1-0.2c0-0.4,0.7-2,2-2c1,0,1.2,1,1.2,3.1c0,0.9-0.1,1.8-0.2,2.7c0.5-0.4,3-2.1,3-4.3c0-0.6-0.2-0.8-0.2-1c0-0.3,0.4-0.5,0.7-0.5c0.2,0,0.5,0.1,0.5,0.6c0,0.5-0.2,1.2-0.4,1.8c-0.8,2-2.9,3.7-3.8,4.3c-0.5,2.4-1.2,3.3-2,3.9c-0.1,0.1-0.4,0.3-0.6,0.3c-0.3,0-0.4-0.2-0.4-0.5C287.2,353.7,287.6,352.2,289.3,350.8z")
    .attr("transform", "translate(55,-250)")

  d3.select("#logistics-dist-function").append("path")
    .attr("d","M294.1,355.8L294.1,355.8c0.8,0,0.8-0.1,0.9-0.4l1.1-4.3c-0.4,0.3-0.9,0.4-1,0.4c0,0-0.1,0-0.1-0.1c0-0.2,0.1-0.2,0.1-0.2c0.3,0,0.9-0.1,1.6-1c0.1-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.1,0.1c0,0,0,0.1,0,0.1l-1.3,5.2c0,0,0,0.1,0,0.2c0,0.1,0.1,0.1,0.3,0.2c0.1,0,0.3,0,0.4,0h0.1c0.1,0,0.2,0,0.2,0.1c0,0.2-0.1,0.2-0.2,0.2c-0.4,0-0.8,0-1.2,0c-0.4,0-0.8,0-1.2,0c0,0-0.1,0-0.1-0.1C293.9,355.8,294,355.8,294.1,355.8z")
    .attr("transform", "translate(55,-250)")

  d3.select("#logistics-dist-function").append("path")
    .attr("d","M289.3,350.8c0.4-0.4,0.4-0.3,0.5-0.7c0.2-0.7,0.3-1.5,0.3-2.3c0-0.5,0-2.5-1.1-2.5c-0.5,0-1,0.3-1.2,0.7c-0.1,0.2-0.1,0.2-0.2,0.2c-0.1,0-0.1-0.1-0.1-0.2c0-0.4,0.7-2,2-2c1,0,1.2,1,1.2,3.1c0,0.9-0.1,1.8-0.2,2.7c0.5-0.4,3-2.1,3-4.3c0-0.6-0.2-0.8-0.2-1c0-0.3,0.4-0.5,0.7-0.5c0.2,0,0.5,0.1,0.5,0.6c0,0.5-0.2,1.2-0.4,1.8c-0.8,2-2.9,3.7-3.8,4.3c-0.5,2.4-1.2,3.3-2,3.9c-0.1,0.1-0.4,0.3-0.6,0.3c-0.3,0-0.4-0.2-0.4-0.5C287.2,353.7,287.6,352.2,289.3,350.8z")
    .attr("transform", "translate(145,-250)")

  d3.select("#logistics-dist-function").append("path")
    .attr("d","M294.9,355.3c0.4-0.5,0.8-0.7,1.2-1c0.9-0.6,1.7-1.3,1.7-2.7c0-0.8-0.4-1-0.8-1c-1.1,0-1.8,1.8-1.8,2.4c0,0.3,0.1,0.3,0.2,0.3c0.6,0,0.9-1,0.9-1.3c0-0.1,0-0.2-0.1-0.3c0,0,0,0,0-0.1c0-0.1,0-0.1,0.1-0.1c0.1,0,0.2,0.3,0.2,0.5c0,0.4-0.4,1.5-1.1,1.5c-0.4,0-0.5-0.4-0.5-0.6c0-0.6,0.8-2.5,2.1-2.5c0.7,0,1.5,0.5,1.5,1.6c0,1.2-0.8,1.8-2.3,2.6c-0.3,0.2-1,0.6-1.4,1.4c0,0,0.1,0,0.2,0c0.3,0,0.7,0.1,1,0.2c0.1,0,0.5,0.1,0.8,0.1c0.6,0,1-0.6,1.1-1c0-0.1,0-0.2,0.2-0.2c0.1,0,0.1,0,0.1,0.1c0,0.1-0.4,1.7-1.5,1.7c-0.4,0-0.7-0.2-0.9-0.4c-0.2-0.2-0.5-0.3-0.8-0.3c-0.3,0-0.4,0.3-0.5,0.6c0,0.1,0,0.1-0.2,0.1c0,0-0.1,0-0.1-0.1C294.1,356.8,294.2,356.1,294.9,355.3z")
    .attr("transform", "translate(145,-250)")

  d3.select("#logistics-fix-sim").selectAll(".persisted-line")
      .data(persisted_lines_data)
    .enter().append("line")
      .attr("class", "persisted-line")
      .attr("x1", function(d){ return d.x1 })
      .attr("x2", function(d){ return d.x2 })
      .attr("y1", function(d){ return d.y1 })
      .attr("y2", function(d){ return d.y2 })
      .style("fill", "none")
      .style("stroke", "#777")
      .style("opacity", 0)

}

function logistics_fix_sim(t) {

  var icycle_center = {x: 289 - 10, y: 380.5}
  var icycle_radius = 190.8

  var sim_number = 0

  d3.select("#logistics-fix-sim").selectAll(".persisted-line")
    .style("opacity", function(d){
        if (d.t < t) { return 1 }
        else { return 0 }
      })

  if (t > 14000) {
    d3.select("#logistics-fix-sim").selectAll(".persisted-line")
      .style("opacity", 0)
  }

  if ((t > 17000) && (t < 18000)) {
    d3.selectAll("#icycle2vec-greenbox, #icycle2vec-blueboxes, #icycle2vec-greenarrows")
      .attr("display", "block")
      .style("opacity", 1)
    if (!animation_state.icycle2vec_animation_interval) { start_icycle2vec_animation() }
  } else {
    stop_animation_interval("icycle2vec_animation_interval")
    remove_simple_pairs_stuff("icycle2vec")
  }

  if (t > 18500) {
    d3.select("#icycle-closet")
      .attr("display", "block")
      .style("opacity", Math.min(1, (t-1850) / 200))
  } else {
    d3.select("#icycle-closet")
      .attr("display", "none")
      .style("opacity", 0)
  }


  Object.keys(logistics_fix_elements).forEach(function(el_name){
    var el = logistics_fix_elements[el_name]
    var i = -1 + el.progression.findIndex(function(d){ return t <= d.t })

    if (i <= -1) {
      // remove element(s)
      d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
        .remove()
    }
    if (i > -1) {
      // add element(s) if necessary
      if (el.type == "circle") {
        d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .data([el])
          .enter().append("circle")
            .attr("class", "logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("r", el.r)
            .attr("fill", el.fill)
            .attr("cx", 0)
            .attr("cy", 0)
      }
      if (el.type == "path") {
        var tx = el.progression[0].x
        var ty = el.progression[0].y
        d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .data([el])
          .enter().append("path")
            .attr("class", "logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("fill", el.fill)
            .attr("stroke", el.stroke)
            .attr("d", silhouette_outline_d(el.form_n, tx + el.dx, ty + el.dy))
      }
      if (el.type == "note_path") {
        var tx = el.progression[0].x
        var ty = el.progression[0].y
        d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .data([el])
          .enter().append("path")
            .attr("class", "logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("stroke-miterlimit", "10")
            .attr("d", stylist_note_d(390, 183, 10, 10))

      }
      // move element(s)
      var dt = (t - el.progression[i].t) / (el.progression[i+1].t - el.progression[i].t)
      if (el.type == "circle") {
        if (el.progression[i].i == "linear") {
          var de = d3.easePoly(dt, 1.5)
          d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("cx", el.progression[i].cx * (1-de) + el.progression[i+1].cx * de )
            .attr("cy", el.progression[i].cy * (1-de) + el.progression[i+1].cy * de )
        }
        if (el.progression[i].i == "circular") {
          var de = d3.easePoly(dt, 1)
          var da = el.progression[i].a * (1-de) + el.progression[i+1].a * de
          d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("cx", el.dx + icycle_center.x + icycle_radius * Math.cos(da * (Math.PI/180)) )
            .attr("cy", el.dy + icycle_center.y + icycle_radius * Math.sin(da * (Math.PI/180)) )
        }
      }
      if (el.type == "path") {
        if (el.progression[i].i == "linear") {
          var de = d3.easePoly(dt, 1.5)
          var tx = el.progression[i].x * (1-de) + (el.progression[i+1].x) * de
          var ty = el.progression[i].y * (1-de) + (el.progression[i+1].y) * de
          d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("d", silhouette_outline_d(el.form_n, tx, ty))
        }
        if (el.progression[i].i == "circular") {
          var de = d3.easePoly(dt, 1)
          var da = el.progression[i].a * (1-de) + el.progression[i+1].a * de
          var tx = el.dx + icycle_center.x + icycle_radius * Math.cos(da * (Math.PI/180))
          var ty = el.dy + icycle_center.y + icycle_radius * Math.sin(da * (Math.PI/180))
          d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("d", silhouette_outline_d(el.form_n, tx, ty))
        }
      }
      if (el.type == "note_path") {
        if (el.progression[i].i == "linear") {
          var de = d3.easePoly(dt, 1.5)
          var tx = el.progression[i].x * (1-de) + (el.progression[i+1].x) * de - 455.5
          var ty = el.progression[i].y * (1-de) + (el.progression[i+1].y) * de - 189
          d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("transform", "translate(" + tx + "," + ty + ")")
        }
        if (el.progression[i].i == "circular") {
          var de = d3.easePoly(dt, 1)
          var da = el.progression[i].a * (1-de) + el.progression[i+1].a * de
          var tx = el.dx + icycle_center.x + icycle_radius * Math.cos(da * (Math.PI/180)) - 455.5
          var ty = el.dy + icycle_center.y + icycle_radius * Math.sin(da * (Math.PI/180)) - 189
          d3.select("#logistics-fix-sim").selectAll(".logistics-fix-sim-" + el_name + "-" + sim_number)
            .attr("transform", "translate(" + tx + "," + ty + ")")
        }
      }
    }
  })

}
