var express = require('express');
var app = express();

const path = require('path');
var requestExt = require('request-extensible');
var RequestHttpCache = require('request-http-cache');
var async = require('async');
var marked = require('marked');
var timeAgo = require('node-time-ago');
var ua = require('universal-analytics');
var sass = require('node-sass');

var httpRequestCache = new RequestHttpCache({
	max: 10*1024*1024, // Maximum cache size (1mb) defaults to 512Kb 
	ttl: 7200
});

var request = requestExt({
  extensions: [
    httpRequestCache.extension
  ]
});

var clientID = process.env.GITHUB_CLIENTID;
var clientSecret = process.env.GITHUB_SECRET;
var gaID = process.env.GA_ACCOUNT_ID;

var visitor = ua(gaID); //.debug(); //To log the tracking info for testing

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
});

var ldJson = {
	"@context" : "http://schema.org",
	"@type" : "Organization",
	"name" : "Tania Papazafeiropoulou",
	"alternateName": "Web Developer Personal Website",
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

app.use(express.static(path.join(__dirname, 'public')));

/* Host my CV as pdf */
app.use('/TaniaPapazafeiropoulou-CV', express.static(path.join(__dirname, '/public/files/TaniaPapazafeiropoulouCV.pdf')));

/* Compile my sass to css via connect middleware */
app.get('/public/style.css', function(req, res, next) {
	sass.render({
	  file: 'public/sass/style.sass',
	  sourceMapEmbed: true
	}, function(err, result) {
	  if (err) return next(err);
	  res.set('Content-Type', 'text/css').send(result.css);
	});
});

app.get('/:page?', function (req, res) {
	console.log(req.params.page);
	var page = req.params.page?req.params.page:'home';
	
	// Track pageview
	visitor.pageview({dp: '/' + (req.params.page?req.params.page:''), dt: page.charAt(0).toUpperCase() + page.slice(1)}).send();
	
	
	// If page is Github, render the Github API results
	if (req.params.page && req.params.page === 'github') {
		var gitHost = 'https://api.github.com';
		var apiVersion = 'v3';
		var options = {
			url: gitHost + '/users/altany/repos?sort=created&client_id=' + clientID + '&client_secret=' + clientSecret,
			headers: {
				'User-Agent': 'altany'
			}
		};

		request(options, function (error, response, body) {
			if (error) return next(new Error (error));
			var repos = JSON.parse(body);
			if (repos.length) {
				async.each( repos, function(repo, callback){
					options.url = gitHost + '/repos/' + repo.full_name + '/contents/README.md?client_id=' + clientID + '&client_secret=' + clientSecret;
					options.headers['Accept'] = 'application/vnd.github.' + apiVersion + '.raw';
					request(options, function (error, response, body) {
						if (error) return callback(error);
						if (response.statusCode===404) {
							repo.readme = 'No description available...'
						}
						else if (response.statusCode!==200) {
							console.warn('Error getting README content for', repo.name);
							repo.readme = 'There was an error while getting this repo\'s README file';
						}
						else {
							repo.readme = marked(body.toString());
						}
						options.url = gitHost + '/repos/altany/' + repo.name + '/commits?client_id=' + clientID + '&client_secret=' + clientSecret;
						request(options, function (e, r, b) {
							if(e) return callback(e);
							var commit = JSON.parse(b)[0];
							repo.lastCommit = {};
							if (r.statusCode!==200) {
								console.warn('Error getting the commits list for', repo.name);
								repo.lastCommit = {
									message: 'Error getting the commit history'
								}
							}
							else {
								repo.lastCommit = {
									link: commit.html_url,
									date: timeAgo(commit.commit.author.date),
									message: commit.commit.message
								}
							}
							callback()
						});
					});
				}, function(err){
					if (err) return next(new Error('Failed while reading one of the repos:' + err))
					return res.render('github', {page: 'github', repos: repos});
				});
			}
			else {
				var message = 'No repos found right now. Please try again later';
				console.warn(message);
				return res.render('github', {page: 'github', warning: message})
			}

		});
	}
	else { // Not Github
		res.render((req.params.page?req.params.page:'index'), {page:page, ldJson: ldJson});
	}
	
});

app.listen(app.get('port'), function () {
  console.log('App listening on port ' + app.get('port'));
});