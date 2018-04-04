var cheerio = require('cheerio');
var request = require('request');

var firstDilbert = new Date(1989, 03, 17)

function yyyymmdd(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }
}

// Gets a random date between two given dates
function randomDate() {
    var yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    var randomizedDate = new Date(firstDilbert.getTime() + Math.random() * (yesterday.getTime() - firstDilbert.getTime()));
    return yyyymmdd(randomizedDate);
}

// dilbert urls are formatted as strip/year-month-day (values less that 10 can either have padded zeroes or no)
function formatDate(date) {
    return date.year + '-' + date.month + '-' + date.day;
}

function getDilbert(comicDate, callback) {
    var today = new Date()
    var date = (comicDate == "random") ? randomDate() : yyyymmdd(today)
    var formatted = formatDate(date)

    // Get Dilbert page
    request('http://www.dilbert.com/strip/' + formatted, function (err, response, body) {
        if (err) return callback(err);
        // Use cheerio to access the html of the returned page
        var results;
        try {
            $ = cheerio.load(body);
            var $imglink = $('.img-comic-link')
            var dateReg = new RegExp(date.year + '-0?' + date.month + '-0?' + date.day)
            if (dateReg.test($imglink.attr('href'))) {
                // we got the right date
                results = {
                    date: formatted,
                    url: $imglink.find('.img-comic').attr('src')
                }
            } else if (getDilbert.failOnInvalidDate) {
                return callback(new Error('The date for Dilbert didn\'t work: ' + formatted))
            } else {
                results = { // true randomness
                    url: 'http://assets.amuniversal.com/321a39e06d6401301d80001dd8b71c47',
                    date: '2001-10-25'
                }
            }
        } catch (err) {
            return callback(err) // hehe
        }
        return callback(null, results);
    });
}

getDilbert.failOnInvalidDate = false

module.exports = getDilbert
