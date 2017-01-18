"use strict";

let express = require('express');
let app = express();

const path = require('path');

let async = require('async');
let ua = require('universal-analytics');
let sass = require('node-sass');
let githubApiRoutes = require('./ws/github');
let gaID = process.env.GA_ACCOUNT_ID;

let visitor = ua(gaID); //.debug(); //To log the tracking info for testing
let request = require('request');

let ldJson = {
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

app.use('/api/github', githubApiRoutes);

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

app.get('/:page?', function (req, res, next) {

  var page = req.params.page?req.params.page:'home';
  
  // Track pageview
  visitor.pageview({dp: '/' + (req.params.page?req.params.page:''), dt: page.charAt(0).toUpperCase() + page.slice(1)}).send();
  
  // If page is Github, render the Github API results
  if (req.params.page && req.params.page === 'github') {
    request.get('http://' + req.headers.host + '/api/github/repos', function (error, response, body) {
      if (error || response.statusCode!==200) {
        let message = 'Error loading the repos...';
        return res.render('github', {page: 'github', warning: message})
      }
    
      var repos = JSON.parse(body);
      if (repos.length) {
        async.each( repos, function(repo, callback){
          request.get('http://' + req.headers.host + '/api/github/readme/' + repo.name, function (error, response, body) {
            if (error || response.statusCode!==200) {
              repo.readme = 'Error reading the description...'
              console.error('Error reading the description of ' + repo.name);
            }
            else repo.readme = body;
            request.get('http://' + req.headers.host + '/api/github/last-commit/' + repo.name, function (e, r, b) {
              if(e || r.statusCode!==200) {
                repo.lastCommit = {message: 'Error getting the last commit info...'};
                console.error('Error get the last commit for ' + repo.name);
              }
              else {
                repo.lastCommit = JSON.parse(b);
              }
              callback();
            });
          });
        }, function(err){
          if (err) {
            console.error('Async failed while reading one of the repos details');
          }
          return res.render('github', {page: 'github', repos: repos});
        });
      }
      else {
        let message = 'No repos found right now. Please try again later';
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

module.exports = app;