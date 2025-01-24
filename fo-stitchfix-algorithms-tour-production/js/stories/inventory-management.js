
function run_inventory_management_sim(n_buckets, inputs, model, clothing_animation, detailed_colors, show_q_t, nonzero_replenish){

  if (!model) {
    stop_animation_timer("inventory_management_sim_timer")
  }
  stop_animation_timer("inventory_management_sim_detailed_timer")
  stop_animation_timer("inventory_management_clothing_animation_timer")
  stop_animation_timer("inventory_management_sim_model_timer")

  var single_sku_big_dump = false
  var single_sku_big_dump_happened = false
  var single_sku_big_dump_hits_pipe = false
  var single_sku_big_dump_time = -1

  var inventory_management_clothing_animation_detailed_colors = detailed_colors

  var inventory_management_clothing_animation_running = clothing_animation


  function inventory_management_sim(n_buckets, inputs, model) {

    var demand_impact = 0.2 / 2
    var allocation_impact = 0.2 / 2
    var clearance_impact = 0.5 / 2

    var capacities = []
    if (model) {
      d3.select("#im2-capacities").selectAll("rect")[0].forEach(function(d){ capacities.push(+d.height.animVal.value) })
      demand_impact = 0.2 * 2.5
      allocation_impact = 0.2 * 2.5
      clearance_impact = 0.5 * 2.5
    } else {
      d3.select("#im-capacities").selectAll("rect")[0].forEach(function(d){ capacities.push(90) })
    }

    var demand = [4,4,4,4,4]

    var purchase = 0
    var allocation = [5,5,5,5,5]
    var clearance = [0,0,0,0,0]

    var histry = []

    var width = 900,
        height = 600

    var lines_margin = {top: 40, right: 15, bottom: 340, left: 500, top2: 320},
        lines_width = width - lines_margin.left - lines_margin.right,
        lines_height = height - lines_margin.top - lines_margin.bottom

    var svg2 = d3.select("#q-t-model").select(".animation-g")

    var line_g2 = svg2.append("g")
                      .attr("transform", "translate(" + lines_margin.left + "," + lines_margin.top2 + ")")

    var x = d3.scale.linear()
        .domain([0,200])
        .range([0, lines_width])

    var y = d3.scale.linear()
        .domain([0,14])
        .range([lines_height, 0])

    var inventory_area = d3.svg.area()
        .x(function(d) { return x(d.t) })
        .y0(y(0))
        .y1(function(d) { return y(d.inventory / 10) })

    var demand_line = d3.svg.line()
        .x(function(d) { return x(d.t) })
        .y(function(d) { return y(d.demand) })

    var purchase_line = d3.svg.line()
        .x(function(d) { return x(d.t) })
        .y(function(d) { return y(d.purchase) })

    function timer_function(elapsed){

    	if (elapsed > 100000) {
        if (model) {
          stop_animation_timer("inventory_management_sim_model_timer")
        } else {
          stop_animation_timer("inventory_management_sim_timer")
        }
      }

      if (n_buckets > 1) {

        for (var i=0; i<5; i++) {

          // demand
          demand[i] += -0.4 + Math.random() * 0.8
          demand[i] = Math.min(5, Math.max(0, Math.min(capacities[i] / demand_impact, demand[i])))

          var wait_for_clothes = false
          if (inventory_management_clothing_animation_running && elapsed < 2800) {
            wait_for_clothes = true
          }

          if (inputs && (!wait_for_clothes)) {

            // clearance
            if (clearance[i] == 0 && (Math.random() < 0.01 && capacities[i] > 10)) { clearance[i] = 30 }
            else { clearance[i] = Math.max(0, clearance[i] - 1) }
            var this_clearance = 0
            if (clearance[i] > 0) { this_clearance = 1 }

            // allocation
            if (capacities[i] > 90) { allocation[i] = 0 }
            else if (capacities[i] < 20) { allocation[i] = 8 }
            else {
              allocation[i] += (-1 + (capacities[i] < 70 ) * 2) * Math.random() * 0.2
              allocation[i] = Math.max(0, allocation[i])
            }

          } else {

          	clearance[i] = 0
          	this_clearance = 0
          	allocation[i] = 0

          }

          // update capacities
          capacities[i] = capacities[i] - demand[i] * demand_impact - this_clearance * clearance_impact + allocation[i] * allocation_impact
        }

        // purchase
        purchase = d3.sum(allocation)

      } else {

        demand_impact = 0.8 * 0.2 / 3

        for (var i=0; i<5; i++) {

          // demand
          demand[i] += -0.05 + Math.random() * 0.12
          demand[i] = Math.min(10, Math.max(0, Math.min(capacities[i] / demand_impact, demand[i])))

          var wait_for_clothes = false
          if (inventory_management_clothing_animation_running && elapsed < 2800) {
            wait_for_clothes = true
          }

          if (inputs && (!wait_for_clothes)) {

            // clearance
            clearance[i] = 0
            this_clearance = 0

            // allocation
            if (!single_sku_big_dump_hits_pipe) {
              allocation[i] = 0
            } else {
              allocation[i] = Math.max(0, 15 * 40 + 15 * 10 * Math.random())
              single_sku_big_dump_happened = false
              single_sku_big_dump_hits_pipe = false
              single_sku_big_dump_time = elapsed
            }

          } else {

            clearance[i] = 0
            this_clearance = 0
            allocation[i] = 0

          }

          // update capacities
          capacities[i] = Math.max(5, Math.min(95, capacities[i] - demand[i] * demand_impact - this_clearance * clearance_impact + allocation[i] * allocation_impact))
        }

        // purchase
        purchase = d3.sum(allocation)

        // single sku big dump
        var purchase_mark = Math.min(70, 10 + ( 350 / demand[0] ))
        if ((capacities[0] < purchase_mark) && (!single_sku_big_dump_happened)) {
          single_sku_big_dump = true
          single_sku_big_dump_happened = true
        } else {
          single_sku_big_dump = false
        }

      }

      // update svg

      if (model) {

        d3.select("#im2-capacities").selectAll("rect").data(capacities)
          .attr("height", function(d){ return (d * 0.7) })
          .attr("y", function(d){ return (432.8 - (d * 0.7) + 70) })

        d3.select("#im2-purchase").select("line")
          .attr("stroke-width", Math.max(1 * nonzero_replenish, Math.min(6, purchase / 1.5)))

        d3.select("#im2-allocation").selectAll("line").data(allocation)
          .attr("stroke-width", function(d){ return d * 0.7 })

        d3.select("#im2-clearance").selectAll("polyline").data(clearance)
          .attr("stroke-width", function(d){ if (d > 0) { return 2.2 } else { return 0 } })

        d3.selectAll(".im2-demand-return").data(demand)
          .attr("stroke-width", function(d){ return 0.75 + d * 0.75 })

        d3.selectAll(".im2-demand-supply").data(demand)
          .attr("stroke-width", function(d){ return 0.75 + d * 1.5 * 0.75 })

      } else {

        if (n_buckets == 1) {

          d3.select("#im-capacities-single").selectAll("rect").data([capacities[0]])
            .attr("height", function(d){ return d })
            .attr("y", function(d){ return (287 - d + 90) })

          d3.select("#im-purchase-single").select("polyline")
            .attr("stroke-width", function(d){
                if ((elapsed < single_sku_big_dump_time + 400) && (single_sku_big_dump_time != -1)) {
                  return 8
                } else {
                  return 0
                }
              })
            .style("opacity", function(d){
                if ((elapsed < single_sku_big_dump_time + 400) && (single_sku_big_dump_time != -1)) {
                  return (single_sku_big_dump_time + 400 - elapsed) / 400
                } else {
                  return 1
                }
              })

          d3.selectAll(".im-demand-supply-single").data([demand[0]])
            .attr("stroke-width", function(d){ return 1 + d * 0.5 })

          // update history graphs

          if (elapsed < 200 * 100) {
            histry.push({t: elapsed / 100, demand: demand[0], inventory: capacities[0], purchase: allocation[0]})
          }

          line_g2.selectAll(".state_history2").remove()

          line_g2.append("path")
              .datum(histry)
              .attr("class", "state_history2")
              .attr("d", inventory_area)
              .style("stroke", "none")
              .style("fill", "#86C6BD")

          line_g2.append("path")
              .datum(histry)
              .attr("class", "state_history2")
              .attr("d", demand_line)
              .style("stroke-width", "2px")
              .style("stroke", "#000")
              .style("fill", "none")

        } else {

          d3.select("#im-capacities").selectAll("rect").data(capacities)
            .attr("height", function(d){ return d })
            .attr("y", function(d){ return (287 - d + 90) })

          d3.select("#im-purchase").select("line")
            .attr("stroke-width", Math.max(1 * nonzero_replenish, Math.min(8, purchase / 2)))

          d3.select("#im-allocation").selectAll("line").data(allocation)
            .attr("stroke-width", function(d){ return d })

          d3.select("#im-clearance").selectAll("polyline").data(clearance)
            .attr("stroke-width", function(d){ if (d > 0) { return 3 } else { return 0 } })

          d3.selectAll(".im-demand-return").data(demand)
            .attr("stroke-width", function(d){ return 1 + d })

          d3.selectAll(".im-demand-supply").data(demand)
            .attr("stroke-width", function(d){ return 1 + d * 1.5 })

        }

      }

    }

    if (model){
      animation_state.inventory_management_sim_model_timer = d3.timer(timer_function)
    } else {
      animation_state.inventory_management_sim_timer = d3.timer(timer_function)
    }

  }

  function inventory_management_sim_detailed() {

    var capacities = []
    d3.select("#im-capacities-detailed").selectAll("rect")[0].forEach(function(d){ capacities.push(+d.height.animVal.value) })

    d3.select("#im-capacities-detailed").selectAll("rect")
      .attr("fill", function(d,i){
          return color_palette(parseInt(Math.random() * 6))
        })

    animation_state.inventory_management_sim_detailed_timer = d3.timer(function(elapsed){
    	if (elapsed > 100000) {
        stop_animation_timer("inventory_management_sim_detailed_timer")
      }

      // update capacities
    	capacities.forEach(function(c,i){
    	  capacities[i] = c - 1 + Math.random() * 2
    	  capacities[i] = Math.max(0, Math.min(9, capacities[i]))
    	})

      // update svg
      d3.select("#im-capacities-detailed").selectAll("rect").data(capacities)
        .attr("width", function(d){ return d })

    })

  }


  var start_inventory_management_clothing_animation = function(single_sku) {

    // vis config variables

    var svg = d3.select("#im-clothing-animation")

    var start_clock_time = 0
    var speed = 0.0002 // ticks per millisecond

    var outer_r = 170
    var inner_r = 80

    var center_x = 500
    var center_y_main = 295 - outer_r


    // internal state variables

    var next_event_i = 0
    var events_data = []
    var current_events = []
    var learning_current_events = []


    // mapping functions

    var coord_x_main = function(r,a) { return center_x + r * Math.cos(a) }
    var coord_y_main = function(r,a) { return center_y_main + r * Math.sin(a) }

    var coord_y_in = function(t, t1, t2) {
      var rel_t
      if (t2 == t1) { rel_t = 1 }
      else { rel_t = (t - t1) / (t2 - t1) }
      return center_y_main * rel_t + (1-rel_t) * (-250)
    }

    var angle_main = function(t, t1, t2, e1, e2) {
      // compute angle in circle for a dot,
      // given its previous and next events, their timestamps, and the current time
      var rel_t
      if (t2 == t1) { rel_t = 1 }
      else { rel_t = (t - t1) / (t2 - t1) }
      var rel_e = e1 + rel_t * (e2 - e1)
      if (e1 > e2) { rel_e = e1 + rel_t * (3.0 - e1) }
      var a = (0.0 + 90.0 * (rel_e - 1)) * (Math.PI/180.0)
      return a
    }

    var angle_in = function(t, t1, t2) {
      var rel_t
      if (t2 == t1) { rel_t = 1 }
      else { rel_t = (t - t1) / (t2 - t1) }
      var a = (180.0 - 90.0 * rel_t) * (Math.PI/180.0)
      return a
    }

    var particle_count = 0

    // animation timer
    animation_state.inventory_management_clothing_animation_timer = d3.timer(function(t_ms) {

      if (t_ms > 1e5) {
        stop_animation_timer("inventory_management_clothing_animation_timer")
      }

      var t = t_ms * speed

      // check for expired events since last t
      // if previous event was #1, then move to #2 with random speed
      // if previous event was #2, then move to either #1 or #3 with some probability and random speed
      // if previous event was #3, then exit
      var removals = []
      current_events.forEach(function(d,i){
        if (d.t2 < t) {
          d.t1 = d.t2
          d.e1 = d.e2
          if ((d.sil == 5) && (single_sku)) {
            d.t2 = d.t1 + 0.2
          } else {
            d.t2 = d.t1 + 0.3 + Math.random() * 0.4
          }
          if (d.e2 == 1) {
            d.e2 = 2
          } else if (d.e2 == 2) {
            d.e2 = 3
            d.t2 = d.t1 + 0.1
            if ((d.sil == 5) && (single_sku)) {
              single_sku_big_dump_hits_pipe = true
            }
          } else {
            removals.push(i)
          }
        }
      })

      for (var i=removals.length - 1; i>-1; i--){
        current_events.splice(removals[i],1)
      }

      // add some new particles, with some probability and random speed
      if (single_sku && single_sku_big_dump) {
        for (var i=0; i<50; i++) {
          if (Math.random() < 0.3) {
            particle_count += 1
            current_events.push({
                'particle_id': particle_count,
                'rad': inner_r + (outer_r - inner_r) * Math.random(),
                'sil': 5,
                't1': t,
                't2': t + 0.2,
                'e1': 0,
                'e2': 1,
                'c': Math.floor(Math.random() * 6)
            })
          }
        }
      } else {
        for (var i=0; i<2; i++) {
          if (Math.random() < 0.3) {
            var sil_n = Math.floor(Math.random() * 14)
            if (sil_n == 5) {sil_n = 6 + Math.floor(Math.random() * 8)}
            particle_count += 1
            current_events.push({
                'particle_id': particle_count,
                'rad': inner_r + (outer_r - inner_r) * Math.random(),
                'sil': sil_n,
                't1': t,
                't2': t + 2 * 0.5 * ( 0.3 + Math.random() * 0.4 ),
                'e1': 0,
                'e2': 1,
                'c': Math.floor(Math.random() * 6)
            })
          }
        }
      }

      // d3 enter-update-exit pattern for inventory_items using current_events array

      var inventory_items = svg.selectAll(".inventory-cycle-silhouette")
                        .data(current_events, function(d) { return d.particle_id })

      inventory_items.enter().append("path")
        .attr("class", "inventory-cycle-silhouette")
        .attr("fill", function(d){
            if (single_sku && single_sku_big_dump) {
              return "#86C6BD"
            } else {
              return "#fff"
            }
          })
        .attr("stroke", function(d){
            if (single_sku && single_sku_big_dump) {
              return "#000"
            } else {
              return "#000"
            }
          })
        .attr("stroke-width", 0.5)
        .attr("opacity", 1e-6)
        .attr("d", function(d) { return silhouette_outline_d(d.sil, 290, 0) })

      inventory_items
        .attr("d", function(d){

            var tx = 0
            var ty = 0

            var rel_t = (t - d.t1) / (d.t2 - d.t1)

            if (d.e1 == 0) {
              tx = coord_x_main(d.rad, 0)
              ty = coord_y_in(t, d.t1, d.t2)
            } else if (d.e2 == 3) {
              tx = center_x * (1-rel_t) + rel_t * (center_x - 80)
              ty = center_y_main + (inner_r + outer_r) / 2
            } else {
              var new_rad = d.rad * (1-rel_t) + rel_t * (inner_r + outer_r) / 2
              tx = coord_x_main(new_rad, angle_main(t, d.t1, d.t2, d.e1, d.e2))
              ty = coord_y_main(new_rad, angle_main(t, d.t1, d.t2, d.e1, d.e2))
            }

            return silhouette_outline_d(d.sil, tx, ty)

          })
        .style("opacity", function(d){
            if (d.e1 == 0) {
              var rel_t = (t - d.t1) / (d.t2 - d.t1)
              return Math.min(1, rel_t * 1.5)
            } else if (d.e2 == 3) {
              var rel_t = (t - d.t1) / (d.t2 - d.t1)
              if ((d.sil == 5) && (single_sku)) {
                return Math.pow((1-rel_t), 5)
              } else {
                return (1-rel_t)
              }
            } else {
              return 1
            }
          })

      if (!single_sku) {

        inventory_items
          .attr("fill", function(d){
              if (d.e1 == 0) {
                return "#fff"
              } else if (d.e2 == 3) {
                if (inventory_management_clothing_animation_detailed_colors){
                  return color_palette(d.c)
                } else {
                  return "#86C6BD"
                }
              } else {
                var rel_t = (t - d.t1) / (d.t2 - d.t1)
                if (inventory_management_clothing_animation_detailed_colors){
                  return d3.interpolateLab("#fff",color_palette(d.c))(rel_t)
                } else {
                  return d3.interpolateLab("#fff","#86C6BD")(rel_t)
                }
              }
            })
          .attr("stroke", function(d){
              if (d.e1 == 0) {
                return "#000"
              } else if (d.e2 == 3) {
                if (inventory_management_clothing_animation_detailed_colors){
                  return color_palette(d.c)
                } else {
                  return "#86C6BD"
                }
              } else {
                var rel_t = (t - d.t1) / (d.t2 - d.t1)
                if (inventory_management_clothing_animation_detailed_colors){
                  return d3.interpolateLab("#000",color_palette(d.c))(rel_t)
                } else {
                  return d3.interpolateLab("#000","#86C6BD")(rel_t)
                }
              }
            })

      }

      inventory_items.exit().remove()

    })

  }


  function q_t_model_graph_axes(){

    var width = 900,
        height = 600

    var svg = d3.select("#q-t-model").select(".animation-g")

    svg.html("")

    var lines_margin = {top: 40, right: 15, bottom: 340, left: 500, top2: 320},
        lines_width = width - lines_margin.left - lines_margin.right,
        lines_height = height - lines_margin.top - lines_margin.bottom

    var x = d3.scale.linear()
        .domain([0,200])
        .range([0, lines_width])

    var y2 = d3.scale.linear()
        .domain([0,240])
        .range([lines_height, 0])

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

    var yAxis2 = d3.svg.axis()
        .scale(y2)
        .orient("left")

    var line_g2 = svg.append("g")
                      .attr("transform", "translate(" + lines_margin.left + "," + lines_margin.top2 + ")")


    // history chart 2 axes

    var xa = line_g2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + lines_height + ")")
    xa
      .append("line")
        .attr("x1", x(0))
        .attr("x2", x(200))
        .attr("y1", 0)
        .attr("y2", 0)
    xa
      .append("text")
        .attr("x", x(200))
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text("time")

    var ya = line_g2.append("g")
        .attr("class", "y axis")
    ya
      .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", y2(0))
        .attr("y2", y2(240))
    ya
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "-0.5em")
        .style("text-anchor", "end")
        .style("fill", "#847c77")
        .text("demand")

    var ya2 = line_g2.append("g")
        .attr("class", "y axis")
    ya2
      .append("line")
        .attr("x1", x(200))
        .attr("x2", x(200))
        .attr("y1", y2(0))
        .attr("y2", y2(240))
    ya2
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", x(200))
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .style("fill", "#86C6BD")
        .text("inventory level")

    // text label at top of graph

    var graph_label_text = line_g2.append("g")

    graph_label_text.append("text")
      .attr("x", 80)
      .attr("y", 10)
      .attr("font-size", "14px")
      .attr("fill", "#847c77")
      .text("for a single stock keeping unit (SKU)")

    graph_label_text.append("path")
      .attr("fill", "#86C6BD")
      .attr("stroke", "#847c77")
      .attr("d", silhouette_outline_d(5, 50, 0))

  }

  if (show_q_t) {
    q_t_model_graph_axes()
  }

  inventory_management_sim(n_buckets, inputs, model)

  if (clothing_animation) {
    start_inventory_management_clothing_animation(show_q_t)
  }

  if (detailed_colors) {
    inventory_management_sim_detailed()
  }

}
