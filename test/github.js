//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../ws/github.js')
chai.use(chaiHttp)

describe('Github API', function () {
  describe('#GET /repos', function () {
    it('should return a non-empty list of repos', function (done) {
      chai
        .request(server)
        .get('/repos')
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          //res.body.should.be.a('array');
          res.body.length.should.not.be.eql(0)
          done()
        })
    })
  })

  describe('#GET /readme/:repo', function () {
    it('should get the Readme.md content for the given repo', function (done) {
      chai
        .request(server)
        .get('/readme/tany4')
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.should.be.html
          res.text.should.not.be.empty
          done()
        })
    })
  })
  describe('#GET /readme/:nonExistentRepo', function () {
    it('should return a 404', function (done) {
      chai
        .request(server)
        .get('/readme/nonExistentRepo')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('#GET /last-commit/:repo', function () {
    it('should get last commit info for the given repos master branch', function (done) {
      chai
        .request(server)
        .get('/last-commit/tany4')
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.should.be.an('object')
          res.body.should.have.property('message')
          done()
        })
    })
  })
  describe('#GET /last-commit/:nonExistentRepo', function () {
    it('should return a 404', function (done) {
      chai
        .request(server)
        .get('/last-commit/nonExistentRepo')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})
