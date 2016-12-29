var express = require('express');
var app = express();
var ldJson = {
	"@context" : "http://schema.org",
	"@type" : "Organization",
	"name" : "Tania Papazafeiropoulou",
	"description": "Hi, I'm Tania and I love beautiful and practical web sites! I enjoy building captivating UIs that make the experience easy and fun. My latest favourites are Node.js and ReactJS, and I'm a fan of microservices as a means of handling scale and complexity. I currently work as a Full Stack Web Developer, using Node.js, ReactJS, AngularJS, jQuery, Sass and more.",
	"description": "Hi, I'm Tania and I love beautiful and practical web sites! I enjoy building captivating UIs that make the experience easy and fun. My latest favourites are Node.js and ReactJS, and I'm a fan of microservices as a means of handling scale and complexity. I currently work as a Full Stack Web Developer, using Node.js, ReactJS, AngularJS, jQuery, Sass and more.",
	"url" : "tany4.com",
	"brand" : "Tany4",
	"email" : "hello@tany4.com",
	"image" : "/images/profile.gif",
	"sameAs" : [
		"https://www.linkedin.com/in/taniapapazaf",
		"https://www.github.com/altany",
		"stackoverflow.com/story/tany4"
	]
};

app.set('port', (process.env.PORT || 5000));

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {page:'home', ldJson: ldJson});
});

app.get('/social', function (req, res) {
  res.render('social', {page:'social', ldJson: ldJson});
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