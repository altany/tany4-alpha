let express = require('express')
let path = require('path')
let app = express()
let ua = require('universal-analytics')
let gaID = process.env.GA_ACCOUNT_ID
let visitor = ua(gaID)

app.use(express.static(__dirname + '/www'))

let favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'www', 'images', 'favicon.ico')))

app.use(
  '/TaniaPapazafeiropoulou-CV',
  express.static(
    path.join(__dirname, 'www', 'files', 'TaniaPapazafeiropoulou-CV.pdf')
  )
)

let githubApiRoutes = require('./ws/github')
app.use('/api/github', githubApiRoutes)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

if (process.env.NODE_ENV === 'dev') {
  let webpack = require('webpack')
  let webpackDevMiddleware = require('webpack-dev-middleware')
  let webpackConfig = require('./webpack.config.js')
  // webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
  var compiler = webpack(webpackConfig())
  let webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/',
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      stats: {
        colors: true
      },
      historyApiFallback: true
    })
  )

  app.use(webpackHotMiddleware(compiler))
}

/** Always serve the same HTML file for all requests */
app.get('*', function (req, res) {
  console.log('Request: [GET]', req.originalUrl)
  res.sendFile(path.join(__dirname, 'www', 'index.html'))
})

/** Error Handling */
app.use(function (req, res, next) {
  console.log('404')
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})
app.use(function (err, req, res) {
  res.sendStatus(err.status || 500)
})

/** Start server */
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), function () {
  console.log('Tany4 listening on port', app.get('port'))
})
