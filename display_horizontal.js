// our module takes 3 arguments:
// el: an html element that we'll place our movie "bars" into
// movies: the array of movie data
// property: the property of the movie we want to visualize (in this case it will be "qualityPerDollar")

var maxValue = 0

function DisplayHorizontal(el, movies, property) {
  var maxWidth = el.getBoundingClientRect().width
  var maxHeight = el.getBoundingClientRect().height
 
  maxValue = getMax(movies, property)
  var maxProp = maxValue

  var barIndent = 0;

  movies.forEach(function(movie) {
    var movieDiv = document.createElement('div')
    
    var margin = 1
    var w = (maxWidth/movies.length) - margin
    var h = movie[property]/maxProp * maxHeight

    movieDiv.style.position = 'absolute'
    movieDiv.style.left = barIndent + 'px'
    movieDiv.style.bottom = 0 + 'px'
    movieDiv.style.marginLeft = margin + 'px'
    movieDiv.style.marginRight = margin + 'px'
    movieDiv.style.width = w + 'px'
    movieDiv.style.height = h + 'px'
    movieDiv.style.background = '#666'

    barIndent += w + margin
 
    // store the movies title on the element so we can use it later
    movieDiv.dataset.title = movie.title
    el.appendChild(movieDiv)
  })
}

DisplayHorizontal.prototype.getMaxValue = function() {
  return maxValue
}

function getMax (array, property) {
  var max = array[0][property]
 
  array.forEach(function(item) {
    if (item[property] > max) max = item[property]
  })
 
  return max
}

module.exports = DisplayHorizontal