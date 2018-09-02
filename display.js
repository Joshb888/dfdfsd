// our module takes 3 arguments:
// el: an html element that we'll place our movie "bars" into
// movies: the array of movie data
// property: the property of the movie we want to visualize (in this case it will be "qualityPerDollar")
module.exports = function(el, movies, property) {
  var maxWidth = el.getBoundingClientRect().width
  var maxHeight = el.getBoundingClientRect().height
 
  var maxProp = getMax(movies, property)
 
  movies.forEach(function(movie) {
    var movieDiv = document.createElement('div')
    
    var margin = 1
    var w = movie[property]/maxProp * maxWidth
    var h = (maxHeight/movies.length) - margin
 
    movieDiv.style.margin = margin + 'px'
    movieDiv.style.width = w + 'px'
    movieDiv.style.height = h + 'px'
    movieDiv.style.background = '#666'
 
    // store the movies title on the element so we can use it later
    movieDiv.dataset.title = movie.title
    el.appendChild(movieDiv)
  })
}
 
function getMax (array, property) {
  var max = array[0][property]
 
  array.forEach(function(item) {
    if (item[property] > max) max = item[property]
  })
 
  return max
}