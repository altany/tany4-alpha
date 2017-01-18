//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../service/github.js');
chai.use(chaiHttp);

describe('Github API', function() {
  describe('#GET repos', function() {
    it('should return a non-empty list of repos', function(done) {
      chai.request(server)
        .get('/repos')
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
  });
});
