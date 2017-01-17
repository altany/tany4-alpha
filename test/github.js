//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../config/github.js');
chai.use(chaiHttp);

describe('Github API', function() {
  describe('#GET repos', function() {
    it('should return a list of repos', function(done) {
      // https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
    });
  });
});
