
function animate_style_attributes(progress){

  var progress2 = progress * 8000

  var x_end = -250 + 250 * (progress2 - 7000) / 1000
  var y_end = 50 - 50 * (progress2 - 7000) / 1000
  var scale_end = 1.4 - 0.4 * (progress2 - 7000) / 1000

  d3.select("#nsd-attrs-blouse")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 1000) {
          return progress2 / 1000
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 7000){
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

  d3.select("#nsd-attrs-neckline")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 1000) {
          return 1e-6
        } else if (progress2 < 2500) {
          return (progress2 - 1000) / 1500
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 1800) {
          return "translate(-355,10) scale(1.4)"
        } else if (progress2 < 2500) {
          var x = -355 + 105 * (progress2 - 1800) / 700
          var y = 10 + 40 * (progress2 - 1800) / 700
          return "translate(" + x + "," + y + ") scale(1.4)"
        } else if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

  d3.select("#nsd-attrs-sleeve")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 2300) {
          return 1e-6
        } else if (progress2 < 3300) {
          return (progress2 - 2300) / 1000
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 2600) {
          return "translate(-480,25) scale(1.4)"
        } else if (progress2 < 3300) {
          var x = -480 + 230 * (progress2 - 2600) / 700
          var y = 25 + 25 * (progress2 - 2600) / 700
          return "translate(" + x + "," + y + ") scale(1.4)"
        } else if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

  d3.select("#nsd-attrs-pattern")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 3000) {
          return 1e-6
        } else if (progress2 < 4000) {
          return (progress2 - 3000) / 1000
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 3300) {
          return "translate(-580,60) scale(1.4)"
        } else if (progress2 < 4000) {
          var x = -580 + 330 * (progress2 - 3300) / 700
          var y = 60 - 10 * (progress2 - 3300) / 700
          return "translate(" + x + "," + y + ") scale(1.4)"
        } else if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

  d3.select("#nsd-attrs-color")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 3700) {
          return 1e-6
        } else if (progress2 < 4700) {
          return (progress2 - 3700) / 1000
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 4000) {
          return "translate(-640,60) scale(1.4)"
        } else if (progress2 < 4700) {
          var x = -640 + 390 * (progress2 - 4000) / 700
          var y = 60 - 10 * (progress2 - 4000) / 700
          return "translate(" + x + "," + y + ") scale(1.4)"
        } else if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

  d3.select("#nsd-attrs-sizeratio")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 4300) {
          return 1e-6
        } else if (progress2 < 5300) {
          return (progress2 - 4300) / 1000
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 4600) {
          return "translate(-780,50) scale(1.4)"
        } else if (progress2 < 5300) {
          var x = -780 + 530 * (progress2 - 4600) / 700
          var y = 50 - 0 * (progress2 - 4600) / 700
          return "translate(" + x + "," + y + ") scale(1.4)"
        } else if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

  d3.select("#nsd-attrs-squiggle")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 4800) {
          return 1e-6
        } else if (progress2 < 5800) {
          return (progress2 - 4800) / 1000
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 5100) {
          return "translate(-880,50) scale(1.4)"
        } else if (progress2 < 5800) {
          var x = -880 + 630 * (progress2 - 5100) / 700
          var y = 50 - 0 * (progress2 - 5100) / 700
          return "translate(" + x + "," + y + ") scale(1.4)"
        } else if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

  d3.select("#nsd-attrs-number")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 5200) {
          return 1e-6
        } else if (progress2 < 6200) {
          return (progress2 - 5200) / 1000
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 5500) {
          return "translate(-980,50) scale(1.4)"
        } else if (progress2 < 6200) {
          var x = -980 + 730 * (progress2 - 5500) / 700
          var y = 50 - 0 * (progress2 - 5100) / 700
          return "translate(" + x + "," + y + ") scale(1.4)"
        } else if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

  d3.select("#nsd-attrs-greyscale")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", function(d){
        if (progress2 < 5500) {
          return 1e-6
        } else if (progress2 < 6500) {
          return (progress2 - 5500) / 1000
        } else {
          return 1
        }
      })
      .attr("transform", function(d){
        if (progress2 < 4800) {
          return "translate(-1080,50) scale(1.4)"
        } else if (progress2 < 5800) {
          var x = -1080 + 830 * (progress2 - 5500) / 700
          var y = 50 - 0 * (progress2 - 5500) / 700
          return "translate(" + x + "," + y + ") scale(1.4)"
        } else if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })


  d3.select("#nsd-attrs-other")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", function(d){
        if (progress2 < 7000) {
          return "translate(-250,50) scale(1.4)"
        } else {
          return "translate(" + x_end + "," + y_end + ") scale(" + scale_end + ")"
        }
      })

}


function create_frankenstyle(){

  var attrs_list = ["neckline", "sleeve", "pattern", "color", "other", "squiggle", "greyscale", "number", "sizeratio"]

  var color_options = ["#e95e72","#db6156","#403f54","#414042","#3e8a94","#99827a"]
  var greyscale_options = ["#6D6E71","#E6E7E8","#A7A9AC"]
  var pattern_options = ["pattern0.png", "pattern1.png", "pattern2.png", "pattern3.png"]
  var neckline_options = [
  "M376.7,293.9l7.3-5.8c0.4-0.3,0.8-0.4,1.2-0.4c0.8,0,1.6,0.5,1.8,1.4c1.7,7.8,8.8,14.5,17.7,14.5l0,0h0l0,0 c8.9,0,15.9-6.8,17.7-14.5c0.2-0.9,1-1.4,1.8-1.4c0.4,0,0.8,0.1,1.2,0.4l7.3,5.8c0.4,0.4,0.8,0.8,1.1,1.3c0-0.1,0-0.2,0-0.4 c0-0.2,0-0.3,0-0.5c-0.2-0.3-0.5-0.5-0.8-0.8l-7.3-5.8c-0.4-0.3-1-0.5-1.5-0.5c-1,0-2,0.7-2.3,1.8c-1.7,7.6-8.6,14.1-17.2,14.1 c-8.6,0-15.5-6.6-17.2-14.1c-0.3-1.1-1.3-1.8-2.3-1.8c-0.5,0-1,0.2-1.5,0.5l-7.3,5.8c-0.1,0.1-0.2,0.2-0.3,0.3c0,0.2,0,0.5,0,0.7 C376.2,294.3,376.5,294.1,376.7,293.9z",
	"M382.1,285.1c0.1,0,0.5-0.2,1-0.4c0.8-0.3,1.9-0.7,2.9-1c0.9-0.3,1.7-0.6,1.7-0.6l0,0c0.5-0.2,1-0.3,1.5-0.3 c1.4,0,2.6,0.8,3.3,2.2l12.1,25.8c0,0.1,0.1,0.1,0.2,0.1s0.2-0.1,0.2-0.1l12.1-25.8c0.7-1.4,1.8-2.2,3.2-2.2c0.5,0,1,0.1,1.6,0.3 l0,0c0,0,1.3,0.5,2.6,0.9c0.7,0.2,1.4,0.5,1.9,0.7c0.5,0.2,0.9,0.3,1,0.4c0.2,0.1,2.5,1,5.6,3c-0.1-0.2-0.1-0.5-0.2-0.7 c-2.9-1.8-5-2.7-5.2-2.8c-0.1-0.1-0.5-0.2-1-0.4c-1.6-0.6-4.5-1.6-4.5-1.6l0,0c-0.6-0.3-1.2-0.4-1.8-0.4c-1.6,0-2.9,1-3.6,2.5 l-11.9,25.3l-11.9-25.3c-0.7-1.6-2.1-2.4-3.7-2.4c-0.6,0-1.1,0.1-1.7,0.3l0,0c0,0-1.3,0.5-2.6,0.9c-0.7,0.2-1.4,0.5-1.9,0.7 c-0.5,0.2-0.9,0.3-1,0.4c-0.2,0.1-2.2,0.9-4.9,2.6c-0.1,0.2-0.1,0.5-0.2,0.7C379.7,286.1,381.9,285.2,382.1,285.1z",
  "M378.4,278.4l10.1-3.7c0.2,4.9,3.7,10.4,8.8,12.5l6.8,22.5l0,0c0.2,0.4,0.5,0.6,0.9,0.6h0l0,0v0h0l0,0l0,0l0,0 c0.4,0,0.7-0.2,0.9-0.6l0,0l6.4-22.4c5-2.1,8.5-7.5,8.6-12.4l10.8,4.2c-0.1-0.2-0.2-0.4-0.3-0.6l-10.7-4.1l-0.2,0l-0.1,0.2l0,0.1 c0,4.7-3.4,10.3-8.4,12.2l-0.1,0.2l-6.5,22.5c-0.1,0.2-0.2,0.3-0.4,0.3l0,0l0,0c-0.2,0-0.3-0.1-0.4-0.3l-6.8-22.6l-0.1-0.2 c-5-2.1-8.6-7.7-8.6-12.5l-0.1-0.2l-0.2,0l-9.9,3.7C378.5,278,378.4,278.2,378.4,278.4z"
  ]
  var sleeve_options = [
	"M469.9,306.6c0.1-2.3,0.8-4.6,1.9-6.6l3.1-5.6c0.5-0.9,0.9-1.8,1.2-2.6c0.3-1,0.5-2,0.5-3c0-0.9-0.1-1.8-0.3-2.7l-3.6-14.4 c0-1.4,0.6-2.7,1.7-3.6l6.7-5.3c-0.2-0.1-0.4-0.1-0.6-0.2l-6.4,5.1c-1.2,1-1.9,2.4-1.9,4l0,0.1l3.6,14.4c0.2,0.8,0.3,1.7,0.3,2.6 c0,1-0.1,1.9-0.5,2.8c-0.3,0.8-0.6,1.6-1.1,2.5l-3.1,5.6c-1.2,2.1-1.8,4.4-1.9,6.8l0,0c0,0,0.1,1,0.2,2.7c0.1,2.3,0.3,5.8,0.5,9.8 c0.2,0,0.3,0,0.5,0C470.3,312.2,469.9,306.8,469.9,306.6z",
  "M474.2,310.4c0.5,0.7,1.3,1,2,1c0.6,0,1.1-0.2,1.6-0.6l0,0l2.2-1.9l-1,8.9c0.2,0,0.3-0.1,0.5-0.1l1.1-9.4 c0-0.1,0-0.2-0.1-0.3c-0.1,0-0.2,0-0.3,0l-2.7,2.3c-0.4,0.3-0.8,0.5-1.3,0.5c-0.6,0-1.2-0.3-1.7-0.8l-14.4-18.7 c-0.3-0.4-0.5-1-0.5-1.5c0-0.3,0.1-0.7,0.2-1c8.8-14.6,22.2-20.1,22.8-20.4c0.1,0,0.5-0.2,1.1-0.4c0.9-0.3,2.2-0.8,3.2-1.2 c1-0.4,1.8-0.7,1.8-0.7l0,0c0,0,0.1,0,0.1,0c-0.2-0.1-0.3-0.2-0.5-0.4c-0.4,0.2-1.6,0.6-2.7,1c-0.7,0.3-1.5,0.5-2.1,0.8 c-0.6,0.2-1,0.4-1.2,0.4c-0.6,0.3-14.2,5.9-23,20.6l0,0c-0.2,0.4-0.3,0.8-0.3,1.2c0,0.7,0.2,1.3,0.6,1.8L474.2,310.4z",
	"M479.2,317.6l2.8-23.3c0-0.1-0.1-0.2-0.2-0.3s-0.2,0-0.3,0.1c-0.7,1.2-1.4,2.5-2.4,3.5l-2.4,2.3c-0.3,0.3-0.6,0.7-0.8,1.1 l0,0l-1.3,3.8c-0.2,0.1-0.9,0.4-2.2,0.4c-1.2,0-3-0.3-5.3-1.2c-2.8-1.1-4.3-2.2-5.1-2.9c-0.4-0.4-0.6-0.7-0.8-0.9 c-0.1-0.1-0.1-0.2-0.1-0.2l0,0l1-2.9c0.1-0.4,0.2-0.8,0.2-1.2c0-0.2,0-0.4-0.1-0.6l-0.6-3.3c-0.1-0.8-0.2-1.7-0.2-2.5 c0-1.8,0.3-3.5,0.9-5.2l8.7-23.3c-0.2,0-0.4,0-0.5,0L462,284c-0.6,1.7-1,3.5-1,5.4c0,0.9,0.1,1.8,0.2,2.6l0.6,3.3 c0,0.2,0,0.4,0,0.5c0,0.4-0.1,0.7-0.2,1l-1,3l0,0.1c0,0.1,0.6,2.3,6.3,4.5c2.4,1,4.2,1.2,5.5,1.2c1.7,0,2.5-0.5,2.6-0.5l0.1-0.1 l1.3-3.9c0.2-0.3,0.4-0.7,0.7-0.9l2.4-2.3c0.8-0.7,1.3-1.6,1.9-2.5l-2.7,22.3C478.8,317.7,479,317.7,479.2,317.6z"
  ]
  var squiggle_options = [
	"M714.9,295.7c6.9,1.9,14.8-1.7,18-8c1.1-2.2,2-5,4.3-5.9c2.7-1.1,5.5,1.1,8.2,2.2c2.8,1.2,6,1.4,9.1,1.6c5.2,0.3,10.5,0.5,15.7,0.8",
	"M718.9,276.4c9.1,1.9,16.9,7.5,24.1,13.4c2.2,1.8,4.4,3.7,6,6c1.4,2,2.4,4.4,3.6,6.6c2.3,4.3,5.4,8.2,9.1,11.5",
	"M723.3,310.3c-0.3-2.1,1.2-3.9,2.7-5.5c4-4.4,8-8.8,12-13.2c1.4-1.6,2.9-3.1,4.7-4.2c6-3.4,14.7-0.6,19.5-5.6 c1.3-1.4,3-3.4,4.7-2.4"
  ]

  var sleeve_choice = Math.floor(Math.random() * sleeve_options.length)
  var neckline_choice = Math.floor(Math.random() * neckline_options.length)
  var color_choice = Math.floor(Math.random() * color_options.length)
  var pattern_choice = Math.floor(Math.random() * pattern_options.length)

  d3.select("#nsd-frankenstyle-dev")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)

  d3.select("#nsd-frankenstyle-dev-color").select("circle")
    .attr("fill", color_options[color_choice])

  d3.select("#nsd-frankenstyle-dev-greyscale").select("circle")
    .attr("fill", greyscale_options[Math.floor(Math.random()*greyscale_options.length)])

  d3.select("#nsd-frankenstyle-dev-pattern").select("image")
    .attr("xlink:href", "img/styledev/" + pattern_options[pattern_choice])

  d3.select("#nsd-frankenstyle-dev-neckline").select("path")
    .attr("d", neckline_options[neckline_choice])

  d3.select("#nsd-frankenstyle-dev-sleeve").select("path")
    .attr("d", sleeve_options[sleeve_choice])

  d3.select("#nsd-frankenstyle-dev-squiggle").select("path")
    .attr("d", squiggle_options[Math.floor(Math.random()*squiggle_options.length)])

  d3.select("#nsd-frankenstyle-dev-sizeratio").select("g").select("text")
    .text((Math.random() * 2).toFixed(2))

  d3.select("#nsd-frankenstyle-dev-number").select("text")
    .text((Math.random() * 10).toFixed(2))

  attrs_list.forEach(function(s){
  	var dy = 80 + Math.random() * 800
  	if (Math.random() < 0.5) { dy = dy * (-1) }
    d3.select("#nsd-frankenstyle-dev-" + s)
      .attr("transform", "translate(0," + dy + ")")
      .transition().duration(1200)
        .attr("transform", "translate(0,0)")
  })

  draw_new_blouse(310, 255, 0.18, sleeve_choice, neckline_choice, color_choice, pattern_choice)

  d3.select("#nsd-frankenstyle-dev")
    .transition().delay(1750).duration(225)
        .style("opacity", 1e-6)


}
