// our module takes 3 arguments:
// el: an html element that we'll place our movie "bars" into
// movies: the array of movie data
// property: the property of the movie we want to visualize (in this case it will be "qualityPerDollar")

var maxValue = 0

function DisplayStacked(el, movies, property) {
  var maxWidth = el.getBoundingClientRect().width
  var maxHeight = el.getBoundingClientRect().height
 
  var groupedMovies = []
  var group = []
  movies.forEach(function(movie, index) {
    if(index % 3 === 0) {
      if(group.length > 0) groupedMovies.push(group)
      group = []
    }
    group.push(movie)
  })
  console.log(groupedMovies)

  maxValue = getMax(groupedMovies, property)
  var maxProp = maxValue

  var barIndent = 0;

  groupedMovies.forEach(function(movie) {
    var groupDiv = document.createElement('div')
    
    var total = 0
    movie.forEach(function(item) {
      total += item[property]
    })

    var margin = 1
    var w = (maxWidth/groupedMovies.length) - margin
    var h = total/maxProp * maxHeight

    groupDiv.style.position = 'absolute'
    groupDiv.style.left = barIndent + 'px'
    groupDiv.style.bottom = 0 + 'px'
    groupDiv.style.marginLeft = margin + 'px'
    groupDiv.style.marginRight = margin + 'px'
    groupDiv.style.width = w + 'px'
    groupDiv.style.height = h + 'px'
    //groupDiv.style.background = '#666'

    movie.forEach(function(item, index) {
      var section = document.createElement('div')
      //section.style.display = 'inline'
      section.style.height = item[property]/maxProp * maxHeight + 'px'
      if(index % 3 === 0) {
        section.style.background = '#666'
      } else if(index % 3 === 1) {
        section.style.background = '#444'
      } else {
        section.style.background = '#222'
      }
      groupDiv.appendChild(section)
    })

    barIndent += w + margin
 
    // store the movies title on the element so we can use it later
    groupDiv.dataset.title = ""
    el.appendChild(groupDiv)
  })
}

DisplayStacked.prototype.getMaxValue = function() {
  return maxValue
}

function getMax (array, property) {
  var max = 0
  var groupTotal = 0
  array.forEach(function(group) {
    group.forEach(function(item) {
      groupTotal += item[property]
      console.log("GroupTOtal: " + groupTotal)
    })
    if (groupTotal > max) max = groupTotal
    groupTotal = 0
  })
 
  return max
}

module.exports = DisplayStacked