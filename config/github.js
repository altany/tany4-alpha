var githubApiConfig = {
	clientID: process.env.GITHUB_CLIENTID,
	clientSecret: process.env.GITHUB_SECRET,
	gitHost: 'https://api.github.com'
};

githubApiConfig.authParam = 'client_id=' + githubApiConfig.clientID + '&client_secret=' + githubApiConfig.clientSecret;
githubApiConfig.options = {
	url: githubApiConfig.gitHost + '/users/altany/repos?sort=created&s' + githubApiConfig.authParam,
	headers: {
		'User-Agent': 'altany'
	}
}

module.exports = githubApiConfig;