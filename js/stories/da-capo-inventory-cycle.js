
function color_legend(){

  var legend_ids = ['legend-warehouse-assignment','legend-fix-requests', 'legend-client-profiles', 'legend-fix-selections',
                    'legend-stylist-notes', 'legend-feedback' ]

  legend_ids.forEach(function(id, i){
    d3.select("#" + id).select("circle").attr("fill", color_palette(i))
  })

}


function start_inventory_animation() {

  if (animation_state.inventory_animation_timer == false) {

    // vis config variables

    var width = 926,
        height = 665

    var svg = d3.select("#inventory-cycle")
        .attr("width", width)
        .attr("height", height)

    var start_clock_time = 0
    var speed = 0.0002 // ticks per millisecond

    var additional_y_padding = 250

    var outer_r = 190.8 + 20
    var inner_r = 140 + 20

    var center_x = 289 - 10 // width * 0.25
    var center_y_main = 380.5 - 10 // height * 0.5
    var center_y_in = -30 - additional_y_padding // center_y_main - outer_r - inner_r
    var center_y_out = height


    // make sure warehouse box is opaque white
    d3.select("#icycle-warehouses").select("rect")
      .attr("fill", "#fff")


    // internal state variables

    var next_event_i = 0
    var events_data = []
    var current_events = []
    var learning_current_events = []


    // mapping functions

    var coord_x_main = function(r,a) { return center_x + r * Math.cos(a) }
    var coord_y_main = function(r,a) { return center_y_main + r * Math.sin(a) }

    var coord_x_in = function(r,a) { return center_x + r * Math.cos(a) }
    var coord_y_in = function(r,a) { return center_y_in+ r * Math.sin(a) }

    var coord_x_out = function(r,a) { return center_x + r * Math.cos(a) }
    var coord_y_out = function(r,a) { return center_y_out + r * Math.sin(a) }

    var angle_main = function(t, t1, t2, e1, e2) {
      // compute angle in circle for a dot,
      // given its previous and next events, their timestamps, and the current time
      var rel_t
      if (t2 == t1) { rel_t = 1 }
      else { rel_t = (t - t1) / (t2 - t1) }
      var rel_e = e1 + rel_t * (e2 - e1)
      if (e1 > e2) { rel_e = e1 + rel_t * (3.0 - e1) }
      var a = (-90.0 + 180.0 * (rel_e - 1)) * (Math.PI/180.0)
      return a
    }

    var angle_in = function(t, t1, t2) {
      var rel_t
      if (t2 == t1) { rel_t = 1 }
      else { rel_t = (t - t1) / (t2 - t1) }
      var a = (180.0 - 90.0 * rel_t) * (Math.PI/180.0)
      return a
    }

    var angle_out = function(t, t1, t2) {
      var rel_t
      if (t2 == t1) { rel_t = 1 }
      else { rel_t = (t - t1) / (t2 - t1) }
      var a = (-90.0 - 90.0 * rel_t) * (Math.PI/180.0)
      return a
    }

    var learning_events_config = [
      {
        enter_time: 2000,
        p: 0.2,
        start_x: function(){ return 726.7 },
        start_y: function(){ return 350 },
        end_x: function(){ return 460 },
        end_y: function(){ return 0.5368 * 73 + 133.3951 + 3 }
      },
      {
        enter_time: 0,
        p: 0.1,
        start_x: function(){ return 380 },
        start_y: function(){ return 580 },
        end_x: function(){ return 726.7 },
        end_y: function(){ return 500 }
      },
      {
        enter_time: 0,
        p: 0.2,
        start_x: function(){ return 380 },
        start_y: function(){ return 600 },
        end_x: function(){ return 726.7 },
        end_y: function(){ return 520 }
      },
      {
        enter_time: 2000,
        p: 0.5,
        start_x: function(){ return 726.7 },
        start_y: function(){ return 370 },
        end_x: function(){ return 440 },
        end_y: function(){ return 0.5368 * 73 + 133.3951 + 3 }
      },
      {
        enter_time: 3000,
        p: 0.4,
        start_x: function(){ return 726.7 },
        start_y: function(){ return 440 },
        end_x: function(){ return 380 },
        end_y: function(){ return 530 }
      },
      {
        enter_time: 5000,
        p: 0.4,
        start_x: function(){ return 380 },
        start_y: function(){ return 620 },
        end_x: function(){ return 726.7 },
        end_y: function(){ return 540 }
      }
    ]

    var particle_count = 0

    // animation timer
    animation_state.inventory_animation_timer = d3.timer(function(t_ms) {

        if (t_ms > 1e5) {
          stop_animation_timer("inventory_animation_timer")
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
            d.t2 = d.t1 + 0.3 + Math.random() * 0.4
            if (d.e2 == 1) {
              d.e2 = 2
            } else if (d.e2 == 2) {
              if (Math.random() < 0.6) { d.e2 = 3; d.t2 = d.t1 + 0.5 * ( 0.3 + Math.random() * 0.4 ) }
              else { d.e2 = 1 }
            } else {
              removals.push(i)
            }
          }
        })

        for (var i=removals.length - 1; i>-1; i--){
          current_events.splice(removals[i],1)
        }

        // add some new particles, with some probability and random speed
        for (var i=0; i<2; i++) {
          if (Math.random() < 0.3) {
            particle_count += 1
            current_events.push({
                'particle_id': particle_count,
                'rad': inner_r + (outer_r - inner_r) * Math.random(),
                'sil': Math.floor(Math.random() * 14),
                't1': t,
                't2': t + 2.5 * 0.5 * ( 0.3 + Math.random() * 0.4 ),
                'e1': 0,
                'e2': 1
            })
          }
        }

        // d3 enter-update-exit pattern for inventory_items using current_events array

        var inventory_items = svg.selectAll(".inventory-cycle-silhouette")
                          .data(current_events, function(d) { return d.particle_id })

        inventory_items.enter().append("path")
          .attr("class", "inventory-cycle-silhouette")
          .attr("fill", "#fff")
          .attr("stroke", "#000")
          .attr("stroke-width", 0.5)
          .attr("opacity", 1e-6)
          .attr("d", function(d) { return silhouette_outline_d(d.sil, 290, 0) })

        inventory_items
          .attr("opacity", function(d){
            if (d.e1 == 0){
              var rel_t = (t - d.t1) / (d.t2 - d.t1)
              return Math.min(1, rel_t * 2)
            } else {
              return 1
            }
          })
          .attr("d", function(d){

              var tx = 0
              var ty = 0

              if (d.e1 == 0) {
                var new_rad = inner_r + (outer_r - d.rad)
                if (coord_y_in(new_rad, angle_in(t, d.t1, d.t2, d.e1, d.e2)) > center_y_main - outer_r + new_rad) {
                  tx = coord_x_in(new_rad, angle_in(t, d.t1, d.t2, d.e1, d.e2))
                } else {
                  tx = -90 + d.rad * 2
                }
              } else if (d.e2 == 3) {
                //var new_rad = inner_r + (outer_r - d.rad)
                //return coord_x_main(d.rad, angle_main(t, d.t1, d.t2, d.e1, d.e2))
                tx = 280
              } else {
                tx = coord_x_main(d.rad, angle_main(t, d.t1, d.t2, d.e1, d.e2))
              }

              if (d.e1 == 0) {
                var new_rad = additional_y_padding + inner_r + (outer_r - d.rad)
                ty = coord_y_in(new_rad, angle_in(t, d.t1, d.t2, d.e1, d.e2))
              } else if (d.e2 == 3) {
                //var new_rad = inner_r + (outer_r - d.rad)
                //return coord_y_out(new_rad, angle_out(t, d.t1, d.t2, d.e1, d.e2))
                ty = 550
              } else {
                ty = coord_y_main(d.rad, angle_main(t, d.t1, d.t2, d.e1, d.e2))
              }

              return silhouette_outline_d(d.sil, tx, ty)

            })

        inventory_items.exit().remove()

        // learning events
        for (var learning_i=0; learning_i < learning_events_config.length; learning_i++) {

          if ((Math.random() < learning_events_config[learning_i].p) && (t_ms > learning_events_config[learning_i].enter_time)) {
            learning_current_events.push({
              'id': '' + t + '_' + learning_i,
              'start_time': t, 'end_time': t+0.35,
              'start_x': learning_events_config[learning_i].start_x(),
              'start_y': learning_events_config[learning_i].start_y(),
              'end_x': learning_events_config[learning_i].end_x(),
              'end_y': learning_events_config[learning_i].end_y(),
              'color': learning_i
            })
          }
        }

        var learning_removals = []
        learning_current_events.forEach(function(d,i){
          d.dt = (t - d.start_time) / (d.end_time - d.start_time)
          if (d.dt > 1) { learning_removals.push(i) }
        })

        for (var i=learning_removals.length - 1; i>-1; i--){
          learning_current_events.splice(learning_removals[i],1)
        }

        learning_items = svg.selectAll(".learning-item")
                            .data(learning_current_events, function(d) { return d.id })

        learning_items.enter().append("text")
             .attr("class", "learning-item")
             .attr("font-size", "10px")
             .attr("fill", function(d){ return color_palette(d.color) })
             .style("font-weight", 800)
             .text(function(d){
                 if (Math.random() < 0.5){
                   return "0"
                 } else {
                   return "1"
                 }
               })

        learning_items
             .attr("transform", function(d){
                  var x = (1 - d.dt) * d.start_x + d.dt * d.end_x
                  var y = 5 + (1 - d.dt) * d.start_y + d.dt * d.end_y
                  var angle = -14
                  if (d.color == 0 || d.color == 3) { angle = 33}
                  return "translate(" + x + "," + y + ") rotate(" + angle + ")"
                })

        learning_items.exit().remove()


    })

  }

}


function draw_inventory_cycle_animation_labels(){

  // feedback
  d3.select("#inventory-cycle-sim-labels").append("text")
    .attr("class", "inventory-cycle-sim-persistent-text")
    .attr("x", 550)
    .attr("y", 595)
    .attr("text-anchor", "start")
    .attr("transform", "rotate(-14,550,595)")
    .text("feedback")

  // request
  d3.select("#inventory-cycle-sim-labels").append("text")
    .attr("class", "inventory-cycle-sim-persistent-text")
    .attr("x", 550)
    .attr("y", 565)
    .attr("text-anchor", "start")
    .attr("transform", "rotate(-14,550,565)")
    .text("client data")

  // profiles
  d3.select("#inventory-cycle-sim-labels").append("text")
    .attr("class", "inventory-cycle-sim-persistent-text")
    .attr("x", 550)
    .attr("y", 535)
    .attr("text-anchor", "start")
    .attr("transform", "rotate(-14,550,535)")
    .text("requests")

  // stylist notes
  d3.select("#inventory-cycle-sim-labels").append("text")
    .attr("class", "inventory-cycle-sim-persistent-text")
    .attr("x", 550)
    .attr("y", 505)
    .attr("text-anchor", "start")
    .attr("transform", "rotate(-14,550,505)")
    .text("stylist notes")

  // item selections
  d3.select("#inventory-cycle-sim-labels").append("text")
    .attr("class", "inventory-cycle-sim-persistent-text")
    .attr("x", 550)
    .attr("y", 275)
    .attr("text-anchor", "start")
    .attr("transform", "rotate(33,550,275)")
    .text("item selections")

  // warehouse assignments
  d3.select("#inventory-cycle-sim-labels").append("text")
    .attr("class", "inventory-cycle-sim-persistent-text")
    .attr("x", 550)
    .attr("y", 225)
    .attr("text-anchor", "start")
    .attr("transform", "rotate(33,550,225)")
    .text("warehouse assignments")

  // delivery
  d3.select("#inventory-cycle-sim-labels").append("text")
    .attr("class", "inventory-cycle-sim-persistent-text")
    .attr("x", 490)
    .attr("y", 400)
    .attr("text-anchor", "end")
    .text("deliveries")

  // return
  d3.select("#inventory-cycle-sim-labels").append("text")
    .attr("class", "inventory-cycle-sim-persistent-text")
    .attr("x", 85.5)
    .attr("y", 400)
    .text("returns")

}

