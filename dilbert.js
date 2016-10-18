var cheerio = require('cheerio');
var request = require('request');

var firstDilbert = new Date(1989, 03, 17)

// Gets a random date between two given dates
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// dilbert urls are formatted as /year-month-day
function formatDate(date) {
	var year = date.getFullYear(), month = date.getMonth(), day = date.getDay();
	var formattedDate = year + '-' + month + '-' + day;
	return formattedDate;
}

module.exports = function getDilbert(date, callback) {
	var yesterday = new Date().getDate() - 1;
	var date = formatDate(randomDate(firstDilbert, yesterday))
	// Get Dilbert page
	request('http://www.dilbert.com/strip/'+date, function(err, response, body) {
		if (err) return callback(err);
		// User cheerio to access the html of the returned page
		$ = cheerio.load(body);
		return callback(null, $('.img-comic').get(0).attribs.src);
	});
}
