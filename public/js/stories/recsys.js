
// global variables ---

var boxSize = 20,
    boxSpacing = 35,
    numBoxesX = 10,
    numBoxesY = 5,
    matrix_x_start = 50,
    matrix_y_start = 380

var algo_scores = {'a1': [], 'a2': [], 'a3': [], 'a4': []}
var rule_filter = []
var global_algo_scores = []

for (var i=0; i<numBoxesY; i++){
    for (var j=0; j<numBoxesX; j++){
        var a_score = [Math.random(), Math.random(), Math.random(), Math.random()]
        algo_scores['a1'].push(a_score[0])
        algo_scores['a2'].push(a_score[1])
        algo_scores['a3'].push(a_score[2])
        algo_scores['a4'].push(a_score[3])
        if ( (i == 0 ) && ( j == 0 || j == 2 || j == 4) )  {
          rule_filter.push(true)
          global_algo_scores.push(a_score.reduce(function(a, b) { return a + b }, 0))
        } else if (Math.random() < 0.2 || ( (i == 0 ) && ( j == 1 || j == 3) ) ) {
          rule_filter.push(false)
          global_algo_scores.push(0)
        } else {
          rule_filter.push(true)
          global_algo_scores.push(a_score.reduce(function(a, b) { return a + b }, 0))
        }
    }
}

var pin_opacities = {'a1': [], 'a2': [], 'a3': [], 'a4': []}
for (var k=1; k<5; k++){
  for (var j=0; j<rule_filter.length; j++){
    pin_opacities['a' + k].push( algo_scores['a' + k][j] * rule_filter[j] )
  }
}

var global_algo_scores_sorted = global_algo_scores.slice().sort(function(a,b){return b-a})
var global_algo_scores_ranks = global_algo_scores.slice().map(function(v){ return global_algo_scores_sorted.indexOf(v)+1 })
var stylist_selection = [3,7,11,14,18]

var algo_positions = d3.zip(global_algo_scores, global_algo_scores_ranks).map(function(d,i){
    var selected_opacity = 1e-6
    var selected_x = 450
    var selected_y = 250 + (d[1]) * (boxSize + boxSpacing)
    if (stylist_selection.indexOf(d[1]) > -1) {
        selected_x = 643 + stylist_selection.indexOf(d[1]) * 1.05 * (10 + 5)
        selected_y = 378
        selected_opacity = 1
    }
    var sil_n = Math.floor(Math.random() * 7)
    if (i == 0) { sil_n = 0 }
    if (i == 2) { sil_n = 2 }
    if (i == 4) { sil_n = 6 }
    return {algo_score: d[0], rank: d[1],
            sil_n: sil_n,
            matrix_x: matrix_x_start + (i%numBoxesX) * (boxSize + boxSpacing),
            matrix_y: matrix_y_start + Math.floor(i/numBoxesX) * (boxSize + boxSpacing),
            line_x: 450,
            line_y: 250 + (d[1]) * (boxSize + boxSpacing),
            selected_x: selected_x,
            selected_y: selected_y,
            selected_opacity: selected_opacity }
})

var selected_items = []
algo_positions.forEach(function(d){
  if (stylist_selection.indexOf(d.rank) > -1) {
    selected_items.push(d)
  }
})

// ---



function draw_algo_vis_boxes(){

  var svg = d3.select('#animation-zone-algo-vis')

  // add "inventory" label
  svg.append('text')
      .attr("class","inventory-text-on-vis")
      .attr('x', 50)
      .attr('y', 360)
      .style('fill','#847c77')
      .text('inventory')

  // draw arcs

  var arc = d3.svg.arc()

  var arc_colors = ["#F3A54A", "#AA7CAA", "#CCDE66", "#4B90A6"]
  var arc_inner_radius = [180, 210, 242, 274]
  var arc_outer_radius = [210, 242, 274, 305]

  var boxes_g = svg.append('g')

  for (var k=0; k<4; k++){

    algo_positions.forEach(function(d,i){

      var score = 0.7 * algo_scores['a' + (k+1)][i]
      var startAngle = Math.random() * 2 * Math.PI
      var endAngle = startAngle + score * 2 * Math.PI

      boxes_g.append("path")
          .datum({
              startAngle: startAngle,
              endAngle: endAngle,
              innerRadius: arc_inner_radius[k] / 12.5,
              outerRadius: arc_outer_radius[k] / 12.5
            })
          .attr('class', 'algo_pin ap' + (k+1))
          .style("fill", arc_colors[k])
          .attr("d", arc)
          .attr("transform", "translate(" + (d.matrix_x + boxSize / 2) + "," + (d.matrix_y + boxSize / 2) + ")")
          .attr('opacity', 1e-6)

    })

  }

  // draw clothing silhouettes
  for (var k=0; k<1; k++) {
      boxes_g.selectAll('.algo_box.a' + (k+1))
          .data(algo_positions).enter().append('path')
        .attr('class', 'algo_box a' + (k+1))
        .attr('fill', '#58595b')
        .attr('d', function(d){
            return silhouette_outline_d(d.sil_n,d.matrix_x,d.matrix_y)
          })
  }

  // for tweening to circle
  boxes_g.selectAll('.algo_box.big')
      .data(selected_items)
    .enter().append('path')
      .attr('class', 'algo_box big')
      .attr("fill", "#58595b")
      .attr('d', function(d){
          return silhouette_outline_d(d.sil_n, d.selected_x, d.selected_y)
        })
      .attr('opacity', 0)

}

function filter_algo_vis_boxes(svg, rule_filter){
    for (var k=0; k<1; k++) {
        svg.selectAll('.algo_box.a' + (k+1))
            .data(rule_filter)
          .transition().duration(500)
            .attr('opacity', function(d) { return Number(d) })
    }

    for (var k=0; k<4; k++) {
          svg.selectAll('.algo_pin.ap' + (k+1))
            .attr('opacity', 1e-6)
    }

}

function undo_filter_algo_vis_boxes(svg){
    for (var k=0; k<1; k++) {
        svg.selectAll('.algo_box.a' + (k+1))
          .attr('opacity', 1)
    }

    for (var k=0; k<1; k++) {
          svg.selectAll('.algo_pin.ap' + (k+1))
            .attr('opacity', 1e-6)
    }

}


function color_boxes_by_algo_score(svg, algo_scores, algos_include){

  for (var k=0; k<4; k++) {
      if (algos_include[k]) {
          svg.selectAll('.algo_pin.ap' + (k+1))
              .data(rule_filter)
            .attr('opacity', function(d){ return Number(d) })

      } else {
          svg.selectAll('.algo_pin.ap' + (k+1))
            .attr('opacity', 1e-6)
      }
  }

}

function algo_legend_labels(legend_opacities){

  d3.selectAll('.algo-name-text-1').style('opacity', legend_opacities[0])
  d3.selectAll('.algo-name-text-2').style('opacity', legend_opacities[1])
  d3.selectAll('.algo-name-text-3').style('opacity', legend_opacities[2])
  d3.selectAll('.algo-name-text-4').style('opacity', legend_opacities[3])

}

function move_algo_boxes(svg, progress){

  for (var k=0; k<1; k++) {
      svg.selectAll('.algo_box.a' + (k+1))
          .data(algo_positions)
        .attr('d', function(d){
            var x = (progress * d.line_x) + ((1-progress) * d.matrix_x)
            var y = (progress * d.line_y) + ((1-progress) * d.matrix_y)
            return silhouette_outline_d(d.sil_n,x,y)
          })
  }

  for (var k=0; k<4; k++) {
      svg.selectAll('.algo_pin.ap' + (k+1))
          .data(algo_positions)
        .attr("transform", function(d){
            var x = (progress * d.line_x) + ((1-progress) * d.matrix_x)
            var y = (progress * d.line_y) + ((1-progress) * d.matrix_y)
            return "translate(" + (x + boxSize / 2) + "," + (y + boxSize / 2) + ")"
          })

      if (progress > 0) {
        svg.selectAll('.algo_pin.ap' + (k+1))
            .data(pin_opacities['a' + (k+1)])
          .attr('opacity', function(d) { return d * Math.max(0,1-progress) })
      }

  }

  svg.selectAll('.algo_box.big')
      .data(selected_items)
    .attr("opacity", 0)

}

function stylist_select_algo_boxes(svg, progress){

    for (var k=0; k<1; k++) {
        svg.selectAll('.algo_box.a' + (k+1))
            .data(algo_positions)
          .transition().duration(0)
          .attr("opacity", Math.min(1,2-progress*2))
          .attr('d', function(d){
              var x = (progress * d.selected_x) + ((1-progress) * d.line_x)
              var y = (progress * d.selected_y) + ((1-progress) * d.line_y)
              return silhouette_outline_d(d.sil_n,x,y)
            })
    }

    for (var k=0; k<4; k++) {
        svg.selectAll('.algo_pin.ap' + (k+1))
          .attr('opacity', 0)
    }

    svg.selectAll('.algo_box.big')
        .data(selected_items)
      .attr("opacity", Math.max(0,-1 + progress*2))
      .attr("d", function(d){
        var x = (progress * d.selected_x) + ((1-progress) * d.line_x)
        var y = (progress * d.selected_y) + ((1-progress) * d.line_y)
        return silhouette_outline_d(d.sil_n, x, y)
      })

}

function move_to_logistics(progress){

  d3.selectAll('.algo_box.big')
    .transition().duration(0)
      .attr("d", function(d){
        var x = ((1-progress) * d.selected_x) + (progress * (d.selected_x - 260) )
        var y = ((1-progress) * d.selected_y) + (progress * 201)
        return silhouette_outline_d(d.sil_n, x, y)
      })

  var x = progress * (-260)
  var y = progress * (189 - 365)

  d3.selectAll(".stylist_note_dot")
    .transition().duration(0)
      .attr("d", stylist_note_tween(1))
      .attr("transform", "translate(" + x + "," + y + ")")

}

function stylist_note_tween(progress) {

  var x = 24.3 + progress * (658 - 10 - 24.3)
  var y = 295.3 + progress * (365 - 5 - 295.3)
  var width = (390.2 - 34.3 + 40) * (1 - progress) + 10 * (progress)
  var height = 82.8 * (1 - progress) + 10 * (progress)

  return stylist_note_d(x, y, width, height)

}

function stylist_note_d(x, y, width, height) {

  var rel_height = (height - 12.7 ) / (82.8 - 12.7)
  var curve = 0.4 + rel_height * 0.4 *2
  var ear = 4.1 + rel_height * 4.1 * 2

  var x0 = x + width - ear
  var y0 = y

  var h1 = width - ear - curve
  var v1 = height - ear - curve
  var h2 = width - 2 * curve
  var v2 = height - 2 * curve

  var c1 = curve
  var c2 = curve / 2
  var c3 = curve / 4

  var out_str = "M" + x0 + "," + y0 + " "
  out_str += "v" + (ear - c3) + " c0," + c3 + "," + c3 + "," + c3 + "," + c3 + "," + c3 + " h" + (ear - c3) + " l-" + ear + ",-" + ear + " "
  out_str += "h-" + h1 + " c-" + c2 + ",0,-" + c1 + "," + c2 + ",-" + c1 + "," + c1 + " "
  out_str += "v" + v2 + " c0," + c2 + "," + c2 + "," + c1 + "," + c1 + "," + c1 + " "
  out_str += "h" + h2 + " c" + c2 + ",0," + c1 + ",-" + c2 + "," + c1 + ",-" + c1 + " "
  out_str += "v-" + v1

  return out_str
}

function stylist_note_typing_animation(progress){

  var text_val = "Have fun at the wedding! Since it's outdoors be sure to layer."

  var text_progress = Math.max(0, Math.min( text_val.length + 1, Math.floor((-0.5 + progress * 2.5) * text_val.length)))

  var note_animation_progress = Math.max(0, -3 + 4 * progress)

  d3.select("#stylist-note-animation").select("text")
    .text(text_val.substring(0,text_progress))
    .style("opacity", 1 - note_animation_progress)

  d3.select("#stylist-note-animation")
    .attr("transform", "translate(" + (note_animation_progress * 660) + "," + (note_animation_progress * 367) + ") scale(" + (1 - note_animation_progress) + ")")

  d3.select(".stylist_note_dot")
    .transition().duration(0)
      .attr("d", stylist_note_tween(note_animation_progress))

}

function add_stylist_note(){

  d3.select('#animation-zone-algo-vis').append("g").append("path")
    .attr("class", "stylist_note_dot")
    .attr("d", stylist_note_d(34.3, 295.3, 390.2 - 34.3, 82.8))
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("stroke-miterlimit", "10")
    .style("opacity", 1e-6)
}

function animate_nn() {

  d3.selectAll("#conv-nn-cosine-sim, #conv-nn-pinned-image, #conv-nn-pinned-vector-label, #conv-nn-pinned-vector, #conv-nn-pinned-nodes-1, #conv-nn-pinned-nodes-2, #conv-nn-pinned-nodes-3, #conv-nn-pinned-nodes-4, #conv-nn-pinned-edges-1, #conv-nn-pinned-edges-2, #conv-nn-pinned-edges-3, #conv-nn-inv-image, #conv-nn-inv-vector-label, #conv-nn-inv-vector, #conv-nn-inv-nodes-1, #conv-nn-inv-nodes-2, #conv-nn-inv-nodes-3, #conv-nn-inv-nodes-4, #conv-nn-inv-edges-1, #conv-nn-inv-edges-2, #conv-nn-inv-edges-3")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1e-6)

  var anim_steps = [
    'conv-nn-pinned-image',
    'conv-nn-pinned-nodes-1',
    'conv-nn-pinned-edges-1',
    'conv-nn-pinned-nodes-2',
    'conv-nn-pinned-edges-2',
    'conv-nn-pinned-nodes-3',
    'conv-nn-pinned-edges-3',
    'conv-nn-pinned-nodes-4',
    'conv-nn-pinned-vector',
    'conv-nn-pinned-vector-label',
    'conv-nn-inv-image',
    'conv-nn-inv-nodes-1',
    'conv-nn-inv-edges-1',
    'conv-nn-inv-nodes-2',
    'conv-nn-inv-edges-2',
    'conv-nn-inv-nodes-3',
    'conv-nn-inv-edges-3',
    'conv-nn-inv-nodes-4',
    'conv-nn-inv-vector',
    'conv-nn-inv-vector-label',
    'conv-nn-cosine-sim'
  ]

  for (var i=0; i<8; i++) {
    d3.select("#" + anim_steps[i])
      .transition().duration(0)
        .attr("display", "block")
        .style("opacity", 0.2)
  }

  for (var i=10; i<18; i++) {
    d3.select("#" + anim_steps[i])
      .transition().delay(5000).duration(0)
        .style("opacity", 0.2)
  }

  for (var i=0; i<anim_steps.length; i++) {
    var delay = 500 * i
    if (i == 9 || i == 19) { delay = delay - 500 }
    d3.select("#" + anim_steps[i])
      .transition().delay(delay).duration(1000)
        .attr("display", "block")
        .style("opacity", 1)

    if (i == 1 || i == 3 || i == 5 || i == 7 || i == 11 || i == 13 || i == 15 || i == 17) {
      d3.select("#" + anim_steps[i]).selectAll("circle")
        .transition().delay(delay).duration(1000)
          .style("opacity", function(d,i) { return 0.2 + 0.8 * Math.random() })
    }

    if (i == 2 || i == 4 || i == 6 || i == 12 || i == 14 || i == 16) {
      d3.select("#" + anim_steps[i]).selectAll("line")
        .transition().delay(delay).duration(1000)
          .style("opacity", function(d,i) { return 0.2 + 0.8 * Math.random() })
    }

    if (i == 8 || i == 18) {
      d3.select("#" + anim_steps[i]).selectAll("text")
        .transition().delay(delay).duration(0)
          .text(function(d,i) { return (10 + 90 * Math.random()).toFixed(0) })
    }

  }

}


function start_lda2vec_animation(){

  var interval_length = 350
  var transition_length = 200
  var bluebox_height = 51

  var blueboxes = [
    {x:"48", y:"114.8", width:"26.6"},
    {x:"74.4", y:"114.8", width:"110.1"},
    {x:"184.3", y:"114.8", width:"231.1"},
    {x:"415.3", y:"114.8", width:"56.5"},
    {x:"471.7", y:"114.8", width:"110.1"},
    {x:"581.6", y:"114.8", width:"55.2"},
    {x:"636.7", y:"114.8", width:"38.1"},
    {x:"104", y:"174.3", width:"144.7"},
    {x:"249.3", y:"174.3", width:"181.5"},
    {x:"431.3", y:"174.3", width:"186.2"}
  ]

  var greenarrows = [
    {d:"M286,57c-52.5,6.3-109,16.8-189.7,46.8", points:"70,114 101.4,84.6 98.4,103.2 113,115"},
    {d:"M284,74c-41.8,5.1-69,2.2-112,26", points:"148,115 173.4,80.3 173.9,99.1 190.4,108.1"},
    {d:"M328,79c-23.9,2.5-43.8-1.2-50.5,25", points:"275,125 266.9,93.8 278.1,102.4 291.1,97.1"},
    {d:"M388,81c50.1-7.8,87.5-27.5,71.6,16.3", points:"448,123 449.2,80 460.2,95.2 478.9,93.1"},
    {d:"M482,75c20-9.2,53.9-10,43.8,25.3", points:"514,126 515,83 526.1,98.2 544.8,96"},
    {d:"M487,61c38.7-2.5,71.9,1.8,95.9,33.5", points:"597,119 562.6,93.2 581.4,93 590.5,76.5"},
    {d:"M490,46c39.5-2.5,106.7,14.1,141.3,51.5", points:"647,121 610.9,97.7 629.6,96.1 637.5,79.1"},
    {d:"M491,64c35.3,28.9-131.4,85.7-227.3,105.9", points:"236,175 272.1,151.6 265.8,169.3 278.1,183.6"},
    {d:"M480,78c34.8,28.5-25.1,53.1-93.8,87.2", points:"361,178 389.1,145.5 388.1,164.3 403.8,174.5"},
    {d:"M432,84c31.8,26.1,47.6,36.9,68.1,67", points:"515,175 480,150.1 498.8,149.4 507.4,132.7"}
  ]

  var orangearrows = [
  [
    {},
    {d:"M67,166c14.5,20.5,29,38.8,42.9,9", points:"117,155 118,187.2 109.1,176.3 95.2,178.7"},
    {d:"M67,166c34.8,17.8,142.2,12,187.3,1.8", points:"274,160 250.3,181.8 252.7,167.9 241.8,159"},
    {d:"M67,166c45.2,16.5,267.5,20.1,346.5,4.8", points:"440,161 407.7,189.4 411.3,171 397.1,158.7"},
    {d:"M67,166c20.7,19,342.3,18.6,438.4,1.4", points:"532,158 499.4,186 503.2,167.6 489.1,155.1"},
    {d:"M67,166c22,15.9,407.5,23.2,514.5,2.8", points:"608,159 575.8,187.4 579.3,169 565.1,156.7"},
    {d:"M67,166c25.3,22.7,447,15.7,559.6,0.9", points:"654,160 619,185 624.5,167 611.5,153.3"},
    {d:"M67,166c6.1,7.8,10.3,12.1,13.5,14.6", points:"95,196 65.5,183 79.2,179.6 83.1,166.1"},
    {d:"M67,166c11.2,11.2,145.2,7,197.4,11.1", points:"285,182 253.2,187.6 262.8,177.2 258.4,163.7"},
    {d:"M67,166c26.7,34.4,306.1,0.7,396.1,10.4", points:"490,185 447.2,189.4 460.9,176.5 456.4,158.2"}
  ],
  [
    {d:"M117,166c-14.5,20.5-29,38.8-42.9,9", points:"67,155 88.8,178.7 74.9,176.3 66,187.2"},
    {},
    {d:"M132,164c32.7,16.7,92,13.8,123,5.3", points:"274,160 252,183.6 253.3,169.5 241.8,161.4"},
    {d:"M158,164c45.7,16.7,205,21.7,262.9,6.1", points:"440,161 417.8,184.4 419.2,170.3 407.8,162.1"},
    {d:"M168,163c20.3,18.6,257.1,20.8,337.7,5.3", points:"532,158 500.2,187 503.5,168.4 489,156.4"},
    {d:"M173,162c21.7,15.6,316.6,26,408.8,7.5", points:"608,159 576.4,188.2 579.6,169.6 565,157.7"},
    {d:"M173,162c24.9,22.3,355.5,18.8,453.7,5.4", points:"654,160 619.5,185.6 624.6,167.5 611.4,154.1"},
    {d:"M146,157c7.7,10,13.4,13.8,17.7,15.3", points:"182,183 150,178.8 162.2,171.7 162.1,157.6"},
    {d:"M160,159c10.2,10.2,72.4,11.4,105,15.9", points:"285,182 252.8,184.4 263.4,175 260.4,161.2"},
    {d:"M160,159c26.1,33.7,228.6,7,303.4,16.4", points:"490,185 447.1,187.9 461.2,175.4 457.3,157"}
  ],
  [
    {d:"M264,160c-15.7,14-123.6,30.1-174.1,11.6", points:"67,155 109.1,163.9 92.1,172 90.8,190.8"},
    {d:"M274,164c-31.5,16.1-75.3,14-100.4,6.2", points:"155,160 187.1,162.9 175.2,170.5 175.9,184.5"},
    {},
    {d:"M330,164c41.4,15.1,71.2,20.6,93.2,10", points:"440,161 423.1,188.5 421.6,174.5 408.7,168.8"},
    {d:"M360,162c19.6,18,113.7,21.3,154.3,7.6", points:"532,158 512.9,184 512.6,169.9 500.2,163.2"},
    {d:"M360,162c20.8,15,162.3,25.1,222.8,9.7", points:"608,159 579,190.7 580.6,172 565.1,161.3"},
    {d:"M378,161c23.5,21.1,184.7,19.8,249.4,8.5", points:"654,160 621.4,188 625.2,169.6 611.1,157.1"},
    {d:"M337,160c-53.3,31.8-83.6-6.5-119,6.7", points:"200,178 219.5,152.3 219.6,166.4 231.9,173.3"},
    {d:"M359,159c1.1,1.1,2.1,2.1,2.9,3", points:"365,183 346.6,156.5 360,160.8 370.4,151.2"},
    {d:"M381,162c28.5-0.7,58.9,5.8,82.5,13.3", points:"490,185 447,186.9 461.4,174.7 458,156.2"}
  ],
  [
    {d:"M435,161c-16.4,14.7-261.9,30.9-343.4,7.8", points:"67,155 109.8,159.1 93.9,169.1 94.7,187.9"},
    {d:"M429,163c-34.3,17.5-170.1,12.8-229,3.1", points:"173,158 215.7,153.2 202.2,166.3 206.9,184.5"},
    {d:"M440,164c-41.4,15.1-71.2,20.6-93.2,10", points:"330,161 361.3,168.8 348.4,174.5 346.9,188.5"},
    {},
    {d:"M458,160c17.6,16.1,42.1,21.5,59.1,13", points:"532,158 518.4,187.2 515.3,173.5 501.8,169.4"},
    {d:"M456,161c20.9,15,97,25.9,134.8,10.4", points:"608,159 590.1,185.8 589.2,171.8 576.5,165.7"},
    {d:"M458,160c22.3,20,121.8,20.5,169.9,10.9", points:"654,160 622.9,189.7 625.8,171.1 611,159.4"},
    {d:"M439,159c-54.4,32.5-135.9-1.3-184.7,16.3", points:"236,186 256.2,160.9 255.9,175 268,182.3"},
    {d:"M444,159c-19.5,29.2-14.6,2.7-59.2,16.5", points:"365,183 388.8,161.2 386.4,175.1 397.2,184.1"},
    {d:"M454,158c24.3-0.6,29.3,5.2,34.1,12", points:"504,184 473.8,172.8 487.2,168.6 490.3,154.8"}
  ],
  [
    {d:"M492,161c-16.6,14.8-308.1,32-398,8.2", points:"69,156 111.9,159 96.2,169.4 97.5,188.1"},
    {d:"M503,162c-35.4,18.1-229.8,13.2-302.6,3", points:"173,158 215.5,151.6 202.5,165.2 207.8,183.2"},
    {d:"M516,163c-33.9,16.2-85,15.7-120,6", points:"370,158 413,157.9 398.1,169.4 400.8,188"},
    {d:"M532,160c-17.6,16.1-42.1,21.5-59.1,13", points:"458,158 488.2,169.4 474.7,173.5 471.6,187.2"},
    {},
    {d:"M544,160c19.4,13.9,33.3,24.9,49.3,14.3", points:"608,159 595.2,188.6 591.7,174.9 578.1,171.2"},
    {d:"M544,160c21.5,19.3,67.1,20.4,92.5,12", points:"654,160 635.4,186.3 634.8,172.2 622.3,165.7"},
    {d:"M519,161c-55.2,33-201.8-3.9-264.2,15.2", points:"236,186 257.4,161.9 256.4,176 268.2,183.8"},
    {d:"M535,160c-19,28.5-67.7,1.9-123,12.6", points:"385,181 418.5,154.1 414.1,172.4 427.8,185.3"},
    {d:"M544,160c28.9-0.7,45.8,6.5,41.1,15", points:"567,186 583.4,158.2 585.1,172.2 598.1,177.6"}
  ],
  [
    {d:"M605,160c-16.8,15-404.6,34.8-510.5,10", points:"69,158 112,159.2 96.8,170.3 98.8,189"},
    {d:"M601,159c-36.4,18.6-311.3,15-400.4,5", points:"173,158 215.2,149.9 202.8,164 208.8,181.8"},
    {d:"M601,159c-36.1,17.2-148.7,18.3-204.1,7.7", points:"370,158 412.8,154.1 399,166.9 403.3,185.2"},
    {d:"M596,160c-19.2,17.6-87.5,22.4-120.8,10.4", points:"458,158 489.6,164.5 476.9,170.7 476,184.8"},
    {d:"M608,160c-19.4,13.9-33.3,24.9-49.3,14.3", points:"544,159 573.9,171.2 560.3,174.9 556.8,188.6"},
    {},
    {d:"M608,163c7,33,22.9,27.6,34.5,14.8", points:"654,160 647.4,191.6 641.2,178.9 627.2,177.9"},
    {d:"M605,160c-55.9,33.3-274.9-3.9-349.9,16.9", points:"236,186 258.2,162.6 256.8,176.7 268.2,184.9"},
    {d:"M601,159c-19.3,28.9-119.9,1.8-188.9,14.1", points:"385,181 419,154.7 414.3,172.9 427.7,186.1"},
    {d:"M601,159c-3,2.7-5.6,5.2-7.8,7.3", points:"579,182 590.3,151.8 594.4,165.3 608.2,168.3"}
  ],
  [
    {d:"M652,167c-16.9,15.1-446.6,26.3-558.4-1", points:"68,154 111,155.2 95.8,166.2 97.9,184.9"},
    {d:"M652,167c-36.8,18.8-354.8,9.1-451.4-2.9", points:"173,158 215.3,150.1 202.7,164.1 208.7,182"},
    {d:"M652,167c-36.8,17.6-189.4,12.7-255.1-0.5", points:"370,158 412.8,153.9 399.1,166.8 403.4,185"},
    {d:"M652,167c-19.9,18.2-131.3,17.9-176.2,2.4", points:"458,158 489.9,163 477.5,169.8 477.3,183.9"},
    {d:"M652,167c-20.4,14.7-64.2,21.4-92,5.9", points:"544,159 574.8,168.6 561.5,173.5 559.2,187.4"},
    {d:"M654,163c-7,33-22.9,27.6-34.5,14.8", points:"608,160 634.8,177.9 620.8,178.9 614.6,191.6"},
    {},
    {d:"M652,167c-56.1,33.5-315.3-10-396.7,10.3", points:"236,186 258.8,163.2 257,177.2 268.2,185.6"},
    {d:"M654,163c-19.4,29.2-163.1-1.8-241.7,10.6", points:"385,181 419.5,155.3 414.4,173.4 427.6,186.8"},
    {d:"M654,163c-36.1,33.1-40.2,18-54.2,14.9", points:"579,182 606.8,165.7 601.5,178.8 610.3,189.9"}
  ],
  [
    {d:"M99,218c-14.9-8.9-17.6-9.6-27.9-26.6", points:"57,167 91.1,193.2 72.3,193.2 63,209.6"},
    {d:"M154,183c-6.5-3.9-10.7-6.3-13.7-8.3", points:"126,159 155.5,172 141.8,175.4 137.9,189"},
    {d:"M208,180c5-4.3,21.7-6.5,38.5-11.8", points:"266,160 242.9,182.5 244.9,168.5 233.8,159.9"},
    {d:"M241,184c19.8-12.7,125.2,0.3,174.9-9", points:"441,162 412,193.8 413.6,175 398.1,164.4"},
    {d:"M244,186c5.7-18.8,171.5,1.1,235.9-10", points:"505,163 476,194.7 477.6,176 462.1,165.3"},
    {d:"M244,186c31-15.9,252.6,11,325.7-7", points:"593,163 567.9,197.9 567.3,179.1 550.6,170.3"},
    {d:"M244,186c54.8-11,297.3,8.6,375-10.1", points:"643,161 616.4,194.8 616.6,176 600.4,166.5"},
    {},
    {d:"M222,228c17.2,25.7,53.8,33.8,75.7,13.4", points:"312,217 304.4,259.3 295.7,242.6 276.9,241.9"},
    {d:"M229,232c41.2,37.8,169.3,31.8,225.7,7", points:"478,223 453.6,258.4 452.6,239.6 435.8,231.2"}
  ],
  [
    {d:"M284,183c-16.6-10-138.4,5.6-192.7-13", points:"68,154 110.3,161.8 93.5,170.4 92.7,189.2"},
    {d:"M259,181c-12.5-7.5-39.1-9.1-59.7-12.7", points:"173,158 216,156.3 201.5,168.4 204.9,186.9"},
    {d:"M297,181c3.6-3-5.8-4.3-15.2-6.9", points:"266,160 296.9,169.2 283.8,174.2 281.7,188.2"},
    {d:"M339,184c19.2-12.3,61.4-0.4,85.9-8.3", points:"441,162 424.8,189.9 423,175.9 409.9,170.6"},
    {d:"M326,185c0-12.6,106,2.6,154.9-7.2", points:"505,163 478.2,196.6 478.5,177.8 462.3,168.2"},
    {d:"M390,188c29.2-15,136.3,6.8,182.1-6", points:"593,163 572.3,200.7 569.4,182.1 551.8,175.4"},
    {d:"M425,189c50.9-10.2,152.7,4.2,196.8-9.3", points:"643,161 622,198.5 619.2,179.9 601.7,173.1"},
    {d:"M312,228c-17.2,25.7-53.8,33.8-75.7,13.4", points:"222,217 257.1,241.9 238.3,242.6 229.6,259.3"},
    {},
    {d:"M358,226c38.5,35.3,73.3,36.1,100,16.9", points:"478,223 460.5,262.3 456.1,244 438,238.8"}
  ],
  [
    {d:"M443,188c-17.3-10.4-267.9,3.2-350.3-20.2", points:"68,154 110.8,158 94.9,168 95.8,186.8"},
    {d:"M453,186c-16.3-9.8-185-12.9-252.6-21.3", points:"173,158 215.4,151.1 202.6,164.8 208.1,182.8"},
    {d:"M457,185c-15.7-14.2-38.4-12.3-60.7-16.8", points:"370,158 413,156.4 398.5,168.4 401.8,186.9"},
    {d:"M496,188c-3.5-18.9-22.7-13.8-38.3-17.9", points:"441,157 472.4,164.2 459.6,170.1 458.4,184.2"},
    {d:"M517,179c0-6.2-3.5-6.1-7.3-5.7", points:"501,154 528,171.7 513.9,172.8 507.8,185.5"},
    {d:"M544,186c18.9-9.7,25.3-14.5,29.7-18.5", points:"590,154 574.8,182.4 572.5,168.5 559.2,163.6"},
    {d:"M583,188c27.2-3.9,38-10.7,48.2-17.2", points:"650,161 629.4,185.8 629.9,171.7 617.9,164.3"},
    {d:"M463,224c-18.4,27.6-164.6,37.7-220.3,12.3", points:"222,217 262.8,230.6 245,236.8 241.6,255.3"},
    {d:"M478,226c-38.5,35.3-73.3,36.1-100,16.9", points:"358,223 398,238.8 379.9,244 375.5,262.3"},
    {}
  ]
  ]

  scroll_through_complex_pairs("lda2vec", "lda2vec_animation_interval", interval_length, transition_length, bluebox_height, blueboxes, greenarrows, orangearrows)

}




