// 1. Fetch: Get the dataset
// 2. Transform: Adjust the dataset to have the fields you need for the graph
// 3. Display: Display the transformed data
// 4. Interact:
// 5. Publish

var fetch = require('./fetch.js')
var transform = require('./transform.js')
// require our display module
var display = require('./display.js')
var displayHorizontal = require('./display_horizontal.js')
var displayStacked = require('./display_stacked.js')
var interaction = require('./interaction.js')

fetch(null, function(err, rawData) {
  if (err) {alert(err.message)}

  var movies = transform(rawData)

  var content = makeContent()

  // create an element for our movie bars (see below)
  var visEl = makeVisElement(content)

  // use it to add the visual elements
  //display(visEl, movies, 'qualityPerDollar')

  //var display = new displayHorizontal(visEl, movies, 'qualityPerDollar')

  var display = new displayStacked(visEl, movies, 'qualityPerDollar')

  // make the y scale
  var yScale = makeYScale(content, display.getMaxValue())

  // Create element for info (see below)
  var infoEl = makeInfoElement(content)
  interaction(infoEl, visEl, movies)

})

// // // // // // // // // // // //

function makeContent() {
  var el = document.createElement('div')
  el.style.height = window.innerHeight + 'px'
  el.style.height = window.innerHeight + 'px'
  el.border = '1px solid #000'
  document.body.appendChild(el)
  return el
}

function makeVisElement(parent) {
  var el = document.createElement('div')
  el.style.position = 'relative'
  el.style.float = 'left'
  el.style.width = 600 + 'px'
  el.style.height = 400 + 'px'
  el.style.background = '#eee'
  el.style.margin = '10px'
  el.border = '1px solid #000'
  parent.appendChild(el)
  return el
}

function makeYScale(parent, maxValue) {
  var el = document.createElement('div')
  el.style.float = 'left'
  el.style.height = 400 + 'px'
  el.style.background = '#ddd'
  el.style.marginTop = 10 + 'px'
  el.style.paddingLeft = 5 + 'px'
  el.style.paddingRight = 5 + 'px'

  var tickHeight = 400/10 // 40px
  var pxPerPoint = 400/maxValue // 15 px per point

  var tickIncrement = maxValue/10
  var tickValInc = (tickHeight/2)/pxPerPoint
  var currentValue = maxValue

  for (var i = 10; i > 0; i--) {
    var tick = document.createElement('div')
    tick.style.height = tickHeight + 'px'
    tick.style.lineHeight = tickHeight + 'px'
    tick.innerHTML = Math.round(currentValue - tickValInc)
    currentValue -= tickIncrement
    el.appendChild(tick)
  }

  parent.appendChild(el)
  return el
}

function makeInfoElement(parent) {
var el = document.createElement('div')
  //el.style.position = 'absolute'
  //el.style.right = 0
  //el.style.top = 0
  el.style.float = 'left'
  el.style.width = 300 + 'px'
  el.style.height = window.innerHeight + 'px'
  el.style.background = 'rgba(255,255,255,0.5)'
  parent.appendChild(el)
  return el
}