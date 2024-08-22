
// from Jim Vallandingham's code, with some minor tweaks
// http://vallandingham.me/scroller.html

/**
 * ACTIVATE FUNCTIONS
 *
 * These will be called when their
 * section is scrolled to.
 *
 * General pattern is to ensure
 * all content for the current section
 * is transitioned in, while hiding
 * the content for the previous section
 * as well as the next section (as the
 * user may be scrolling up or down).
 *
 */

/**
 * UPDATE FUNCTIONS
 *
 * These will be called within a section
 * as the user scrolls through it.
 *
 * We use an immediate transition to
 * update visual elements based on
 * how far the user has scrolled
 *
 */

function scrollerDisplay(container, stepClass, textOpacities, activateFunctions, updateFunctions) {

  var lastIndex = -1
  var activeIndex = 0

  var n_sections = activateFunctions.length
  var noshow_indices = [0]

  var scroll = scroller()
    .container(container)

  scroll(d3.selectAll('.' + stepClass))

  scroll.on('active', function(index) {

    activeIndex = index
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign)
    scrolledSections.forEach(function(i) {
      activateFunctions[i]()
    })
    lastIndex = activeIndex

    d3.selectAll('.' + stepClass)
      .attr('class', function(d,i) {
          var filt = (i == index) && (noshow_indices.findIndex(function(d){ return d == i}) == -1)
          return filt ? stepClass + ' highlighted-step' : stepClass
        })
      .transition()
      .duration(500)
      .style('opacity',  function(d,i) { return i == index ? textOpacities[0] : textOpacities[1] })

    ga_section(index) // Stitch Fix addition: google analytics, story arrivals

  })

  scroll.on('progress', function(index, progress){
    updateFunctions[index](progress)
  })
}
