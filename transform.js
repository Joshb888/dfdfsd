module.exports = function (rawData) {
  // convert to an array of objects
  var movies = toJSON(rawData)
  // add our new metric
  addCalcuations(movies)
  return movies
}
 
function addCalcuations (movies) {
  movies.forEach(function(movie) {
    // make sure the properties that should be numbers are numbers
    convertNumbers(movie)
    // add our new metric
    movie.qualityPerDollar = movie.rottenTomatoesScore / movie.budget
  })
}
 
function convertNumbers (movie) {
  var numProps = ['audienceScore', 'budget', 'grossDomestic', 'grossForeign', 
    'grossWorldwide', 'nTheatersOpening', 'openingWeekend', 'profitability', 
    'rottenTomatoesScore', 'usBoxOfficeAvgOpeningWeekend']
 
  numProps.forEach(function(prop) { movie[prop] = parseFloat(movie[prop]) })
  return movie
}
 
function toJSON (rows) {
  var colNames = rows.shift()
  return jsonRows = rows.map(function(values) {
    var row = {}
    values.forEach(function(val, i) {
      row[colNames[i]] = val
    })
    return row
  })
}