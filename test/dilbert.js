var expect = require('chai').expect
var request = require('request')

var goodOlDilby = require('../dilbert')

describe('dilbert', function() {
  var cachedURLs = []
  for (var i = 0; i < 50; i++) {
    it('should fetch a comic ' + (i + 1) + ' times', function(done) {
      this.timeout(10000)
      goodOlDilby(function(err, data) {
        expect(err).to.not.exist
        expect(data).to.exist
          .and.have.all.keys('date', 'url')
        expect(data.url).to.not.be.oneOf(cachedURLs)
        cachedURLs.push(data.url)
        expect(data.date).to.match(/\d{4}-\d\d?-\d\d?/)
        request(data.url, function(err, response, body) {
          expect(err).to.not.exist
          expect(response).to.exist
            .and.to.have.property('statusCode', 200)
          done()
        })
      })
    })
  }
})
