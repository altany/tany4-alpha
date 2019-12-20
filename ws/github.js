'use strict'
let express = require('express')
let router = express.Router()

let requestExt = require('request-extensible')
let RequestHttpCache = require('request-http-cache')

let marked = require('marked')
let timeAgo = require('node-time-ago')

let httpRequestCache = new RequestHttpCache({
  max: 10 * 1024 * 1024, // Maximum cache size (1mb) defaults to 512Kb
  ttl: 7200
})

let request = requestExt({
  extensions: [httpRequestCache.extension]
})

let clientID = process.env.GITHUB_CLIENTID
let clientSecret = process.env.GITHUB_SECRET

let host = 'https://api.github.com/'
let auth = 'client_id=' + clientID + '&client_secret=' + clientSecret
let options = {
  headers: {
    'User-Agent': 'altany'
  }
}

let apiVersion = 'v3'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

function formatErrorResponse ({
  response,
  message = '',
  repo,
  code = 500,
  contentType = 'text/plain'
} = {}) {
  response.statusCode = code
  response.setHeader('Content-Type', contentType)
  return response.end(message + (repo ? ' for repo "' + repo + '"' : ''))
}

router.get('/repos', function (req, res) {
  options.url = host + 'users/altany/repos?sort=created&' + auth
  request(options, function (error, response, body) {
    if (error) {
      return formatErrorResponse({ response: res, message: error })
    } else if (response.statusCode !== 200) {
      return formatErrorResponse({
        response: res,
        message: response.body,
        code: response.statusCode,
        contentType: 'application/javascript'
      })
    }
    res.setHeader('Content-Type', 'application/json')
    res.end(body)
  })
})

router.get('/readme/:repo', function (req, res) {
  options.url =
    host + 'repos/altany/' + req.params.repo + '/contents/README.md?' + auth
  options.headers['Accept'] = 'application/vnd.github.' + apiVersion + '.raw'
  request(options, function (error, response, body) {
    if (error) {
      return formatErrorResponse({
        response: res,
        message: error,
        repo: req.params.repo
      })
    }
    if (response.statusCode === 404) {
      return formatErrorResponse({
        response: res,
        message: 'README.md not found',
        repo: req.params.repo,
        code: 404
      })
    } else if (response.statusCode !== 200) {
      return formatErrorResponse({
        response: res,
        message: response.body,
        repo: req.params.repo,
        code: response.statusCode,
        contentType: 'text/html'
      })
    } else {
      res.setHeader('Content-Type', 'text/html')
      res.end(marked(body).toString())
    }
  })
})

router.get('/last-commit/:repo', function (req, res) {
  options.url = host + 'repos/altany/' + req.params.repo + '/commits?' + auth
  request(options, function (error, response, body) {
    if (error) {
      return formatErrorResponse({
        response: res,
        message: error,
        repo: req.params.repo
      })
    }
    let result = {}
    if (response.statusCode === 404) {
      return formatErrorResponse({
        response: res,
        message: 'Commit history not found',
        repo: req.params.repo,
        code: 404
      })
    } else if (response.statusCode !== 200) {
      return formatErrorResponse({
        response: res,
        message: response.body,
        repo: req.params.repo,
        code: response.statusCode,
        contentType: 'text/html'
      })
    } else {
      let commit = JSON.parse(body)[0]
      result = {
        link: commit.html_url,
        date: timeAgo(commit.commit.author.date),
        message: commit.commit.message
      }
    }
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result))
  })
})

router.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})
router.use(function (err, req, res) {
  res.sendStatus(err.status || 500)
})
module.exports = router
