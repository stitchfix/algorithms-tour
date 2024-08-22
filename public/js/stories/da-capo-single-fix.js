
function run_single_fix_overview_animation(){

  var icycle_center = {x: 289 - 10, y: 380.5}
  var icycle_radius = 190.8

  var wh_x = 200.5 + 10
  var wh_y = 133.4 + 10
  var wh_width = 177 - 40
  var wh_height = 144 - 40

  var wh = []
  for (var i=0; i<5; i++){
    wh.push({x: wh_x + Math.random() * wh_width , y: wh_y + Math.random() * wh_height })
  }

  var single_fix_elements = {
    'request':    {type: 'circle', fill: color_palette(1), r: 5,
                    progression: [
                      {t: 0, cx: 400, cy: 570, i: 'linear'},
                      {t: 500, cx: 400, cy: 570, i: 'linear'},
                      {t: 2000, cx: 715, cy: 550, i: 'linear'},
                      {t: 3000, cx: 715, cy: 550, i: 'linear'},
                      {t: 4000, cx: 715, cy: 370, i: 'linear'},
                      {t: 5000, cx: 715, cy: 370, i: 'linear'},
                      {t: 6000, cx: 440, cy: 190, i: 'linear'},
                      {t: 7000, cx: 440, cy: 190, i: 'linear'},
                    ]
                  },
    'profile':    {type: 'circle', fill: color_palette(2), r: 5,
                    progression: [
                      {t: 0, cx: 400, cy: 590, i: 'linear'},
                      {t: 500, cx: 400, cy: 590, i: 'linear'},
                      {t: 2000, cx: 730, cy: 550, i: 'linear'},
                      {t: 3000, cx: 730, cy: 550, i: 'linear'},
                      {t: 4000, cx: 730, cy: 370, i: 'linear'},
                      {t: 5000, cx: 730, cy: 370, i: 'linear'},
                      {t: 6000, cx: 455, cy: 190, i: 'linear'},
                      {t: 7000, cx: 455, cy: 190, i: 'linear'},
                    ]
                  },
    'warehouse':  {type: 'circle', fill: color_palette(0), r: 5,
                    progression: [
                      {t: 2000, cx: 750, cy: 520, i: 'linear'},
                      {t: 3000, cx: 700, cy: 550, i: 'linear'},
                      {t: 4000, cx: 700, cy: 370, i: 'linear'},
                      {t: 5000, cx: 700, cy: 370, i: 'linear'},
                      {t: 6000, cx: 425, cy: 190, i: 'linear'},
                      {t: 7000, cx: 425, cy: 190, i: 'linear'},
                    ]
                  },
    'note':       {type: 'circle', fill: color_palette(4), r: 5, dx: 10, dy: 10,
                    progression: [
                      {t: 4000, cx: 780, cy: 370, i: 'linear'},
                      {t: 5000, cx: 670, cy: 370, i: 'linear'},
                      {t: 6000, cx: 395, cy: 190, i: 'linear'},
                      {t: 7000, cx: 395, cy: 190, i: 'linear'},
                      {t: 8000, cx: 395, cy: 230, a: -56, i: 'circular'},
                      {t: 10000, cx: 384, cy: 556, a: 60, i: 'circular'},
                      {t: 10000, cx: 384, cy: 556, i: 'linear'},
                      {t: 11000, cx: 317, cy: 535, i: 'linear'},
                      {t: 12000, cx: 317, cy: 535, i: 'linear'},

                    ]
                  },
    'feedback':   {type: 'circle', fill: color_palette(5), r: 5,
                    progression: [
                      {t: 13000, cx: 400, cy: 620, i: 'linear'},
                      {t: 14500, cx: 700, cy: 580, i: 'linear'},
                    ]
                  }
  }


  for (var i=0; i<5; i++){
    single_fix_elements['selection' + i] = {
      type: 'circle', fill: color_palette(3), r: 5,
      progression: [
        {t: 4000, cx: 750 + i*15, cy: 400, i: 'linear'},
        {t: 5000, cx: 670 + i*15, cy: 385, i: 'linear'},
        {t: 6000, cx: 395 + i*15, cy: 205, i: 'linear'},
        {t: 7000, cx: wh[i].x, cy: wh[i].y, i: 'linear'},
      ]
    }
  }

  [1,3].forEach(function(i){
    single_fix_elements['styleoutline' + i] = {
      type: 'path', fill: "#fff", stroke: "#000", form_n: Math.floor(Math.random()*7),
      dx: outline_locs[i].dx, dy: outline_locs[i].dy,
      progression: [
        {t: 7000, x: wh[i].x - 10, y: wh[i].y - 10, i: 'linear'},
        {t: 8000, x: 385, y: 220, a: -56, i: 'circular'},
        {t: 10000, x: 385, y: 520, a: 60, i: 'circular'},
        {t: 10200, x: 385, y: 520, a: 60, i: 'circular'},
        {t: 11000, x: 385, y: 520, a: 85, i: 'circular'},
        {t: 11500, x: 385, y: 520, a: 85, i: 'circular'},
        {t: 14000, x: 385, y: 520, a: 260, i: 'circular'},
      ]
    }
  })

  var i = 0
    single_fix_elements['styleoutline' + i] = {
      type: 'path', fill: "#fff", stroke: "#000", form_n: Math.floor(Math.random()*7),
      dx: outline_locs[i].dx, dy: outline_locs[i].dy,
      progression: [
        {t: 7000, x: wh[i].x - 10, y: wh[i].y - 10, i: 'linear'},
        {t: 8000, x: 385, y: 220, a: -56, i: 'circular'},
        {t: 10000, x: 385, y: 520, a: 60, i: 'circular'},
        {t: 10200, x: 385, y: 520, a: 60, i: 'circular'},
        {t: 11000, x: 385, y: 520, a: 85, i: 'circular'},
        {t: 11500, x: 324, y: 572, a: 85, i: 'circular'},
        {t: 11500, x: 324, y: 572, i: 'linear2'},
        {t: 12000, x: 248, y: 620, i: 'linear2'},
        {t: 14000, x: 248, y: 620, i: 'linear2'},
      ]
    }

  var i = 2
    single_fix_elements['styleoutline' + i] = {
      type: 'path', fill: "#fff", stroke: "#000", form_n: Math.floor(Math.random()*7),
      dx: outline_locs[i].dx, dy: outline_locs[i].dy,
      progression: [
        {t: 7000, x: wh[i].x - 10, y: wh[i].y - 10, i: 'linear'},
        {t: 8000, x: 385, y: 220, a: -56, i: 'circular'},
        {t: 10000, x: 385, y: 520, a: 60, i: 'circular'},
        {t: 10200, x: 385, y: 520, a: 60, i: 'circular'},
        {t: 11000, x: 385, y: 520, a: 85, i: 'circular'},
        {t: 11500, x: 294, y: 602, a: 85, i: 'circular'},
        {t: 11500, x: 294, y: 602, i: 'linear2'},
        {t: 12000, x: 228, y: 620, i: 'linear2'},
        {t: 14000, x: 228, y: 620, i: 'linear2'},
      ]
    }

  var i = 4
    single_fix_elements['styleoutline' + i] = {
      type: 'path', fill: "#fff", stroke: "#000", form_n: Math.floor(Math.random()*7),
      dx: outline_locs[i].dx, dy: outline_locs[i].dy,
      progression: [
        {t: 7000, x: wh[i].x - 10, y: wh[i].y - 10, i: 'linear'},
        {t: 8000, x: 385, y: 220, a: -56, i: 'circular'},
        {t: 10000, x: 385, y: 520, a: 60, i: 'circular'},
        {t: 10200, x: 385, y: 520, a: 60, i: 'circular'},
        {t: 11000, x: 385, y: 520, a: 85, i: 'circular'},
        {t: 11500, x: 354, y: 602, a: 85, i: 'circular'},
        {t: 11500, x: 354, y: 602, i: 'linear2'},
        {t: 12000, x: 268, y: 620, i: 'linear2'},
        {t: 14000, x: 268, y: 620, i: 'linear2'},
      ]
    }


  function single_fix_sim(sim_number, speed) {

    animation_state.single_fix_sim_timer = d3.timer(function(t) {

      t = t * speed

      if (t > 15500) {
        if (sim_number == 0) {
          d3.select("#single-fix-sim").selectAll("circle").remove()
          d3.select("#single-fix-sim").selectAll("path").remove()
          animation_state.single_fix_sim_timer.stop()
          single_fix_sim(1,1)
        } else {
          stop_animation_timer("single_fix_sim_timer")
        }
      }

      if (sim_number > 0) {
        d3.select("#icycle-closet")
          .attr("display", "block")
          .style("opacity", 1)
      } else if (t > 11500) {
        d3.select("#icycle-closet")
          .attr("display", "block")
          .style("opacity", Math.min(1, (t-1150) / 200))
      } else {
        d3.select("#icycle-closet")
          .attr("display", "none")
          .style("opacity", 0)
      }

      Object.keys(single_fix_elements).forEach(function(el_name){

        var el = single_fix_elements[el_name]

        var i = -1 + el.progression.findIndex(function(d){ return t <= d.t })

        if (i == -2) {
          // remove element(s)
          d3.select("#single-fix-sim").selectAll(".single-fix-sim-" + el_name + "-" + sim_number)
            .attr("class", "single-fix-sim-fading-out")
            .transition().duration(500)
              .style("opacity", 0)
              .remove()
        }
        if (i > -1) {
          if (i == 0) {
            // add element(s) if necessary
            if (el.type == "circle") {
              d3.select("#single-fix-sim").selectAll(".single-fix-sim-" + el_name + "-" + sim_number)
                  .data([el])
                .enter().append("circle")
                  .attr("class", "single-fix-sim-" + el_name + "-" + sim_number)
                  .attr("r", el.r)
                  .attr("fill", el.fill)
                  .attr("cx", 0)
                  .attr("cy", 0)
            }

            if (el.type == "path") {
              var tx = el.progression[0].x
              var ty = el.progression[0].y
              d3.select("#single-fix-sim").selectAll(".single-fix-sim-" + el_name + "-" + sim_number)
                  .data([el])
                .enter().append("path")
                  .attr("class", "single-fix-sim-" + el_name + "-" + sim_number)
                  .attr("fill", el.fill)
                  .attr("stroke", el.stroke)
                  .attr("d", silhouette_outline_d(el.form_n, tx + el.dx, ty + el.dy))
            }

          }
          // move element(s)
          var dt = (t - el.progression[i].t) / (el.progression[i+1].t - el.progression[i].t)

          if (el.type == "circle") {
            if (el.progression[i].i == "linear") {
              var de = d3.easePoly(dt, 1.5)
              d3.select("#single-fix-sim").selectAll(".single-fix-sim-" + el_name + "-" + sim_number)
                .attr("cx", el.progression[i].cx * (1-de) + el.progression[i+1].cx * de )
                .attr("cy", el.progression[i].cy * (1-de) + el.progression[i+1].cy * de )
            }
            if (el.progression[i].i == "circular") {
              var de = d3.easePoly(dt, 1)
              var da = el.progression[i].a * (1-de) + el.progression[i+1].a * de
              d3.select("#single-fix-sim").selectAll(".single-fix-sim-" + el_name + "-" + sim_number)
                .attr("cx", el.dx + icycle_center.x + icycle_radius * Math.cos(da * (Math.PI/180)) )
                .attr("cy", el.dy + icycle_center.y + icycle_radius * Math.sin(da * (Math.PI/180)) )
            }
          }
          if (el.type == "path") {
            if (el.progression[i].i == "linear") {
              var de = d3.easePoly(dt, 1.5)
              var tx = el.progression[i].x * (1-de) + (el.dx + el.progression[i+1].x) * de
              var ty = el.progression[i].y * (1-de) + (el.dy + el.progression[i+1].y) * de
              d3.select("#single-fix-sim").selectAll(".single-fix-sim-" + el_name + "-" + sim_number)
                .attr("d", silhouette_outline_d(el.form_n, tx, ty))
            }
            if (el.progression[i].i == "linear2") {
              var de = d3.easePoly(dt, 1.5)
              var tx = el.progression[i].x * (1-de) + (el.progression[i+1].x) * de
              var ty = el.progression[i].y * (1-de) + (el.progression[i+1].y) * de
              d3.select("#single-fix-sim").selectAll(".single-fix-sim-" + el_name + "-" + sim_number)
                .attr("d", silhouette_outline_d(el.form_n, tx, ty))
            }
            if (el.progression[i].i == "circular") {
              var de = d3.easePoly(dt, 1)
              var da = el.progression[i].a * (1-de) + el.progression[i+1].a * de
              var tx = el.dx + icycle_center.x + icycle_radius * Math.cos(da * (Math.PI/180))
              var ty = el.dy + icycle_center.y + icycle_radius * Math.sin(da * (Math.PI/180))
              d3.select("#single-fix-sim").selectAll(".single-fix-sim-" + el_name + "-" + sim_number)
                .attr("d", silhouette_outline_d(el.form_n, tx, ty))
            }
          }
        }

      })

    })

  }


  function single_fix_sim_animate_labels() {

    d3.selectAll(".single-fix-sim-persistent-lines, .single-fix-sim-persistent-text")
      .transition().duration(0).remove()

    // request
    d3.select("#single-fix-sim-labels").append("path")
      .attr("class", "single-fix-sim-persistent-lines request-line")
      .attr("d", "M 400 590 L 700 550")
    d3.select("#single-fix-sim-labels").append("text")
      .attr("class", "single-fix-sim-persistent-text request-text")
      .attr("x", 550)
      .attr("y", 585)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-6,550,585)")
      .text("request")

    // styling
    d3.select("#single-fix-sim-labels").append("path")
      .attr("class", "single-fix-sim-persistent-lines styling-line")
      .attr("d", "M 700 550 L 700 370")

    // to logistics
    d3.select("#single-fix-sim-labels").append("path")
      .attr("class", "single-fix-sim-persistent-lines to-logistics-line")
      .attr("d", "M 700 370 L 425 190")
    d3.select("#single-fix-sim-labels").append("text")
      .attr("class", "single-fix-sim-persistent-text to-logistics-text")
      .attr("x", 550)
      .attr("y", 260)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(33,550,260)")
      .text("to logistics")

    // delivery
    d3.select("#single-fix-sim-labels").append("path")
      .attr("class", "single-fix-sim-persistent-lines delivery-line")
      .attr("d", "M 400 250 A 10 15 0 0 1 400 550")
    d3.select("#single-fix-sim-labels").append("text")
      .attr("class", "single-fix-sim-persistent-text delivery-text")
      .attr("x", 490)
      .attr("y", 400)
      .attr("text-anchor", "end")
      .text("delivery")

    // return
    d3.select("#single-fix-sim-labels").append("path")
      .attr("class", "single-fix-sim-persistent-lines return-line")
      .attr("d", "M 175.5 550 A 10 15 0 0 1 175.5 250")
    d3.select("#single-fix-sim-labels").append("text")
      .attr("class", "single-fix-sim-persistent-text return-text")
      .attr("x", 85.5)
      .attr("y", 400)
      .text("return")

    // feedback
    d3.select("#single-fix-sim-labels").append("path")
      .attr("class", "single-fix-sim-persistent-lines feedback-line")
      .attr("d", "M 400 620 L 700 580")
    d3.select("#single-fix-sim-labels").append("text")
      .attr("class", "single-fix-sim-persistent-text feedback-text")
      .attr("x", 550)
      .attr("y", 615)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-6,550,615)")
      .text("feedback")

    var lines = d3.selectAll(".single-fix-sim-persistent-lines")
    var totalLengths = []
    lines[0].forEach(function(line){
      totalLengths.push(line.getTotalLength())
    })

    lines.data(totalLengths)
      .attr("stroke-dasharray", function(d){ return d + " " + d})
      .attr("stroke-dashoffset", function(d){ return d})

    d3.selectAll(".single-fix-sim-persistent-text")
      .style("opacity", 0)

    d3.selectAll(".request-line, .to-logistics-line, .delivery-line, .return-line, .feedback-line")
      .transition().duration(0).attr("stroke-dashoffset", function(d){ return d})
    d3.selectAll(".request-text, .to-logistics-text, .delivery-text, .return-text, .feedback-text")
      .transition().duration(0).style("opacity", 0)

    d3.select(".request-line")
      .transition().delay(600).duration(1500).attr("stroke-dashoffset", 45)
    d3.select(".request-text")
      .transition().delay(1500).duration(500).style("opacity", 1)

    d3.select(".to-logistics-line")
      .transition().delay(5100).duration(1000).attr("stroke-dashoffset", 60)
    d3.select(".to-logistics-text")
      .transition().delay(5500).duration(500).style("opacity", 1)

    d3.select(".delivery-line")
      .transition().delay(8500).duration(1500).attr("stroke-dashoffset", 45)
    d3.select(".delivery-text")
      .transition().delay(8900).duration(500).style("opacity", 1)

    d3.select(".return-line")
      .transition().delay(12500).duration(1000).attr("stroke-dashoffset", 45)
    d3.select(".return-text")
      .transition().delay(12900).duration(500).style("opacity", 1)

    d3.select(".feedback-line")
      .transition().delay(13100).duration(1500).attr("stroke-dashoffset", 45)
    d3.select(".feedback-text")
      .transition().delay(13500).duration(500).style("opacity", 1)


  }


  // prepare the space

  d3.select("#single-fix-sim").selectAll("circle").remove()
  d3.select("#single-fix-sim").selectAll("path").remove()

  d3.selectAll(".single-fix-sim-persistent-lines")
    .transition().duration(0)
      .attr("stroke-dasharray", function(d){ return d + " " + d})
      .attr("stroke-dashoffset", function(d){ return d})

  d3.selectAll(".single-fix-sim-persistent-text")
    .transition().duration(0)
      .style("opacity", 0)

  // run the circles animation
  single_fix_sim(0,1)

  // animate the labels alongside it
  single_fix_sim_animate_labels()

  // and highlight the humans and machines and such when appropriate

  d3.select("#humans-unselected")
    .transition().delay(10).duration(100)
      .style("opacity", 1)
    .transition().delay(3200).duration(500)
      .style("opacity", 0)

  d3.select("#icycle-newlabel-wa")
    .style("opacity", 0)
    .transition().delay(2200).duration(500)
      .style("opacity", 1)

  d3.select("#icycle-newlabel-sr")
    .style("opacity", 0)
    .transition().delay(4200).duration(500)
      .style("opacity", 1)

  d3.select("#icycle-newlabel-lo")
    .style("opacity", 0)
    .transition().delay(7200).duration(500)
      .style("opacity", 1)

  // make sure warehouse box is not opaque
  d3.select("#icycle-warehouses").select("rect")
    .attr("fill", "none")


}


