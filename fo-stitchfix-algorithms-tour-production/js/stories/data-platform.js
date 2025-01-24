
function run_platform_animation() {

  var last_api_call = -4000

  var data_dots_given = d3.select("#platform-data-circles").selectAll("text")

  var data_dots_start = data_dots_given[0].map(function(d){
    var transform_text = d.attributes.transform.value
    var x = transform_text.split(" ")[4]
    var y = transform_text.substring(0,transform_text.length - 1).split(" ")[5]
    return {x: x, y: y, fill: d.attributes.fill.value}
  })

  var data_dots_colors = color_palette.range()

  var api_calls = [
    "get_recommendations(x1, 'feb 14', 'tx')",
    "get_warehouse_assignment(x1, 'feb 14')",
    "get_stylist(x1, 'feb 14', 'tx')",
    "get_allocation_recommendations()"
  ]

  var api_returns = [
    "[s1, s2, s3, ...]",
    "tx",
    "meredith",
    "[a1, a2, a3, ...]"
  ]

  var platform_animation_lambdas = []

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g0a', script: "λ", subscript: "1", rad: 5, progression: [
    {t: -1000,  x: 130, y: 130},
    {t: -700, x: 130, y: 170},
    {t: -200, x: 130, y: 170},
    {t: 500, x: 240, y: 280},
    {t: 17000, x: 240, y: 280}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g0b', script: "λ", subscript: "1", rad: 5, progression: [
    {t: -1000,  x: 130, y: 130},
    {t: -700, x: 130, y: 170},
    {t: -200, x: 130, y: 170},
    {t: 500, x: 240, y: 280},
    {t: 1500, x: 290, y: 240},
    {t: 17000, x: 290, y: 240}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g0c', script: "λ", subscript: "1", rad: 5, progression: [
    {t: -1000,  x: 130, y: 130},
    {t: -700, x: 130, y: 170},
    {t: -200, x: 130, y: 170},
    {t: 500, x: 240, y: 280},
    {t: 1500, x: 340, y: 200},
    {t: 17000, x: 340, y: 200}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g0d', script: "λ", subscript: "1", rad: 5, progression: [
    {t: -1000,  x: 130, y: 130},
    {t: -700, x: 130, y: 170},
    {t: -200, x: 130, y: 170},
    {t: 500, x: 240, y: 280},
    {t: 1500, x: 390, y: 160},
    {t: 17000, x: 390, y: 160}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b0a', script: "β", subscript: "1", rad: 16, progression: [
    {t: 4400, x: 240, y: 280},
    {t: 5200, x: 270, y: 280},
    {t: 5700, x: 270, y: 280},
    {t: 6200, x: 310, y: 288},
    {t: 17000, x: 310, y: 288}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b0b', script: "β", subscript: "1", rad: 16, progression: [
    {t: 4400, x: 290, y: 240},
    {t: 5200, x: 320, y: 240},
    {t: 5700, x: 320, y: 240},
    {t: 6200, x: 360, y: 248},
    {t: 17000, x: 360, y: 248}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b0c', script: "β", subscript: "1", rad: 16, progression: [
    {t: 4400, x: 340, y: 200},
    {t: 5200, x: 370, y: 200},
    {t: 5700, x: 370, y: 200},
    {t: 6200, x: 410, y: 208},
    {t: 17000, x: 410, y: 208}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b0d', script: "β", subscript: "1", rad: 16, progression: [
    {t: 4400, x: 390, y: 160},
    {t: 5200, x: 420, y: 160},
    {t: 5700, x: 420, y: 160},
    {t: 6200, x: 460, y: 168},
    {t: 7300, x: 460, y: 168},
    {t: 8000, x: 510, y: 128},
    {t: 17000, x: 510, y: 128}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g1a', script: "λ", subscript: "2", rad: 5, progression: [
    {t: -1000,  x: 170, y: 130},
    {t: -700, x: 170, y: 170},
    {t: -200, x: 170, y: 170},
    {t: 500, x: 340, y: 288},
    {t: 17000, x: 340, y: 288}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g1b', script: "λ", subscript: "2", rad: 5, progression: [
    {t: -1000,  x: 170, y: 130},
    {t: -700, x: 170, y: 170},
    {t: -200, x: 170, y: 170},
    {t: 500, x: 340, y: 288},
    {t: 1500, x: 390, y: 248},
    {t: 17000, x: 390, y: 248}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g1c', script: "λ", subscript: "2", rad: 5, progression: [
    {t: -1000,  x: 170, y: 130},
    {t: -700, x: 170, y: 170},
    {t: -200, x: 170, y: 170},
    {t: 500, x: 340, y: 288},
    {t: 1500, x: 440, y: 208},
    {t: 17000, x: 440, y: 208}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g1d', script: "λ", subscript: "2", rad: 5, progression: [
    {t: -1000,  x: 170, y: 130},
    {t: -700, x: 170, y: 170},
    {t: -200, x: 170, y: 170},
    {t: 500, x: 340, y: 288},
    {t: 1500, x: 490, y: 168},
    {t: 7300, x: 490, y: 168},
    {t: 8000, x: 540, y: 128},
    {t: 17000, x: 540, y: 128}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b1a', script: "β", subscript: "2", rad: 16, progression: [
    {t: 9400, x: 340, y: 288},
    {t: 10200, x: 370, y: 288},
    {t: 11000, x: 370, y: 288},
    {t: 11500, x: 400, y: 296},
    {t: 17000, x: 400, y: 296}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b1b', script: "β", subscript: "2", rad: 16, progression: [
    {t: 9400, x: 390, y: 248},
    {t: 10200, x: 420, y: 248},
    {t: 11000, x: 420, y: 248},
    {t: 11500, x: 450, y: 256},
    {t: 17000, x: 450, y: 256}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b1c', script: "β", subscript: "2", rad: 16, progression: [
    {t: 9400, x: 440, y: 208},
    {t: 10200, x: 470, y: 208},
    {t: 11000, x: 470, y: 208},
    {t: 11500, x: 500, y: 216},
    {t: 17000, x: 500, y: 216}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b1d', script: "β", subscript: "2", rad: 16, progression: [
    {t: 9400, x: 540, y: 128},
    {t: 10200, x: 570, y: 128},
    {t: 11000, x: 570, y: 128},
    {t: 11500, x: 550, y: 176},
    {t: 17000, x: 550, y: 176}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g2a', script: "λ", subscript: "3", rad: 5, progression: [
    {t: -1000,  x: 210, y: 130},
    {t: -700, x: 210, y: 170},
    {t: -200, x: 210, y: 170},
    {t: 500, x: 430, y: 296},
    {t: 17000, x: 430, y: 296}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g2b', script: "λ", subscript: "3", rad: 5, progression: [
    {t: -1000,  x: 210, y: 130},
    {t: -700, x: 210, y: 170},
    {t: -200, x: 210, y: 170},
    {t: 500, x: 430, y: 296},
    {t: 1500, x: 480, y: 256},
    {t: 17000, x: 480, y: 256}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g2c', script: "λ", subscript: "3", rad: 5, progression: [
    {t: -1000,  x: 210, y: 130},
    {t: -700, x: 210, y: 170},
    {t: -200, x: 210, y: 170},
    {t: 500, x: 430, y: 296},
    {t: 1500, x: 530, y: 216},
    {t: 17000, x: 530, y: 216}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation', id: 'g2d', script: "λ", subscript: "3", rad: 5, progression: [
    {t: -1000,  x: 210, y: 130},
    {t: -700, x: 210, y: 170},
    {t: -200, x: 210, y: 170},
    {t: 500, x: 430, y: 296},
    {t: 1500, x: 580, y: 176},
    {t: 17000, x: 580, y: 176}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b2a', script: "β", subscript: "3", rad: 16, progression: [
    {t: 14400, x: 430, y: 296},
    {t: 15200, x: 460, y: 296},
    {t: 16000, x: 460, y: 296},
    {t: 17000, x: 500, y: 310},
    {t: 19500, x: 500, y: 310}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b2b', script: "β", subscript: "3", rad: 16, progression: [
    {t: 14400, x: 480, y: 256},
    {t: 15200, x: 510, y: 256},
    {t: 16000, x: 510, y: 256},
    {t: 17000, x: 525, y: 290},
    {t: 19500, x: 525, y: 290}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b2c', script: "β", subscript: "3", rad: 16, progression: [
    {t: 14400, x: 530, y: 216},
    {t: 15200, x: 560, y: 216},
    {t: 16000, x: 560, y: 216},
    {t: 17000, x: 550, y: 270},
    {t: 19500, x: 550, y: 270}
  ]})

  platform_animation_lambdas.push({ layer: 'platform-animation-2', id: 'b2d', script: "β", subscript: "3", rad: 16, progression: [
    {t: 14400, x: 580, y: 176},
    {t: 15200, x: 610, y: 176},
    {t: 16000, x: 610, y: 176},
    {t: 17000, x: 575, y: 250},
    {t: 19500, x: 575, y: 250}
  ]})


  function datanado(t, x_center, y_center, y_min, y_max, lights_num, delta_t_start){

    // running lights
    for (var j=0; j<3; j++) {
      d3.selectAll(".platform-machine-running-lights-" + (j + lights_num))
        .attr("stroke", function(d,i) {
            if (t % 700 < (200 + 200 * i)) {
              return "#000"
            } else {
              return color_scale(2)
            }
          })
        .attr("stroke-width", function(d,i) {
            if (t % 700 < (200 + 200 * i)) {
              return 2
            } else {
              return 4
            }
          })
    }

    // data tornado
    var delta_t = (t - delta_t_start) / 1000
    var data_circles = d3.select("#platform-animation-datanado").selectAll("text")
                         .data(data_dots_start)

    data_circles
      .enter().append("text")
        .attr("fill", function(d){ return d.fill })
        .text(function(d) { return Math.floor(Math.random()*2) })
        .attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")" })
        .attr("opacity", function(d,i){
            if (Math.random() < 0.4) { return 1 }
            else { return 1e-6 }
          })

    data_circles
        .attr("transform", function(d){
            var x, y
            if (delta_t < 0.8) {
              x = (1 - delta_t) * d.x + delta_t * x_center
            } else {
              var v = (1 - delta_t) * d.x + delta_t * x_center
              x = x_center + Math.sin(v / 20.0) * 10
            }
            if (delta_t < 0.9) {
              y = (1 - delta_t) * d.y + delta_t * y_center
            } else if (delta_t < 3) {
              y = Math.min(y_max, Math.max(y_min, (1 - delta_t) * d.y + delta_t * y_center ))
            } else {
              var v = (1 - delta_t) * d.y + delta_t * y_center
              y = ((y_max + y_min) / 2) + Math.sin(v / 100.0) * (y_max - y_min) / 2
            }
            return "translate(" + x + "," + y + ")"
        })

  }


  function start_platform_animation(){

    d3.select("#platform-animation").selectAll("g").remove()
    d3.select("#platform-animation-2").selectAll("g").remove()

    d3.selectAll("#platform-animation-adds > g")
      .transition().duration(0)
        .attr("display", "none")
        .style("opacity", 0)

    var lambda_spacing = 50

    animation_state.data_platform_animation_timer = d3.timer(function(timer_t){

      var given_t = timer_t - 500

      // typing animation

      var load_my_data_text = "data = load_data('my_dataset', params)"
      var run_my_algorithm_text = "model = train_model(data, params)"
      var deploy_to_production_text = "deploy(model, env='production')"

      var text_progress_1 = Math.max(0, Math.min( load_my_data_text.length + 1, Math.floor((given_t / 800) * load_my_data_text.length)))
      var text_progress_2 = Math.max(0, Math.min( run_my_algorithm_text.length + 1, Math.floor(((given_t-1000) / 800) * run_my_algorithm_text.length)))
      var text_progress_3 = Math.max(0, Math.min( deploy_to_production_text.length + 1, Math.floor(((given_t-2000) / 800) * deploy_to_production_text.length)))

      d3.select("#load_my_data")
        .text(load_my_data_text.substring(0,text_progress_1))

      d3.select("#run_my_algorithm")
        .text(run_my_algorithm_text.substring(0,text_progress_2))

      d3.select("#deploy_to_production")
        .text(deploy_to_production_text.substring(0,text_progress_3))


      // ingestion

      if (Math.random() < 0.5) {

        d3.select("#platform-animation-ingestion").append("text")
          .attr("x", 1100)
          .attr("y", 503)
          .style("fill", data_dots_colors[Math.floor(Math.random() * data_dots_colors.length)])
          .attr("font-family", "'CMUSerif-Roman'")
          .attr("font-size", "14px")
          .text(Math.floor(Math.random() * 2))
          .transition().duration(1500).ease("linear")
            .attr("x", 650)
          .transition().delay(1500).duration(1000).ease("linear")
            .attr("x", 300 + Math.random() * 300)
            .attr("y", 520 + Math.random() * 50)
          .transition().delay(4000 + Math.random() * 4000).duration(1000)
            .style("opacity", 0)
            .remove()

      }

      // api calls
      if (Math.random() < 0.2) {

        if (given_t > last_api_call + 5000) {
          last_api_call = given_t

          var call_i = Math.floor(Math.random() * api_calls.length)
          d3.select("#platform-animation-api").append("text")
            .attr("x", 1100)
            .attr("y", 418)
            .style("fill", "#000")
            .attr("font-family", "'CMUSansSerif'")
            .attr("font-size", "12px")
            .text(api_calls[call_i])
            .transition().duration(2000)
              .attr("x", 645)
            .transition().delay(2000).duration(500)
              .style("opacity", 1e-6)
              .remove()

          d3.select("#platform-animation-api").append("text")
            .attr("x", 645)
            .attr("y", 418)
            .style("fill", "#000")
            .attr("font-family", "'CMUSansSerif'")
            .attr("font-size", "12px")
            .style("opacity", 1e-6)
            .text(api_returns[call_i])
            .transition().delay(2000).duration(500)
              .style("opacity", 1)
            .transition().delay(2500).duration(2000)
              .attr("x", 1100)
            .transition().delay(4500).duration(500)
              .style("opacity", 1e-6)
              .remove()

        }

      }


      var t = given_t - 4000

      if ((t > 500) && (t<1500)) {
        // fourth row
        d3.select("#platform-computer-add-layer")
          .attr("display", "block")
          .style("opacity", (t-500) / 1000)
      }

      if (t > 1500) {
        // fourth row
        d3.select("#platform-computer-add-layer")
          .attr("display", "block")
          .style("opacity", 1)
      }

      if ((t > 7000) && (t<7200)) {
        // fire
        d3.select("#platform-computer-fire")
          .attr("display", "block")
          .style("opacity", (t-7000) / 200)
      }

      if (t > 7200) {
        // fire
        d3.select("#platform-computer-fire")
          .attr("display", "block")
          .style("opacity", 1)
      }

      if (t > 17000) {
        // fire
        d3.select("#platform-computer-fire")
          .attr("display", "block")
          .style("opacity", 0)
      }


      if ((t > 7000) && (t<8000)) {
        // fifth row
        d3.select("#platform-computer-add-layer-2")
          .attr("display", "block")
          .style("opacity", (t-7000) / 1000)
      }

      if (t > 8000) {
        // fifth row
        d3.select("#platform-computer-add-layer-2")
          .attr("display", "block")
          .style("opacity", 1)
      }


      if ((t > 1500) && (t < 5000)) {
        // first tornado

        var x_center = 337
        var y_center = 460
        var y_min = 415
        var y_max = 470
        var lights_num = 18
        var delta_t_start = 1500

        datanado(t, x_center, y_center, y_min, y_max, lights_num, delta_t_start)


      } else if ((t > 6500) && (t < 10000)) {
        // second tornado

        var x_center = 437
        var y_center = 465
        var y_min = 420
        var y_max = 475
        var lights_num = 21
        var delta_t_start = 6500

        datanado(t, x_center, y_center, y_min, y_max, lights_num, delta_t_start)

      } else if ((t > 11500) && (t < 15000)) {
        // third tornado

        var x_center = 527
        var y_center = 470
        var y_min = 425
        var y_max = 480
        var lights_num = 24
        var delta_t_start = 11500

        datanado(t, x_center, y_center, y_min, y_max, lights_num, delta_t_start)

      } else {

        // running lights
        for (var j=0; j<28; j++) {
          d3.selectAll(".platform-machine-running-lights-" + j)
            .attr("stroke", "#000")
            .attr("stroke-width", 2)
        }

        // data tornado
        d3.select("#platform-animation-datanado").selectAll("text").remove()

      }

      platform_animation_lambdas.forEach(function(l){

        if (t > l.progression[0].t) {

          // enter

          var lambda = d3.select("#" + l.layer).selectAll(".lambda-g-" + l.id).data([l])

          var entered = lambda.enter().append("g")
            .attr("class","lambda-g-" + l.id)
            .attr("transform", "translate(" + l.progression[0].x + "," + l.progression[0].y + ")")

          entered.append("rect")
            .attr("x", 100.7776 - 16)
            .attr("y", 115.6664 - 16)
            .attr("rx", function(d){ return d.rad })
            .attr("ry", function(d){ return d.rad })
            .attr("width", 16 * 2)
            .attr("height", 16 * 2)
            .style("fill", "#fff")
            .style("stroke", "#000")

          entered.append("text")
            .attr("font-family", "'CMUSerif-Italic'")
            .attr("font-size", "21")
            .attr("transform", "matrix(1 0 0 1 92.7776 120.6664)")
            .text(function(d){ return d.script })

          entered.append("text")
            .attr("font-family", "'CMUSerif-Italic'")
            .attr("font-size", "21")
            .attr("transform", "matrix(0.583 0 0 0.583 102.2273 127.6596)")
            .text(function(d){ return d.subscript })


          // check progression

          var i = -1 + l.progression.findIndex(function(d){ return t <= d.t })

          if (i == -2) {
            // exit
            lambda.remove()

          } else {
            // update
            var ldt = (t - l.progression[i].t) / ( l.progression[i + 1].t - l.progression[i].t )
            var x = l.progression[i].x * (1 - ldt) + l.progression[i + 1].x * ldt
            var y = l.progression[i].y * (1 - ldt) + l.progression[i + 1].y * ldt

            lambda
              .transition().duration(0)
                .attr("transform", "translate(" + x + "," + y + ")")

          }

        }

      })

    })

  }

  start_platform_animation()

}
