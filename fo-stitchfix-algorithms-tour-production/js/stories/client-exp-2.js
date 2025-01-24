

function start_icycle2vec_animation(){

  var interval_length = 250
  var transition_length = 150
  var bluebox_height = 28.3

  var blueboxes = [
    {x:"321.4", y:"566.9", width:"27.7"},
    {x:"351.4", y:"566.9", width:"27.7"},
    {x:"351.4", y:"597.4", width:"27.7"},
    {x:"321.4", y:"597.4", width:"27.7"},
    {x:"291.4", y:"597.4", width:"27.7"}
  ]

  var greenarrows = [
    {d:"M278.8,550.2c19.1,1.5,32.5,11.5,43.1,25.1", points:"326.8,582.2 315.8,575.4 321.4,574.8 323.7,569.7"},
    {d:"M278.8,552.4c19.4,1.5,56.1,9.1,72.7,22.4", points:"357.3,580.9 345.5,575.9 350.9,574.5 352.4,569"},
    {d:"M279.2,554.7c18.9,0.5,56.1,22.2,72.5,40.8", points:"356.8,602.2 345.7,595.7 351.2,595 353.4,589.8"},
    {d:"M279.5,556.8c19.3,1.5,35.9,18.7,45.8,35.2", points:"329.3,599.5 319.2,591.5 324.9,591.6 327.8,586.7"},
    {d:"M279.5,558.7c19,1.5,24.5,15.7,25.9,31.7", points:"305.8,598.8 300.2,587.2 305.3,589.8 310,586.6"}
  ]

  scroll_through_simple_pairs("icycle2vec", "icycle2vec_animation_interval", interval_length, transition_length, bluebox_height, blueboxes, greenarrows)

}
