const {shortenURL, getSite} = require('../handler/urlHandlers');

const routeArray = [
	{path: '/redirects/{longURL}', method: 'GET', handler: (request, reply) => {
		const redirectSite = request.params.longURL;
		console.log(redirectSite);
		return reply.redirect('http://' + redirectSite).code(301);
	}},
	{path: '/shortens', method: 'POST', handler: shortenURL},
	{path: '/{shortPath}', method: 'GET', handler: getSite}
];
module.exports = routeArray;