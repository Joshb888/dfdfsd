// our module takes 3 arguments:
// el: an html element that will hold an individual movie's detailed info
// visEl: the element that has the movie "bars" (so we can react to mouse events)
// movies: our array of all movie data
module.exports = function(el, visEl, movies) {
  // watch for mouse events on our display element
  visEl.addEventListener('mouseover', function(event) {
    // keep track of the movie's bar so we can highlight it
    var movieEl = event.toElement || event.relatedTarget
    // get the title of the movie so that we can look up the rest of its data
    var title = movieEl.dataset.title
    if (!movieEl || !title) return
    
    // highlight the movie's bar
    highlightEl(movieEl, '#e66')
 
    // find the rest of the movie's data
    var movie = findBy(movies, 'title', title)
    // add it to the info/detail element
    displayInfo(el, movie)
  })  
}
 
function displayInfo (el, movie) {
  html = '<h3>' + movie.title + '</h3>'
 
  // Display all properties
  // for (var prop in movie) {
  //   html += '<p>' + prop + ': ' + movie[prop] + '</p>'
  // }
 
  html += '<p>' + 'qualityPerDollar: ' + Math.round(movie['qualityPerDollar']) + '</p>'
  el.innerHTML = html
}
 
var prevEl = null
function highlightEl (el, highlightColor) {
  if (prevEl) { prevEl.style.background = prevEl.dataset.origBg }
 
  el.dataset.origBg = el.style.background
  el.style.background = highlightColor
  prevEl = el
}
 
function findBy (movies, prop, value) {
  var found = null
  movies.forEach(function(movie) { if (movie[prop] === value) found = movie })
  return found
}