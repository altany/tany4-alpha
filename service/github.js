let express = require('express');
let router = express.Router();

let requestExt = require('request-extensible');
let RequestHttpCache = require('request-http-cache');

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
let	host = 'https://api.github.com';
let auth = 'client_id=' + clientID + '&client_secret=' + clientSecret
let options = {
	headers: {
		'User-Agent': 'altany'
	}
};

router.get('/repos', function(req, res) {
	options.url = host + '/users/altany/repos?sort=created&' + auth;
	request(options, function (error, response, body) {
		if (error) return next(new Error (error));
		res.json(JSON.parse(body));
	});
});

module.exports = router;