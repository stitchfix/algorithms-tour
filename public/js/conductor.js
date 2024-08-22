// This file is the orchestral conductor for the animation, coordinating what plays when.
//
// For each <section> (with class="step") in the index.html file, this file contains:
//    (1) an "activate" function, which is called when the scrolled position switches sections, and
//    (2) an "update" function, which is called when the scrolled position changes within a section
//
// Note that the "update" functions are functions of "progress", which is the relative position
// within the section

var activateFunctions = []
var updateFunctions = []

// Ultimately, the "activate" and "update" functions get used by the
// scrollerDisplay function, which is found in the scrolling-lib directory

function config_scrollerDisplay_on_load(){
  scrollerDisplay(d3.select('#graphic'), 'step', [1, 1], activateFunctions, updateFunctions)
}

// Occasionally we'll need to keep track of the page's state,
// which we'll do with this object:

var page_state = {
  current_highlighted_topic: "",
  current_footer: "",
  topic_buttons_on: false,
  fit_scroll_prev_loc: -1,
  hcomp_labs_open: false,
  state_machines_show_selected_client: true,
}

// And we'll be managing a lot of d3.timer and setInterval functions,
// so we'll keep track of them here

var animation_state = {
  intro_matching_background_interval: false,
  intro_matching_interval: false,
  overview_animation_interval: false,
  overview_animation_interval2: false,
  movie_stopwatch_timer: false,
  movie_stopwatch_interval: false,
  latent_size_animation_interval: false,
  lda2vec_animation_interval: false,
  mm2vec_animation_interval: false,
  icycle2vec_animation_interval: false,
  single_fix_sim_timer: false,
  inventory_animation_timer: false,
  state_machine_animation_interval: false,
  state_machine_animation_force: false,
  inventory_management_sim_timer: false,
  inventory_management_sim_detailed_timer: false,
  inventory_management_clothing_animation_timer: false,
  inventory_management_sim_model_timer: false,
  frankenstyle_animation_interval: false,
  data_platform_animation_timer: false
}


// For orientation, the leading words of text in the associated html <section> are included here
// above each pair of "activate" and "update" functions.


// All set. Enter action! ...


/* (intro, empty section) */

activateFunctions.push( function(){

  // view management
  hide_topics()
  update_footer("")
  highlight_svg_groups([])

  // run intro animation
  intro_slide()

  // for upward-scrollers, bring overview "sneakpeek" back to its starting state
  overview_sneakpeek(0)
  overview_reset()
  d3.selectAll('#sketch-styling-circle, #sketch-inventory, #sketch-clients, #sketch-client-selected')
    .transition().duration(0)
      .attr("display", "none")
      .style("opacity", 0)

})

updateFunctions.push(function(progress) {

  // ease in the business model images / animation (unusual case, not in pattern with others below)
  var window_position = window.pageYOffset / window.innerHeight
  if (window_position > 0.9) {
    d3.selectAll('#sketch-styling-circle, #sketch-inventory, #sketch-clients, #sketch-client-selected')
      .transition().duration(0)
        .attr("display", "block")
        .style("opacity", Math.min(1, (window_position - 0.9) / 0.2))
  } else {
    d3.selectAll('#sketch-styling-circle, #sketch-inventory, #sketch-clients, #sketch-client-selected')
      .transition().duration(0)
        .attr("display", "none")
        .style("opacity", 0)
  }

})


/* Our business model enables unprecedented data science... */

activateFunctions.push( function(){

  // view management
  show_topics()
  highlight_topics([])
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2015/07/07/personalizing-beyond-the-point-of-no-return/" target="_">Personalizing Beyond the Point of No Return</a>')
  highlight_svg_groups(['sketch-styling-circle','sketch-inventory','sketch-clients','sketch-client-selected'])

  // turn off intro animation
  stop_intro_animation()

  // prepare the "sneakpeek" svg elements for action by displaying them but at zero opacity, they'll get used below
  d3.selectAll("#sketch-stylist, #sketch-machines, #sketch-styling-circle, #sketch-stylingAlgo, #sketch-animation-labels, #sketch-animation")
    .transition().duration(0)
      .attr("display", "block")

})

updateFunctions.push( function(progress){

  // semi-hidden foreshadowing
  overview_sneakpeek(progress)

})


/* So what does the data look like? In addition to the rich feedback data... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([])
  highlight_svg_groups(['sketch-inventory','sketch-clients','sketch-client-selected','sketch-styling-circle','sketch-client-profile','sketch-clothing-profile','sketch-client-profile','sketch-clothing-profile'])

  // bring overview "sneakpeek" to its fully completed state (which is like its starting state)
  overview_sneakpeek(1)
  overview_reset()

})

updateFunctions.push( function(progress){})


/* Let's first walk through the filling of a shipment request... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([])
  highlight_svg_groups([])

})

updateFunctions.push( function(progress){

  // swing clients and styles around to vertical from horizontal, and bring out selected client

  var progress2 = Math.max(0, Math.min(1, -1 + progress * 2.5))
  var r = 225

  d3.select("#sketch-inventory")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(" + (-r + r * Math.cos(progress2 * Math.PI / 2) ) + "," + (-r * Math.sin(progress2 * Math.PI / 2) ) + ")")

  d3.selectAll("#sketch-client-selected")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, Math.min(1, 4 - 5 * progress)))
      .attr("transform", "translate(" + (80 * progress2) + "," + (175 * progress2) + ")")

  d3.selectAll("#sketch-clients")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(" + (r - r * Math.cos(progress2 * Math.PI / 2) ) + "," + (r * Math.sin(progress2 * Math.PI / 2) ) + ")")

  d3.select("#client1")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, Math.min(1, -4 + 6 * progress)))
      .attr("transform", "translate(" + (125 - 100 + 100 * progress2) + "," + (300 - 150 + 150 * progress2) + ") scale(" + 0.5 + ")")

})


// Client Experience Part 1: Profile & Request
/* As noted, when a client first signs up, he or she fills out a Style Profile... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([])
  highlight_svg_groups([])

  // update url. note: this usually happens in the "highlight_topics" call, but this section is not a topic but still gets a url link
  history.pushState({}, "", "#client-experience-part-1")

})

updateFunctions.push(function(progress) {

  // bring forth client1!
  var progress2 = Math.min(1,progress*4)
  d3.select("#client1")
    .style("opacity", 1)
    .transition().duration(0)
      .attr("transform", "translate(" + (125*(1-progress2)) + "," + (300*(1-progress2)) + ") scale(" + (0.5 + 0.5 * progress2) + ")")

  // and show me the forms
  d3.select("#client-exp-1")
    .attr("display", "block")
    .transition().duration(0)
      .style("opacity", Math.max(0, Math.min(1, -2 + progress * 8)))

  // this is the first call to the code in single-fix-progression.js,
  // which will carry our accumulated info around the fix
  fix_progression('start', progress)

})


// Warehouse Assignment
/* The shipment request is processed by an algorithm that assigns it to a warehouse... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['warehouse-assignment'])
  highlight_svg_groups(['calendar','profile','wh2'])

  // fix info to bottom right
  fix_progression('start', 1)

  // "swa" = "smart warehouse assignment". this call just sets things up.
  swa_0()

})

updateFunctions.push(function(progress){

  // fade in the map
  d3.select("#swa-map-outline")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.min(1, 4 * progress))

  // this call unveils the cost calc for each warehouse
  swa_0_progress(progress)

})


/* This set of cost calculations is carried out for each client to produce a cost matrix. */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['warehouse-assignment'])
  highlight_svg_groups(['calendar','profile','wh2','swa-label-cost-matrix','swa-cost-calc','swa-cost-matrix','swa-map-outline','swa-cost-matrix-top-line'])

  // the client image is hidden now, just putting it back in its original place
  d3.select("#client1").attr("transform", "translate(0,0) scale(1)")

  // fix info still at bottom right
  fix_progression('start', 1)

  // sets up the many clients dots on the map
  swa_1()

})

updateFunctions.push(function(progress){

  // you get the idea
  swa_1_progress(progress)

})


/* The assignment of clients to warehouses is then a binary optimization problem. */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['warehouse-assignment'])
  highlight_svg_groups(['calendar','profile','wh2','swa-label-cost-matrix','swa-label-opt','swa-opt-function','swa-cost-calc','swa-cost-matrix','swa-map-outline','swa-cost-matrix-top-line'])

  // and still it rests
  fix_progression('start', 1)

  // pretty colors!
  swa_1_progress(1)
  swa_2()

})

updateFunctions.push(function(progress) {

  // pretty colors!
  swa_3(Math.min(1, progress * 2))

})


/* And the global optimum includes this particular client's warehouse assignment. */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['warehouse-assignment'])
  highlight_svg_groups(['calendar','profile','wh2','swa-label-cost-matrix','swa-label-opt','swa-assignment-matrix','swa-opt-function','swa-cost-calc','swa-cost-matrix','swa-map-outline','swa-cost-matrix-top-line'])

  // still there, but wait for it
  fix_progression('start', 1)

  // texas all the way
  swa_4()

})

updateFunctions.push(function(progress) {

  // TX joins the info collection that we're carrying around
  fix_progression('swa', Math.max(0, -1.5 + 2.5 * progress))

  // highlight the winner and fade the rest out
  swa_4_progress(progress)

})


/* The shipment request is then routed to the Humans + Machines styling algorithm. */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2014/07/21/machine-and-expert-human-resources/" target="_">Machine and Expert-Human Resources: A Synthesis of Art and Science for Recommendations</a>')
  highlight_topics(['warehouse-assignment'])
  highlight_svg_groups(['calendar','profile','wh2'])

  // machines image at rest
  d3.select("#machines")
    .attr("transform", "translate(0,0) scale(1)")

})

updateFunctions.push(function(progress) {

  // fade out the smart-warehouse-assignment material
  d3.selectAll("swa-label-cost-matrix, #swa-label-opt, #swa-assignment-matrix, #swa-opt-function, #swa-cost-calc, #swa-cost-matrix, #swa-map-outline, #swa-cost-matrix-top-line")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, 1 - 2 * progress))

  // fade in the human-machine styling algo
  d3.selectAll("#machines, #humans, #humans-unselected, #the-algo")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.min(1, 2 * progress))

  // move the info collection to the styling algo
  fix_progression('to_algo', progress)

})


// Intelligent Machines
/* First, the machines perform a variety of algorithms to produce rank-ordered lists of the inventory. */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','humans','humans-unselected','m-algo','calendar','profile','wh2'])

  // reset recsys algo progression bits to starting points
  undo_filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'))
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)

  // show the "inventory" label next to the matrix of clothing
  d3.select(".inventory-text-on-vis")
    .text("inventory")
    .transition().duration(200)
      .style("opacity", 1)

})

updateFunctions.push(function(progress) {

  // finish moving the info collection to rest on top of the machines
  fix_progression('to_machines', progress)

  // make the machines bigger
  d3.select("#machines")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(" + (-435 * progress) + "," + (-252 * progress) + ") scale(" + (1 + 0.5 * progress) + ")")

  // and the human stylists smaller
  d3.selectAll("#humans, #humans-unselected")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1 - progress)

  // fade in the clothing matrix, getting ready for the show
  d3.select('#animation-zone-algo-vis')
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", progress)

})


/* A filtering step removes styles from consideration... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis'])

  // filter the styles
  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)

  // but leave them in place and keep the arcs and legend labels hidden for the moment
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([0,0,0,0])

  // fade out the "inventory" label
  d3.select(".inventory-text-on-vis")
    .transition().duration(200)
      .style("opacity", 1e-6)

  // we'll rest here for a while
  fix_progression('to_machines', 1)

  // machines at their biggest
  d3.select("#machines")
    .attr("transform", "translate(-435,-252) scale(1.5)")

})

updateFunctions.push(function(progress) {})


/* For each of the remaining styles, the machines then try to evaluate the relative likelihood... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base'])

  // and keep the styles filtered and in their starting place
  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([0,0,0,0])

  // just hangin
  fix_progression('to_machines', 1)

})

updateFunctions.push(function(progress) {})


/* In some ways, the problem is a classic collaborative filtering problem... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','rec-sys-match-scores','rec-sys-match-row-text'])

  // show the collaborative filtering arc and legend entry
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,false,false,false])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([1,0,0,0])

  // yup
  fix_progression('to_machines', 1)

})

updateFunctions.push(function(progress) {})


/* However, unlike most collaborative filtering problems, we have a lot of explicit data... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','rec-sys-match-scores','rec-sys-explicit-features'])

  // still showing the single arc and legend entry
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,false,false,false])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([1,0,0,0])

  // still
  fix_progression('to_machines', 1)

})

updateFunctions.push(function(progress) {})


/* One such approach is mixed-effects modeling... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2015/07/14/glmms/" target="_">Learning from the experience of others with mixed effects models</a>')
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','recsyslegend-mem','rec-sys-match-scores','rec-sys-explicit-features','mixed-effects-equation'])

  // add the mixed-effects arc and legend entry
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,true,false,false])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([1,1,0,0])

  // ...
  fix_progression('to_machines', 1)

})

updateFunctions.push(function(progress) {})


/* And in addition to the many explicit features available, there are some particularly pertinent latent (unstated) features... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','recsyslegend-mem','rec-sys-match-scores','rec-sys-explicit-features','rec-sys-latent-features'])

  // still showing just the two arcs and legend entries
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,true,false,false])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([1,1,0,0])

  // will be here for a while
  fix_progression('to_machines', 1)

  // for upward-scrollers - turning off the latent size animation
  page_state.fit_scroll_prev_loc = -1
  stop_animation_interval("latent_size_animation_interval")
  stop_animation_interval("latent_size_meta1_interval")
  stop_animation_interval("latent_size_meta2_interval")

})

updateFunctions.push(function(progress) {})


/* For example, a new client may tell us that she wears medium-sized blouses, but where exactly... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','recsyslegend-mem','rec-sys-match-scores','rec-sys-explicit-features','rec-sys-latent-features','animated-fit-learning-narrative'])

  // still showing just the two arcs and legend entries
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,true,false,false])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([1,1,0,0])

  // chillin
  fix_progression('to_machines', 1)

  // showing the first two of the latent size animations
  stop_animation_interval("latent_size_meta2_interval")
  if (page_state.fit_scroll_prev_loc != 0) { latent_size_animation_1() }
  page_state.fit_scroll_prev_loc = 0

  // movie stopwatch, so you know to put your feet up
  d3.select("#movie-stopwatch")
    .attr("display", "block")
    .style("opacity", 0.8)
    .attr("transform", "translate(930, 300) scale(1.5)")
    .transition().duration(1000)
      .attr("transform", "translate(810, 300) scale(1.5)")
    .transition().delay(4000).duration(1000)
      .attr("transform", "translate(930, 300) scale(1.5)")
  run_movie_stopwatch(3000, 2)

})

updateFunctions.push(function(progress) {})


/* With clients' fit feedback and purchase histories, we can learn where particular clients and styles fall along this spectrum... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','recsyslegend-mem','rec-sys-match-scores','rec-sys-explicit-features','rec-sys-latent-features','animated-fit-learning-narrative'])

  // still showing just the two arcs and legend entries
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,true,false,false])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([1,1,0,0])

  //
  fix_progression('to_machines', 1)

  // and the last two of the latent size animations
  stop_animation_interval("latent_size_meta1_interval")
  if (page_state.fit_scroll_prev_loc != 2) { latent_size_animation_2() }
  page_state.fit_scroll_prev_loc = 2

  // movie stopwatch, so you know to put your feet up
  d3.select("#movie-stopwatch")
    .attr("display", "block")
    .style("opacity", 0.8)
    .attr("transform", "translate(930, 300) scale(1.5)")
    .transition().duration(1000)
      .attr("transform", "translate(810, 300) scale(1.5)")
    .transition().delay(6000).duration(1000)
      .attr("transform", "translate(930, 300) scale(1.5)")
  run_movie_stopwatch(5000, 2)

})

updateFunctions.push(function(progress) {})


/* Moving our problem even further beyond classical collaborative filtering, we also have a lot of photographic and textual data... */

activateFunctions.push( function(){

  // view management
  update_footer('')
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','recsyslegend-mem','rec-sys-match-scores','rec-sys-explicit-features','rec-sys-latent-features'])

  // still showing just the two arcs and legend entries
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,true,false,false])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([1,1,0,0])

  // for downward-scollers - turning off the latent size animation
  page_state.fit_scroll_prev_loc = 4
  stop_animation_interval("latent_size_animation_interval")
  stop_animation_interval("latent_size_meta1_interval")
  stop_animation_interval("latent_size_meta2_interval")

})

updateFunctions.push(function(progress) {

  // fade out the expanding table illustration
  d3.selectAll("#rec-sys-match-scores, #rec-sys-explicit-features, #rec-sys-latent-features")
    .style("opacity", 1-progress)

})


/* Sometimes it can be difficult to describe your style preferences in words, but you know it when you see it... */

activateFunctions.push( function(){

  // view management
  update_footer('blog posts: <a href="http://multithreaded.stitchfix.com/blog/2015/09/17/deep-style/" target="_">Deep Style</a>, <a href="http://multithreaded.stitchfix.com/blog/2016/02/04/computer-vision-state-of-the-art/" target="_">Unsupervised Computer Vision</a>')
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','recsyslegend-mem','recsyslegend-cnn'])

  // adding a third arc and legend entry - neural networks
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,true,true,false])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)
  algo_legend_labels([1,1,1,0])

  // yup, still here
  fix_progression('to_machines', 1)

  // for upward-scrollers - stopping the lda2vec animation (next section)
  stop_animation_interval("lda2vec_animation_interval")
  remove_complex_pairs_stuff("lda2vec")

  // neural network animation
  animate_nn()

  // movie stopwatch, so you know to put your feet up
  d3.select("#movie-stopwatch")
    .attr("display", "block")
    .style("opacity", 0.8)
    .attr("transform", "translate(-60, 300) scale(1.5)")
    .transition().duration(1000)
      .attr("transform", "translate(23.5, 300) scale(1.5)")
    .transition().delay(11000).duration(1000)
      .attr("transform", "translate(-60, 300) scale(1.5)")
  run_movie_stopwatch(5000, 3)

})

updateFunctions.push(function(progress) {})


/* Natural language processing is used to score items based on the client's request note and textual feedback from other clients... */

activateFunctions.push( function(){

  // view management
  update_footer('blog posts: <a href="http://multithreaded.stitchfix.com/blog/2015/03/11/word-is-worth-a-thousand-vectors/" target="_">A Word is Worth a Thousand Vectors</a>, <a href="http://multithreaded.stitchfix.com/blog/2016/05/27/lda2vec/" target="_">Hybrid lda2vec Algorithm</a>')
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis','recsyslegend-base','recsyslegend-colfil','recsyslegend-mem','recsyslegend-cnn','recsyslegend-nlp','lda2vec-basis','lda2vec-text','lda2vec-blueboxes','lda2vec-orangebox','lda2vec-greenarrows','lda2vec-orangearrows'])

  // adding the last arc and legend text - natural language processing
  color_boxes_by_algo_score(d3.select('#animation-zone-algo-vis'), algo_scores, [true,true,true,true])
  algo_legend_labels([1,1,1,1])
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)

  // but still here
  fix_progression('to_machines', 1)

  // for upward-scrollers - removing the "ranking" label
  d3.select(".inventory-text-on-vis")
    .transition().duration(200)
      .style("opacity", 1e-6)

  // running the lda2vec animation
  start_lda2vec_animation()

})

updateFunctions.push(function(progress) {})


/* All of these algorithm scores—and many others like them—are taken into account when ordering and presenting options for the human... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['recommendation-systems'])
  highlight_svg_groups(['machines','m-algo','calendar','profile','wh2','animation-zone-algo-vis'])

  // almost ready to move on
  fix_progression('to_machines', 1)

  // show the "ranking process" text above the matrix
  d3.select(".inventory-text-on-vis")
    .text("ranking process")
    .transition().duration(200)
      .style("opacity", 1)

  // for downward-scrollers - turning off the lda2vec animation
  stop_animation_interval("lda2vec_animation_interval")
  remove_complex_pairs_stuff("lda2vec")

  // for upward-scrollers - machines at their biggest
  d3.select("#machines")
    .attr("transform", "translate(-435,-252) scale(1.5)")

})

updateFunctions.push( function(progress){

  // fun ranking move
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), progress )

  // fade out the recsys legend
  d3.selectAll('#recsyslegend-base, #recsyslegend-colfil, #recsyslegend-mem, #recsyslegend-cnn, #recsyslegend-nlp').style('opacity', 1 - progress)
  d3.selectAll('.algo-name-text-1, .algo-name-text-2, .algo-name-text-3, .algo-name-text-4').style('opacity', 1 - progress)

  // fade in the human sylists
  d3.selectAll("#humans, #humans-unselected")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", progress)
      .attr("transform", "translate(0,0) scale(1)")

})


// Matchmaking
/* Once this machine ranking is complete, the shipment request gets routed to a human... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['matchmaking'])
  highlight_svg_groups(['machines','humans','humans-unselected','stylist-extras','calendar','profile','wh2','g-algo','g-arrows','animation-zone-algo-vis'])

  // make sure the inventory images come to rest in their proper place
  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 1)

  // fade out the text above the matrix
  d3.select(".inventory-text-on-vis")
    .transition().duration(200)
      .style("opacity", 1e-6)

  // for upward-scollers - turn off matchmaking animation
  stop_animation_interval("mm2vec_animation_interval")
  remove_simple_pairs_stuff("mm2vec")

  // bring matchscore calc equation back to its initial position
  d3.select("#mm-matchscore-calc")
    .transition().duration(0)
      .attr("display", "none")
      .style("opacity", 0)
      .attr("transform", "translate(450,0)")

  // selected human icon at its original size
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(0,0) scale(1)")

})

updateFunctions.push(function(progress) {

  // and finally our info collection moves upward to the "matchmaking" point
  fix_progression('to_matchmaking', progress)

  // and the machines get smaller again
  d3.select("#machines")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(" + (-435 * (1-progress)) + "," + (-252 * (1-progress)) + ") scale(" + (1 + 0.5 * (1-progress)) + ")")
})


/* To do this, we first calculate a match score between each available stylist and each client... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['matchmaking'])
  highlight_svg_groups(['machines','humans','humans-unselected','stylist-extras','calendar','profile','wh2','g-algo','g-arrows','animation-zone-algo-vis','mm-matchscore-calc','mm2vec-greenbox','mm2vec-blueboxes','mm2vec-greenarrows'])

  // hanging out in matchmaking land
  fix_progression('to_matchmaking', 1)

  // make sure the clothing is lined up properly
  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 1)

  // run the matchmaking animation
  start_mm2vec_animation()

  // machines are back to their original size
  d3.select("#machines")
    .attr("transform", "translate(0,0) scale(1)")

  // selected human icon at its original size
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(0,0) scale(1)")

})

updateFunctions.push(function(progress) {

  // move matchscore calc equation to top left position
  d3.select("#mm-matchscore-calc")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(" + (450 * Math.min(1, 2 - 2 * progress)) + ",0)")

})


/* Subsequently, the stylist assignment optimization problem is similar to the warehouse assignment problem... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['matchmaking'])
  highlight_svg_groups(['machines','humans','humans-unselected','stylist-extras','calendar','profile','wh2','g-algo','g-arrows','animation-zone-algo-vis','swa-label-cost-matrix','swa-label-opt','mm-matchscore-calc','mm-opt-function','mm-cost-matrix','mm-assignment-matrix'])

  // hangin
  fix_progression('to_matchmaking', 1)

  // makin sure we're lined up
  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 1)

  // for upward-scrollers - making sure the selected human is back to the right size
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(0,0) scale(1)")

  // for downward-scrollers - turn off the matchmaking animation
  stop_animation_interval("mm2vec_animation_interval")
  remove_simple_pairs_stuff("mm2vec")

  // bring matchscore calc equation back to its initial position
  d3.select("#mm-matchscore-calc")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(0,0)")

})

updateFunctions.push(function(progress) {

  // fade out the unselected human stylists
  d3.selectAll('#humans-unselected, #stylist-extras')
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1-progress)

  // and their associated pointer lines
  d3.selectAll('#g-arrow-unselected1, #g-arrow-unselected2')
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1-progress)

})



// Intelligent Humans with Intelligent Tools
/* While machines are great for tasks involving rote calculations, there are other tasks... */

activateFunctions.push( function(){

  // view management
  update_footer('')
  highlight_topics(['human-computation'])
  highlight_svg_groups(['machines','humans','calendar','profile','wh2','h-algo','animation-zone-algo-vis'])

  // still lined up properly
  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 1)

  // if scrolling down, unfurl the interface. if scrolling up, tuck it away.
  if (page_state.hcomp_labs_open) {
    hide_hcomp_labs()
    page_state.hcomp_labs_open = false
  }
  else { show_hcomp_labs_flat() }

})

updateFunctions.push(function(progress) {

  // fade out the matchmaking material
  d3.selectAll("swa-label-cost-matrix, #swa-label-opt, #mm-matchscore-calc, #mm-opt-function, #mm-cost-matrix, #mm-assignment-matrix")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, 1 - 4 * progress))

  // on the move again
  fix_progression('to_humans', progress)

  // making the selected stylist image bigger
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(" + (-400 * (progress)) + "," + (-200 * (progress)) + ") scale(" + (1 + 0.5 * (progress)) + ")")

})


/* To begin styling a shipment, a stylist picks up a task in a custom-built interface... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/04/14/hcomp2/" target="_">Machine Learning To Kickstart Human Training</a>')
  highlight_topics(['human-computation'])
  highlight_svg_groups(['machines','humans','calendar','profile','wh2','h-algo','animation-zone-algo-vis',"stylist-ui-sketch-background","stylist-ui-sketch-lines"])

  // still lined up
  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 1)

  // if the interface is not open (e.g. if the page loads at this location), then open it after a slight delay
  setTimeout(function(){
    if (!page_state.hcomp_labs_open) {
      show_hcomp_labs()
      page_state.hcomp_labs_open = true
    }
  }, 500)

  // solidly in the human realm
  fix_progression('to_humans', 1)

  // and the selected human has reached their full size
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(-400,-200) scale(1.5)")

})

updateFunctions.push(function(progress) {
})


/* Our human computation team does a lot of testing with variations on this interface... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/04/14/hcomp2/" target="_">Machine Learning To Kickstart Human Training</a>')
  highlight_topics(['human-computation'])
  highlight_svg_groups(['machines','humans','calendar','profile','wh2','h-algo','animation-zone-algo-vis',"stylist-ui-sketch-background","stylist-ui-sketch-lines","hcomp-labs-ab"])

  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 1)
  fix_progression('to_humans', 1)

  // unfurl the interface if not already unfurled
  if (!page_state.hcomp_labs_open) {
    show_hcomp_labs()
    page_state.hcomp_labs_open = true
  }

  // selected human at their biggest
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(-400,-200) scale(1.5)")

})

updateFunctions.push(function(progress) {
})


/* This knowledge helps us in many ways: to improve our algorithmic styling, to improve our stylist training... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/04/14/hcomp2/" target="_">Machine Learning To Kickstart Human Training</a>')
  highlight_topics(['human-computation'])
  highlight_svg_groups(['machines','humans','calendar','profile','wh2','h-algo','animation-zone-algo-vis',"stylist-ui-sketch-background","stylist-ui-sketch-lines"])

  // chillin
  fix_progression('to_humans', 1)

  // inventory matrix in the right state
  filter_algo_vis_boxes(d3.select('#animation-zone-algo-vis'), rule_filter)
  move_algo_boxes(d3.select('#animation-zone-algo-vis'), 1)
  stylist_select_algo_boxes(d3.select('#animation-zone-algo-vis'), 0)

  // if scrolling down, tuck away the interface. if scrolling up, unfurl it.
  if (page_state.hcomp_labs_open) {
    hide_hcomp_labs()
    page_state.hcomp_labs_open = false
  }
  else {
    show_hcomp_labs()
    page_state.hcomp_labs_open = true
  }

  // selected human at their biggest
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(-400,-200) scale(1.5)")

  // getting ready for the stylist note animation
  d3.select(".stylist_note_dot")
    .style("opacity", 1e-6)
    .transition().duration(0)
      .attr("d", stylist_note_tween(0))

})

updateFunctions.push(function(progress) {
})


/* Ultimately, the stylist finalizes the selections from the inventory list and writes a personal note... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['human-computation'])
  highlight_svg_groups(['machines','humans','calendar','profile','wh2','animation-zone-algo-vis','stylist-note-animation'])

  // chillin
  fix_progression('to_humans', 1)

  // human still at its biggest
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(-400,-200) scale(1.5)")

  // show the stlyist note
  d3.select(".stylist_note_dot")
    .style("opacity", 1)

})

updateFunctions.push( function(progress){

  // typing animation
  stylist_note_typing_animation(progress)

  // selection animation
  stylist_select_algo_boxes(d3.select('#animation-zone-algo-vis'), progress)

})


/* This wraps up the styling procedure, and the shipment is now ready to be processed. */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([])
  history.pushState({}, "", "#human-computation")
  highlight_svg_groups(['machines','humans','calendar','profile','wh2','animation-zone-algo-vis','the-algo','icycle-newlabel-sr'])

  // following fix around
  fix_progression('to_humans', 1)

  // fix selection complete, silhouettes in their proper place below the other fix info
  stylist_select_algo_boxes(d3.select('#animation-zone-algo-vis'), 1)

  // overriding the above highlight_svg_groups timing for this handoff
  d3.select("#logistics-fix-sim").transition().duration(0).style("opacity",0)
  d3.selectAll("#calendar, #profile, #wh2, #animation-zone-algo-vis")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

})

updateFunctions.push(function(progress) {

  // move the silhouettes and the other fix information to the warehouse
  move_to_logistics(Math.max(0, -1 + 2 * progress))
  fix_progression('to_logistics', progress)

  // bring warehouse into view
  d3.selectAll("#icycle-warehouses, #icycle-machines")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", progress)

  // shrink the human stylist back to their small size
  var progress2 = Math.min(1, progress * 2)
  d3.select("#humans")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(" + (-400 * (1 - progress2)) + "," + (-200 * (1 - progress2)) + ") scale(" + (1 + 0.5 * (1 - progress2)) + ")")

})


// Intelligent Logistics
/* Various operations research problems can be found in this processing step. */

activateFunctions.push( function(){

  // view management
  update_footer('')
  highlight_topics(['logistics-optimization'])
  highlight_svg_groups(['calendar','profile','wh2','icycle-warehouses','icycle-machines','logistics-fix-sim'])

  // following the fix, accruing info
  fix_progression('to_logistics', 1)

  // overriding the above highlight_svg_groups timing for this handoff
  d3.selectAll("#animation-zone-algo-vis, #humans, #machines, #the-algo, #icycle-newlabel-sr")
    .transition().duration(0)
      .style("opacity",0)
  d3.selectAll("#logistics-fix-sim , #icycle-warehouses, #icycle-machines")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

  // making sure human stylist is at their smallest size
  d3.select("#humans")
    .transition().duration(0)
      .style("opacity", 0)
      .attr("transform", "translate(0,0) scale(1)")

  // clearing the logistics animation area, getting it ready
  d3.select("#logistics-fix-sim").selectAll("circle").remove()
  d3.select("#logistics-fix-sim").selectAll("path").remove()

})

updateFunctions.push(function(progress) {

  // warehouse logistics animation for this section
  // (note: this animation was converted from a timed animation to a scrolling-based one, thus the "t")
  var t = (progress * 0.1) * (14000 - 5000) + 5000
  logistics_fix_sim(t)

})


/* For example, given the items selected for a shipment, what is the best route for pickers... */

activateFunctions.push( function(){

  // view management
  update_footer('')
  highlight_topics(['logistics-optimization'])
  highlight_svg_groups(['calendar','profile','wh2','icycle-warehouses','icycle-machines','logistics-fix-sim'])

  // following the fix, accruing info
  fix_progression('to_logistics', 1)

})

updateFunctions.push(function(progress) {

  // warehouse logistics animation for this section
  var t = (0.1 + progress * 0.3) * (14000 - 5000) + 5000
  logistics_fix_sim(t)

})


/* This problem of pick-path routing is an instance of the NP-hard Traveling Salesman Problem... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/21/skynet-salesman/" target="_">The Skynet Salesman</a>')
  highlight_topics(['logistics-optimization'])
  highlight_svg_groups(['calendar','profile','wh2','icycle-warehouses','icycle-machines','logistics-fix-sim',"logistics-opt-function","logistics-dist-function"])

  // following the fix, accruing info
  fix_progression('to_logistics', 1)

})

updateFunctions.push(function(progress) {

  // warehouse logistics animation for this section
  var t = (0.4 + progress * 0.6) * (14000 - 5000) + 5000
  logistics_fix_sim(t)

})


/* The shipment is then delivered to the client by their requested delivery date. */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['logistics-optimization'])
  highlight_svg_groups(['client1','icycle-warehouses','icycle-machines','logistics-fix-sim'])

  // hide the remaining fix info. end of an era.
  d3.selectAll("#calendar, #profile, #wh2").transition().duration(0).style("opacity",0)

  // for upward-scrollers - turn off client selection animation
  stop_animation_interval("icycle2vec_animation_interval")
  remove_simple_pairs_stuff("icycle2vec")

})

updateFunctions.push(function(progress) {

  // warehouse logistics animation for this section
  var t = progress * (15000 - 14000) + 14000
  logistics_fix_sim(t)

})


// Client Experience Part 2: Trying On & Feedback
/* But this is just the beginning. She opens the box, is hopefully delighted... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([])
  history.pushState({}, "", "#client-experience-part-2")
  highlight_svg_groups(['machines','humans','humans-unselected','client1','icycle-warehouses','icycle-machines','logistics-fix-sim'])

  // for upward-scrollers - turn off the single fix overview animation
  stop_animation_timer("single_fix_sim_timer")

})

updateFunctions.push(function(progress) {

  // warehouse logistics animation for this section
  var t = progress * (20000 - 15000) + 15000
  logistics_fix_sim(t)

})


// Da Capo al Coda
/* To recap the process of filling a single shipment request: a client creates a Style Profile... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([])
  history.pushState({}, "", "#da-capo-al-coda")
  highlight_svg_groups(['machines','humans','humans-unselected','icycle-warehouses','icycle-machines','single-fix-sim','single-fix-sim-labels','client1',"legend-client-profiles","legend-fix-requests","legend-warehouse-assignment","legend-fix-selections","legend-stylist-notes","legend-feedback","legtext-client-profiles","legtext-fix-requests","legtext-fix-selections","legtext-stylist-notes","legtext-feedback"])

  // run the single fix overview animation
  run_single_fix_overview_animation()

  // for downward-scrollers - turn off client selection animation
  stop_animation_interval("icycle2vec_animation_interval")
  remove_simple_pairs_stuff("icycle2vec")

  // for upward-scrollers - turn off the inventory cycle animation
  stop_animation_timer("inventory_animation_timer")

})

updateFunctions.push(function(progress) {})


/*  But this is just one shipment. Zooming out, we can consider the system as a whole... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([])
  history.pushState({}, "", "#da-capo-al-coda")
  highlight_svg_groups(["inventory-cycle",'machines','humans','humans-unselected','the-algo','inventory-cycle-sim-labels','icycle-warehouses','icycle-machines','icycle-clients','icycle-newlabel-wa','icycle-newlabel-sr','icycle-newlabel-lo',"legend-client-profiles","legend-fix-requests","legend-warehouse-assignment","legend-fix-selections","legend-stylist-notes","legend-feedback","legtext-client-profiles","legtext-fix-requests","legtext-fix-selections","legtext-stylist-notes","legtext-feedback"])

  // housekeeping
  d3.select(".stylist_note_dot").attr("opacity", 0)
  d3.select("#client1").attr("transform", "translate(0,0) scale(1)")
  d3.select("#humans-unselected")
    .transition().delay(10).duration(10)
      .style("opacity", 1)

  // run the inventory cycle animation
  start_inventory_animation()

  // for downard-scrollers - turn off the single fix overview animation
  stop_animation_timer("single_fix_sim_timer")

})

updateFunctions.push(function(progress) {

  // highlight merch algo computers first
  d3.select("#icycle-merch-algo")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, Math.min(1, -2 + progress * 5)))

  // then client algo computers
  d3.select("#icycle-client-algo")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, Math.min(1, -3 + progress * 5)))

})


/* Let's first look at how we anticipate our clients' needs, then we'll swing around... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([])
  history.pushState({}, "", "#da-capo-al-coda")
  highlight_svg_groups(["inventory-cycle",'machines','humans','humans-unselected','the-algo','inventory-cycle-sim-labels','icycle-warehouses','icycle-machines','icycle-clients','icycle-newlabel-wa','icycle-newlabel-sr','icycle-newlabel-lo',"legend-client-profiles","legend-fix-requests","legend-warehouse-assignment","legend-fix-selections","legend-stylist-notes","legend-feedback","legtext-client-profiles","legtext-fix-requests","legtext-fix-selections","legtext-stylist-notes","legtext-feedback","icycle-merch-algo","icycle-client-algo"])

  // for downward-scrollers - turn off the inventory cycle animation
  stop_animation_timer("inventory_animation_timer")

})

updateFunctions.push(function(progress) {

  // like butter
  d3.selectAll("#inventory-cycle, #machines, #humans, #humans-unselected, #the-algo, #inventory-cycle-sim-labels, #icycle-warehouses, #icycle-machines, #icycle-newlabel-wa, #icycle-newlabel-sr, #icycle-newlabel-lo, #legend-client-profiles, #legend-fix-requests, #legend-warehouse-assignment, #legend-fix-selections, #legend-stylist-notes, #legend-feedback, #legtext-client-profiles, #legtext-fix-requests, #legtext-fix-selections, #legtext-stylist-notes, #legtext-feedback, #icycle-merch-algo")
    .transition().duration(0)
      .style("opacity", Math.max(0, 1 - 2 * progress))

})



// State Machines
/* One of the ways we view this needs-anticipation problem (and related problems) is to consider the "state" of each client... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['state-machines'])
  highlight_svg_groups([])

  // show full-height client over time
  animate_full_height_client()

})

updateFunctions.push(function(progress) {})


/* We keep track of every touch point we have with each client... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['state-machines'])
  highlight_svg_groups(['stdm2','stdm2b','stdm2c'])

})

updateFunctions.push(function(progress) {

  // rotate the events dataframe to horizontal
  var progress2 = Math.max(0, -1 + progress * 2)
  rotate_state_event_df(progress2)

})


/* With this data, we try to understand clients' states and their needs... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['state-machines'])
  highlight_svg_groups(['stdm2b','stdm2c', 'stdm3'])

  // make sure the events dataframe is properly horizontal
  rotate_state_event_df(1)

  // if scrolling downward, then we'll show the selected client feeding into the state transitions animation
  page_state.state_machines_show_selected_client = true

  // if upward-scrolling - turn off the state transitions animation
  state_transitions_stop()
  state_transitions_clear()

})

updateFunctions.push(function(progress) {

  // shrink client image down to a dot for use within the state transitions animation
  var progress2 = Math.max(0, -2 + 3 * progress)
  state_events_client_to_dot(progress2)

})


/* And once we define and understand states, and detect and understand clients' transitions between them... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['state-machines'])
  highlight_svg_groups(['state-transitions','state-transitions-animation'])

  // run the state transitions animation
  state_transitions(show_history = false)

})

updateFunctions.push(function(progress) {

  // show the state transition equations once scrolled down a bit more
  d3.select("#state-transitions")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, Math.min(1, -2 + 5 * progress)))

})


// Demand Modeling
/* One of the many uses of these Markov chain models is to anticipate future demand... */

activateFunctions.push( function(){

  // view management
  update_footer('blog posts: <a href="http://multithreaded.stitchfix.com/blog/2015/07/30/gam/" target="_">GAM</a>, <a href="http://multithreaded.stitchfix.com/blog/2016/04/21/forget-arima/" target="_">Sorry ARIMA</a>, <a href="http://multithreaded.stitchfix.com/blog/2017/02/28/whats-wrong-with-my-time-series/" target="_">What\'s Wrong With My Time Series</a>' )
  highlight_topics(['demand-modeling'])
  highlight_svg_groups(['state-transitions','state-transitions-animation','demand-model-equation','q-t-model'])

  // if scrolling upward, then we'll Not show the selected client feeding into the state transitions animation
  page_state.state_machines_show_selected_client = false

  // run the state transitions animation, this time showing the histories graphs
  state_transitions(show_history = true)

  // if upward-scrolling - turn off the inventory management animation
  stop_animation_timer("inventory_management_sim_timer")
  stop_animation_timer("inventory_management_sim_detailed_timer")
  stop_animation_timer("inventory_management_clothing_animation_timer")
  stop_animation_timer("inventory_management_sim_model_timer")

})

updateFunctions.push(function(progress) {})


// Inventory Management
/* Inventory depletion through customer demand must ultimately be offset by purchases of new inventory... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['inventory-management'])
  highlight_svg_groups(['q-t-model'])

  // run inventory management sim with q-t model
  run_inventory_management_sim(n_buckets=1, inputs=true, model=false, clothing_animation=true, detailed_colors=false, show_q_t=true, nonzero_replenish=false)

})

updateFunctions.push(function(progress) {

  // smooth the section change
  d3.selectAll("#state-transitions, #state-transitions-animation, #demand-model-equation")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, 1 - 4 * progress))
  d3.selectAll("#im-qt-graph-equations, #im-clients, #im-clients-serving-single, #im-capacities-single, #im-purchase-single, #im-wh-outlines-single, #im-labels-single, #im-warehouse-labels-single, #im-labels-purchase, #icycle-merch-algo2, #im-clothing-animation")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, Math.min(1, -1 + 4 * progress)))

})


/* Meeting future demand is just one of our inventory management challenges... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['inventory-management'])
  highlight_svg_groups(['im-clients','im-clients-serving','im-capacities','im-purchase','im-allocation','im-clearance','im-wh-outlines','im-labels-multiple','im-warehouse-labels','im-labels-purchase','icycle-merch-algo2','im-clothing-animation'])

  // run inventory management sim
  run_inventory_management_sim(n_buckets=5, inputs=true, model=false, clothing_animation=true, detailed_colors=false, show_q_t=false, nonzero_replenish=false)

  // if downward-scrolling - turn off the state transitions animation
  state_transitions_stop()
  state_transitions_clear()

})

updateFunctions.push(function(progress) {})


/* (Note that the situation is more complex than this simple illustration... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['inventory-management'])
  highlight_svg_groups(['im-clients','im-clients-serving','im-capacities-detailed','im-purchase','im-allocation','im-clearance','im-wh-outlines','im-labels-multiple','im-warehouse-labels','im-labels-purchase','im-clothing-animation'])

  // run inventory management sim
  run_inventory_management_sim(n_buckets=5, inputs=true, model=false, clothing_animation=true, detailed_colors=true, show_q_t=false, nonzero_replenish=false)

})

updateFunctions.push(function(progress) {})


/* How much of what styles to purchase? Which items should go to which warehouse? What inventory should be donated when? */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['inventory-management'])
  highlight_svg_groups(['im-clients','im-clients-serving','im-capacities','im-purchase','im-allocation','im-clearance','im-wh-outlines','im-labels-multiple','im-warehouse-labels','im-labels-purchase','im-machines'])

  // run inventory management sim
  run_inventory_management_sim(n_buckets=5, inputs=true, model=false, clothing_animation=false, detailed_colors=false, show_q_t=false, nonzero_replenish=true)

})

updateFunctions.push(function(progress) {})


/* We answer these questions by using a model of the system dynamics... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['inventory-management'])
  highlight_svg_groups(['im-clients','im-clients-serving','im-capacities','im-purchase','im-allocation','im-clearance','im-wh-outlines','im-labels-multiple','im-warehouse-labels','im-labels-purchase','im-machines','im2-demand','im2-capacities','im2-purchase','im2-allocation','im2-clearance','im2-frame','im2-equations'])

  // run inventory management sim
  run_inventory_management_sim(n_buckets=5, inputs=true, model=false, clothing_animation=false, detailed_colors=false, show_q_t=false, nonzero_replenish=true)
  run_inventory_management_sim(n_buckets=5, inputs=true, model=true, clothing_animation=false, detailed_colors=false, show_q_t=false, nonzero_replenish=true)

})

updateFunctions.push(function(progress) {})


// New Style Development
/* Volumetric challenges are not the only considerations at play with inventory replacement... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics(['new-style-development'])
  highlight_svg_groups(['im-clients','im-clients-serving','im-capacities','im-purchase','im-allocation','im-wh-outlines','im-labels-purchase','im-clients-selected'])

  // if downward-scrolling - turn off the inventory management animation
  stop_animation_timer("inventory_management_sim_timer")
  stop_animation_timer("inventory_management_sim_detailed_timer")
  stop_animation_timer("inventory_management_clothing_animation_timer")
  stop_animation_timer("inventory_management_sim_model_timer")

  // make sure the genetic algorithms diagram is in its starting position
  d3.select("#nsd-ea-diagram").select("g")
    .attr("transform", "translate(0,0) scale(1)")

})

updateFunctions.push(function(progress) {

  // fade out in prep for next section fade in
  d3.selectAll("#im-clients, #im-clients-serving, #im-capacities, #im-purchase, #im-allocation, #im-wh-outlines, #im-labels-purchase, #im-clients-selected")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.min(1, 2 - 2 * progress))

})


/* We approach this opportunity with inspiration from genetic algorithms... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/" target="_">Data-Driven Fashion Design</a>')
  highlight_topics(['new-style-development'])
  highlight_svg_groups([])

  // genetic algorithms diagram - no highlights
  d3.selectAll("#nsd-ea-initial-population-rect, #nsd-ea-selection-rect, #nsd-ea-recombination-rect, #nsd-ea-mutation-rect, #nsd-ea-next-population-rect")
    .attr("fill", "none")
  d3.selectAll("#nsd-ea-initial-population-text, #nsd-ea-selection-text, #nsd-ea-recombination-text, #nsd-ea-mutation-text, #nsd-ea-next-population-text")
    .attr("fill", "#847c77")

  // make sure the style attribute animation is at its starting point
  animate_style_attributes(0)

})

updateFunctions.push(function(progress) {

  // fade in ea diagram and shrink it down to the bottom right corner
  var progress2 = Math.max(0, -1 + 2 * progress)
  var scale = 1 - 0.2 * progress2
  var x = progress2 * 430
  var y = progress2 * 280
  d3.select("#nsd-ea-diagram").select("g")
    .transition().duration(0)
      .attr("transform", "translate(" + x + "," + y + ") scale(" + scale + ")")
  d3.select("#nsd-ea-diagram")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.min(1, 4 * progress))

})


/* The first step is to think of each style as a set of attributes ("genes"). */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/" target="_">Data-Driven Fashion Design</a>')
  highlight_topics(['new-style-development'])
  highlight_svg_groups(['nsd-ea-diagram','nsd-attrs-blouse'])

  // make sure the genetic algorithms diagram is shrunk to its proper place
  d3.select("#nsd-ea-diagram").select("g")
    .transition().duration(0)
      .attr("transform", "translate(" + 430 + "," + 280 + ") scale(" + 0.8 + ")")

  // genetic algorithms diagram - highlight "initial population"
  d3.selectAll("#nsd-ea-initial-population-rect").attr("fill", "#4B90A6")
  d3.selectAll("#nsd-ea-initial-population-text").attr("fill", "#000")
  d3.selectAll("#nsd-ea-selection-rect, #nsd-ea-recombination-rect, #nsd-ea-mutation-rect, #nsd-ea-next-population-rect").attr("fill", "none")
  d3.selectAll("#nsd-ea-selection-text, #nsd-ea-recombination-text, #nsd-ea-mutation-text, #nsd-ea-next-population-text").attr("fill", "#847c77")

})

updateFunctions.push(function(progress) {

  // animate the style attributes with scroll progression
  animate_style_attributes(progress)

})


/* Then consider our vast set of styles this way... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/" target="_">Data-Driven Fashion Design</a>')
  highlight_topics(['new-style-development'])
  highlight_svg_groups(['nsd-ea-diagram','nsd-attrs-blouse','nsd-attrs-neckline','nsd-attrs-sleeve','nsd-attrs-pattern','nsd-attrs-color','nsd-attrs-sizeratio','nsd-attrs-squiggle','nsd-attrs-number','nsd-attrs-greyscale','nsd-attrs-other'])

  // make sure that the style attribute animation reaches its final state
  animate_style_attributes(1)

  // show the set of clothes and their attributes
  d3.selectAll("#nsd-fadeout, #nsd-top-set, #nsd-bottom-set, #nsd-attrs-blouse, #nsd-attrs-neckline, #nsd-attrs-sleeve, #nsd-attrs-pattern, #nsd-attrs-color, #nsd-attrs-sizeratio, #nsd-attrs-squiggle, #nsd-attrs-number, #nsd-attrs-greyscale, #nsd-attrs-other")
    .transition().duration(1000)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(0,0)")

  // show the stars with a bit more delay
  d3.selectAll("#nsd-top-set-stars, #nsd-bottom-set-stars")
    .attr("display", "block")
    .transition().duration(2500)
      .style("opacity", 1)
      .attr("transform", "translate(0,0)")

  // for upward-scrollers - stop the frankenstyle animation
  stop_animation_interval("frankenstyle_animation_interval")

  // genetic algorithms diagram - highlight "initial population" and "selection"
  d3.selectAll("#nsd-ea-initial-population-rect, #nsd-ea-selection-rect").attr("fill", "#4B90A6")
  d3.selectAll("#nsd-ea-initial-population-text, #nsd-ea-selection-text").attr("fill", "#000")
  d3.selectAll("#nsd-ea-recombination-rect, #nsd-ea-mutation-rect, #nsd-ea-next-population-rect").attr("fill", "none")
  d3.selectAll("nsd-ea-recombination-text, #nsd-ea-mutation-text, #nsd-ea-next-population-text").attr("fill", "#847c77")

})

updateFunctions.push(function(progress) {})


/* Now consider creating new styles by recombining attributes from existing styles... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/" target="_">Data-Driven Fashion Design</a>')
  highlight_topics(['new-style-development'])
  highlight_svg_groups(['nsd-fadeout','nsd-ea-diagram','nsd-attrs-blouse','nsd-attrs-neckline','nsd-attrs-sleeve','nsd-attrs-pattern','nsd-attrs-color','nsd-attrs-sizeratio','nsd-attrs-squiggle','nsd-attrs-number','nsd-attrs-greyscale','nsd-attrs-other','nsd-top-set','nsd-bottom-set','nsd-top-set-stars','nsd-bottom-set-stars'])

  // move the top half of the clothes upward..
  d3.selectAll("#nsd-top-set, #nsd-top-set-stars, #nsd-attrs-blouse, #nsd-attrs-neckline, #nsd-attrs-sleeve, #nsd-attrs-pattern, #nsd-attrs-color, #nsd-attrs-sizeratio, #nsd-attrs-squiggle, #nsd-attrs-number, #nsd-attrs-greyscale, #nsd-attrs-other")
    .transition().duration(1000)
      .attr("transform", "translate(0,-50)")
      .style("opacity", 1)

  // and the bottom half downward, parting the waters
  d3.selectAll("#nsd-bottom-set, #nsd-bottom-set-stars")
    .transition().duration(1000)
      .attr("transform", "translate(0,50)")
      .style("opacity", 1)

  // make sure that the frankenstyle svg groups are ready for action
  d3.selectAll("#nsd-frankenstyle-dev, #nsd-frankenstyle-dev-blouse")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1e-6)

  // run the frankenstyle animation
  animation_state.frankenstyle_animation_interval = setInterval(create_frankenstyle, 2000)
  create_frankenstyle()

  // show and animate the movie-stopwatch sprite
  d3.select("#movie-stopwatch")
    .attr("display", "block")
    .style("opacity", 0.8)
    .attr("transform", "translate(950, 310) scale(1.5)")
    .transition().duration(1000)
      .attr("transform", "translate(850, 310) scale(1.5)")
    .transition().delay(3000).duration(1000)
      .attr("transform", "translate(950, 310) scale(1.5)")
  run_movie_stopwatch(5000, 2)

  // genetic algorithms diagram - highlight "recombination" and "mutation"
  d3.selectAll("#nsd-ea-recombination-rect, #nsd-ea-mutation-rect").attr("fill", "#4B90A6")
  d3.selectAll("#nsd-ea-recombination-text, #nsd-ea-mutation-text").attr("fill", "#000")
  d3.selectAll("#nsd-ea-initial-population-rect, #nsd-ea-selection-rect, #nsd-ea-next-population-rect").attr("fill", "none")
  d3.selectAll("#nsd-ea-initial-population-text, #nsd-ea-selection-text, #nsd-ea-next-population-text").attr("fill", "#847c77")

})

updateFunctions.push(function(progress) {})


/* In the next step, we deviate somewhat from a canonical genetic algorithm... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/" target="_">Data-Driven Fashion Design</a>')
  highlight_topics(['new-style-development'])
  highlight_svg_groups(['nsd-fadeout','nsd-ea-diagram','nsd-attrs-blouse','nsd-attrs-neckline','nsd-attrs-sleeve','nsd-attrs-pattern','nsd-attrs-color','nsd-attrs-sizeratio','nsd-attrs-squiggle','nsd-attrs-number','nsd-attrs-greyscale','nsd-attrs-other','nsd-top-set','nsd-bottom-set','nsd-top-set-stars','nsd-bottom-set-stars'])

  // for fast scrollers - make sure things are in the right place
  // move the top half of the clothes upward..
  d3.selectAll("#nsd-top-set, #nsd-top-set-stars, #nsd-attrs-blouse, #nsd-attrs-neckline, #nsd-attrs-sleeve, #nsd-attrs-pattern, #nsd-attrs-color, #nsd-attrs-sizeratio, #nsd-attrs-squiggle, #nsd-attrs-number, #nsd-attrs-greyscale, #nsd-attrs-other")
    .transition().duration(0)
      .attr("transform", "translate(0,-50)")
      .style("opacity", 1)
  // and the bottom half downward, parting the waters
  d3.selectAll("#nsd-bottom-set, #nsd-bottom-set-stars")
    .transition().duration(0)
      .attr("transform", "translate(0,50)")
      .style("opacity", 1)

  // for downward-scrollers - stop the frankenstyle animation
  stop_animation_interval("frankenstyle_animation_interval")

  // genetic algorithms diagram - no highlights
  d3.selectAll("#nsd-ea-initial-population-rect, #nsd-ea-selection-rect, #nsd-ea-recombination-rect, #nsd-ea-mutation-rect, #nsd-ea-next-population-rect").attr("fill", "none")
  d3.selectAll("#nsd-ea-initial-population-text, #nsd-ea-selection-text, #nsd-ea-recombination-text, #nsd-ea-mutation-text, #nsd-ea-next-population-text").attr("fill", "#847c77")

})

updateFunctions.push(function(progress) {})


/* We first develop a model of how well a given set of attributes is likely to suit the target clients... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/" target="_">Data-Driven Fashion Design</a>')
  highlight_topics(['new-style-development'])
  highlight_svg_groups(['nsd-fadeout','nsd-ea-diagram','nsd-attrs-blouse','nsd-attrs-neckline','nsd-attrs-sleeve','nsd-attrs-pattern','nsd-attrs-color','nsd-attrs-sizeratio','nsd-attrs-squiggle','nsd-attrs-number','nsd-attrs-greyscale','nsd-attrs-other','nsd-top-set','nsd-bottom-set','nsd-top-set-stars','nsd-bottom-set-stars','nsd-model-lingo'])

  // for fast scrollers - make sure things are in the right place
  // move the top half of the clothes upward..
  d3.selectAll("#nsd-top-set, #nsd-top-set-stars, #nsd-attrs-blouse, #nsd-attrs-neckline, #nsd-attrs-sleeve, #nsd-attrs-pattern, #nsd-attrs-color, #nsd-attrs-sizeratio, #nsd-attrs-squiggle, #nsd-attrs-number, #nsd-attrs-greyscale, #nsd-attrs-other")
    .transition().duration(0)
      .attr("transform", "translate(0,-50)")
  // and the bottom half downward, parting the waters
  d3.selectAll("#nsd-bottom-set, #nsd-bottom-set-stars")
    .transition().duration(0)
      .attr("transform", "translate(0,50)")

  // genetic algorithms diagram - no highlights
  d3.selectAll("#nsd-ea-initial-population-rect, #nsd-ea-selection-rect, #nsd-ea-recombination-rect, #nsd-ea-mutation-rect, #nsd-ea-next-population-rect").attr("fill", "none")
  d3.selectAll("#nsd-ea-initial-population-text, #nsd-ea-selection-text, #nsd-ea-recombination-text, #nsd-ea-mutation-text, #nsd-ea-next-population-text").attr("fill", "#847c77")

})

updateFunctions.push(function(progress) {

  // fade the clothing matrix out slightly to highlight what comes next

  d3.selectAll("#nsd-top-set, #nsd-top-set-stars, #nsd-attrs-blouse, #nsd-attrs-neckline, #nsd-attrs-sleeve, #nsd-attrs-pattern, #nsd-attrs-color, #nsd-attrs-sizeratio, #nsd-attrs-squiggle, #nsd-attrs-number, #nsd-attrs-greyscale, #nsd-attrs-other")
    .transition().delay(10).duration(10)
      .attr("display", "block")
      .attr("transform", "translate(0,-50)")
      .style("opacity", 0.3 + 0.7 * (1-progress))

  d3.selectAll("#nsd-bottom-set, #nsd-bottom-set-stars")
    .transition().delay(10).duration(10)
      .attr("display", "block")
      .attr("transform", "translate(0,50)")
      .style("opacity", 0.3 + 0.7 * (1-progress))

})


/* We then work with our human designers to vet and refine this collection, and ultimately to produce the next generation of styles. */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/" target="_">Data-Driven Fashion Design</a>')
  highlight_topics(['new-style-development'])
  highlight_svg_groups(['nsd-fadeout','nsd-ea-diagram','nsd-attrs-blouse','nsd-attrs-neckline','nsd-attrs-sleeve','nsd-attrs-pattern','nsd-attrs-color','nsd-attrs-sizeratio','nsd-attrs-squiggle','nsd-attrs-number','nsd-attrs-greyscale','nsd-attrs-other','nsd-top-set','nsd-bottom-set','nsd-top-set-stars','nsd-bottom-set-stars'])

  // for fast scrollers - make sure things are in the right place and faded out properly
  // move the top half of the clothes upward..
  d3.selectAll("#nsd-top-set, #nsd-top-set-stars, #nsd-attrs-blouse, #nsd-attrs-neckline, #nsd-attrs-sleeve, #nsd-attrs-pattern, #nsd-attrs-color, #nsd-attrs-sizeratio, #nsd-attrs-squiggle, #nsd-attrs-number, #nsd-attrs-greyscale, #nsd-attrs-other")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 0.3)
      .attr("transform", "translate(0,-50)")
  // and the bottom half downward, parting the waters
  d3.selectAll("#nsd-bottom-set, #nsd-bottom-set-stars")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 0.3)
      .attr("transform", "translate(0,50)")

  // genetic algorithms diagram - highlight "next population"
  d3.selectAll("#nsd-ea-next-population-rect").attr("fill", "#4B90A6")
  d3.selectAll("#nsd-ea-next-population-text").attr("fill", "#000")
  d3.selectAll("#nsd-ea-initial-population-rect, #nsd-ea-selection-rect, #nsd-ea-recombination-rect, #nsd-ea-mutation-rect").attr("fill", "none")
  d3.selectAll("#nsd-ea-initial-population-text, #nsd-ea-selection-text, #nsd-ea-recombination-text, #nsd-ea-mutation-text").attr("fill", "#847c77")

})

updateFunctions.push(function(progress) {

  // fade out model syntax, fade in frankenstyle set

  d3.select("#nsd-model-lingo")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, 1 - 2 * progress))

  d3.select("#nsd-frankenstyle")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.min(1, 1.5 * progress))

})


/* These new styles get produced and are made available to the styling algorithm... */

activateFunctions.push( function(){

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/07/14/data-driven-fashion-design/" target="_">Data-Driven Fashion Design</a>')
  highlight_topics(['new-style-development'])
  highlight_svg_groups(['nsd-fadeout','nsd-ea-diagram','nsd-attrs-blouse','nsd-attrs-neckline','nsd-attrs-sleeve','nsd-attrs-pattern','nsd-attrs-color','nsd-attrs-sizeratio','nsd-attrs-squiggle','nsd-attrs-number','nsd-attrs-greyscale','nsd-attrs-other','nsd-top-set','nsd-bottom-set','nsd-frankenstyle','nsd-top-set-stars','nsd-bottom-set-stars','nsd-frankenstyle-stars'])

  // for fast scrollers - make sure things are in the right place and faded out properly
  // move the top half of the clothes upward..
  d3.selectAll("#nsd-top-set, #nsd-top-set-stars, #nsd-attrs-blouse, #nsd-attrs-neckline, #nsd-attrs-sleeve, #nsd-attrs-pattern, #nsd-attrs-color, #nsd-attrs-sizeratio, #nsd-attrs-squiggle, #nsd-attrs-number, #nsd-attrs-greyscale, #nsd-attrs-other")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 0.3)
      .attr("transform", "translate(0,-50)")
  // and the bottom half downward, parting the waters
  d3.selectAll("#nsd-bottom-set, #nsd-bottom-set-stars")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 0.3)
      .attr("transform", "translate(0,50)")

  // genetic algorithms diagram - highlight "next population" and "selection"
  d3.selectAll("#nsd-ea-next-population-rect, #nsd-ea-selection-rect").attr("fill", "#4B90A6")
  d3.selectAll("#nsd-ea-next-population-text, #nsd-ea-selection-text").attr("fill", "#000")
  d3.selectAll("#nsd-ea-initial-population-rect, #nsd-ea-recombination-rect, #nsd-ea-mutation-rect").attr("fill", "none")
  d3.selectAll("#nsd-ea-initial-population-text, #nsd-ea-recombination-text, #nsd-ea-mutation-text").attr("fill", "#847c77")

})

updateFunctions.push(function(progress) {})


/* There is indeed a lot going on in our Algorithms team... */

activateFunctions.push( function(){

  // view management
  update_footer("")
  highlight_topics([],1000)
  history.pushState({}, "", "#data-platform")
  highlight_svg_groups([])

  // for upward scrollers - stop the platform animation
  stop_animation_timer("data_platform_animation_timer")

  // for upward-scrollers - hide credits
  d3.select("#intro-credits")
    .transition().duration(0)
      .attr("display", "none")
      .style("opacity", 0)

})

updateFunctions.push(function(progress) {

  // fade out the new style development material

  d3.selectAll("#nsd-bottom-set, #nsd-top-set, #nsd-bottom-set-stars, #nsd-top-set-stars, #nsd-attrs-blouse, #nsd-attrs-neckline, #nsd-attrs-sleeve, #nsd-attrs-pattern, #nsd-attrs-color, #nsd-attrs-sizeratio, #nsd-attrs-squiggle, #nsd-attrs-number, #nsd-attrs-greyscale, #nsd-attrs-other")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, 0.3 - 1 * progress))

  d3.selectAll("#nsd-frankenstyle, #nsd-frankenstyle-stars, #nsd-ea-diagram")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, 1 - 2 * progress))

})


// Data Platform

/* The Data Platform team provides the data and compute infrastructure... */

activateFunctions.push( function(){

  // for upward-scrollers - show the topic buttons
  show_topics()

  // view management
  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/03/16/engineers-shouldnt-write-etl/" target="_">Engineers Shouldn’t Write ETL</a>, <a href="http://multithreaded.stitchfix.com/blog/2017/01/23/scaling-ds-at-sf-slides-from-ddtexas/" target="_">Scaling Data Science</a>')
  highlight_topics(['data-platform'])
  highlight_svg_groups(['platform-data-circles','platform-data-top','platform-data-frame','platform-compute','platform-prodlines','platform-datascientist', 'platform-ds-typing','platform-animation-ingestion','platform-animation-api', 'platform-animation-adds'])

  // make sure the necessary svg groups are visible for the platform animation
  d3.selectAll("#platform-animation-datanado, #platform-animation, #platform-animation-2, #platform-data-circles, #platform-data-top, #platform-data-frame, #platform-compute, #platform-prodlines, #platform-datascientist, #platform-ds-typing, #platform-animation-ingestion, #platform-animation-api, #platform-animation-adds")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

  // run the platform animation
  run_platform_animation()

  // for upward-scrollers - turn off the outro animation
  stop_intro_animation()

  // for upward-scrollers - show vis svg (hidden in next section so links in credits will work)
  d3.select("#vis > svg")
    .transition().duration(0)
      .attr("display", "block")

  // roll credits
  d3.select("#intro-credits")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

})

updateFunctions.push(function(progress) {

  // show / hide the topic buttons
  if (progress > 1.5) {
    hide_topics()
  } else {
    show_topics()
  }

  // show / hide the paragraph highlight, footer, platform animation

  if (progress > 1.2) {

    d3.selectAll('.step')
      .attr('class', 'step')

    update_footer("")

    d3.selectAll("#platform-animation-datanado, #platform-animation, #platform-animation-2, #platform-data-circles, #platform-data-top, #platform-data-frame, #platform-compute, #platform-prodlines, #platform-datascientist, #platform-ds-typing, #platform-animation-ingestion, #platform-animation-api, #platform-animation-adds")
      .transition().duration(0)
        .attr("display", "block")
        .style("opacity", Math.max(0, (1.5 - progress) / 0.3))

  } else {

    d3.selectAll('.step')
      .attr('class', function(d,i) {
          return (i == activateFunctions.length-1) ? 'step highlighted-step' : 'step'
        })

  update_footer('blog post: <a href="http://multithreaded.stitchfix.com/blog/2016/03/16/engineers-shouldnt-write-etl/" target="_">Engineers Shouldn’t Write ETL</a>, <a href="http://multithreaded.stitchfix.com/blog/2017/01/23/scaling-ds-at-sf-slides-from-ddtexas/" target="_">Scaling Data Science</a>')

    d3.selectAll("#platform-animation-datanado, #platform-animation, #platform-animation-2, #platform-data-circles, #platform-data-top, #platform-data-frame, #platform-compute, #platform-prodlines, #platform-datascientist, #platform-ds-typing, #platform-animation-ingestion, #platform-animation-api, #platform-animation-adds")
      .transition().duration(0)
        .attr("display", "block")
        .style("opacity", 1)

  }

  if (progress > 1.5) {
    stop_animation_timer("data_platform_animation_timer")

    d3.selectAll("#platform-animation-datanado, #platform-animation, #platform-animation-2, #platform-data-circles, #platform-data-top, #platform-data-frame, #platform-compute, #platform-prodlines, #platform-datascientist, #platform-ds-typing, #platform-animation-ingestion, #platform-animation-api, #platform-animation-adds")
      .transition().duration(0)
        .attr("display", "none")
        .style("opacity", 0)

    if (!animation_state.intro_matching_interval) {
      intro_slide()
    }

    // for downward-scrollers - hide vis svg (so links in credits will work)
    d3.select("#vis > svg")
      .transition().duration(0)
        .attr("display", "none")

  } else {
    if (!animation_state.data_platform_animation_timer) {
      run_platform_animation()
    }
    stop_intro_animation()

    // for upward-scrollers - show vis svg (hidden in next section so links in credits will work)
    d3.select("#vis > svg")
      .transition().duration(0)
        .attr("display", "block")

  }


})

