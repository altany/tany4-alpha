var githubApiConfig = {
	clientID: process.env.GITHUB_CLIENTID,
	clientSecret: process.env.GITHUB_SECRET,
	host: 'https://api.github.com'
};

githubApiConfig.auth = 'client_id=' + githubApiConfig.clientID + '&client_secret=' + githubApiConfig.clientSecret;
githubApiConfig.options = {
	headers: {
		'User-Agent': 'altany'
	}
}

module.exports = githubApiConfig;