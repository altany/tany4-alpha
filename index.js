var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {page:'home'});
});

app.get('/social', function (req, res) {
  res.render('social', {page:'social'});
});
var sass = require('node-sass');

app.get('/public/style.css', function(req, res, next) {
	sass.render({
	  file: 'public/sass/style.sass',
	  sourceMapEmbed: true
	}, function(err, result) {
	  if (err) return next(err);
	  res.set('Content-Type', 'text/css').send(result.css);
	});
});

/* Host my CV as pdf */
app.use('/TaniaPapazafeiropoulou-CV', express.static(__dirname + '/public/files/TaniaPapazafeiropoulouCV.pdf'));



app.listen(app.get('port'), function () {
  console.log('App listening on port ' + app.get('port'));
});