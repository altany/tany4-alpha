let express = require('express');
let path = require('path');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config.js');
let app = express();

let ua = require('universal-analytics');
let gaID = process.env.GA_ACCOUNT_ID;
let visitor = ua(gaID).debug(); //To log the tracking info for testing

let compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

let favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'www','images','favicon.ico')));

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

app.use('/TaniaPapazafeiropoulou-CV', express.static(path.join(__dirname, 'www', 'files', 'TaniaPapazafeiropoulouCV.pdf')));

let githubApiRoutes = require('./ws/github');
app.use('/api/github', githubApiRoutes);

if (process.env.NODE_ENV==='dev') {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));
}



/** Always serve the same HTML file for all requests */
app.get('*', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl);
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});


/** Error Handling */
app.use(function(req, res, next) {
  console.log('404')
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});

/** Start server */
app.set('port', (process.env.PORT || 3000));
let server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
