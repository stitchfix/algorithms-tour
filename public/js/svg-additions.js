
/*
add various generated elements to svg on load
which are then treated similarly to the svg elements placed a priori in the html file
(although some are also joined with data by d3 for convenience)
*/

// da-capo-inventory-cycle.js
color_legend()

// overview-sneakpeek.js
draw_overview_sneakpeek_labels()

// recsys.js
draw_algo_vis_boxes()
add_stylist_note()

// intelligent-logistics.js
draw_warehouse_animation_lines()

// da-capo-inventory-cycle.js
draw_inventory_cycle_animation_labels()


/*
other random things that must happen on load and/or on window resize
*/

// get starting-point data for paths from svg in html, used in human-computation.js
var hcomp_labs_paths_d = []
var hcomp_labs_paths_el = d3.selectAll("#stylist-ui-sketch-background > path, #stylist-ui-sketch-lines > path")
hcomp_labs_paths_el[0].forEach(function(path_el){
  hcomp_labs_paths_d.push(path_el.attributes.d.value)
})

// vertical centering of the foreground animation in the intro
var intro_foreground_top_padding = -150 + 0.35 * Math.pow( window.innerHeight, 2 ) / window.innerWidth
function center_intro_foreground(){
  intro_foreground_top_padding = -150 + 0.35 * Math.pow( window.innerHeight, 2 ) / window.innerWidth
  d3.select("#intro-area-svg-g-wrap")
    .transition().duration(0)
      .attr("transform", "translate(0," + intro_foreground_top_padding + ")")
}
center_intro_foreground()
window.onresize = function() {
  center_intro_foreground()
}

// onclick for phone-turn-sideways note
d3.select("#small-screen-note-turn-sideways-close").on("click", function(){
  d3.select("#small-screen-note-turn-sideways").remove()
})

// configure topic buttons
topic_buttons_config_on_load()

// configure the scrollerDisplay with the activateFunctions and progressFunctions in conductor.js
config_scrollerDisplay_on_load()
