"use strict";
let express = require('express');
let router = express.Router();

let requestExt = require('request-extensible');
let RequestHttpCache = require('request-http-cache');

let marked = require('marked');

let httpRequestCache = new RequestHttpCache({
	max: 10*1024*1024, // Maximum cache size (1mb) defaults to 512Kb 
	ttl: 7200
});

let request = requestExt({
  extensions: [
    httpRequestCache.extension
  ]
});

let clientID = process.env.GITHUB_CLIENTID;
let	clientSecret = process.env.GITHUB_SECRET;

let	host = 'https://api.github.com/';
let auth = 'client_id=' + clientID + '&client_secret=' + clientSecret
let options = {
	headers: {
		'User-Agent': 'altany'
    }
};

let apiVersion =  'v3';

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

router.get('/repos', function(req, res) {
	options.url = host + 'users/altany/repos?sort=created&' + auth;
	request(options, function (error, response, body) {
		if (error) return next(new Error (error));
		res.setHeader( 'Content-Type', 'application/json' );
        res.end(body);
	});
});

router.get('/readme/:repo', function(req, res) {
	options.url = host + 'repos/altany/' + req.params.repo + '/contents/README.md?' + auth;
	options.headers['Accept'] = 'application/vnd.github.' + apiVersion + '.raw';
	request(options, function (error, response, body) {
		if (error) return new Error (error);
		res.setHeader( 'Content-Type', 'text/html' );
 
		if (response.statusCode===404) {
			res.end('No description available...');
		}
		else if (response.statusCode!==200) {
			console.warn('Error getting README content for ', req.params.repo);
			res.end('There was an error while getting this repo\'s README file');
		}
		else {
			res.end(marked(body).toString());
		}
	});
});

module.exports = router;