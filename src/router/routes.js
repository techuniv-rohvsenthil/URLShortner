const {shortenURL, getSite} = require('../handler/urlHandlers');

const routeArray = [
	{path: '/shortens', method: 'POST', handler: shortenURL},
	{path: '/{shortPath}', method: 'GET', handler: getSite},
	{path: '/ping', method: 'GET', handler: (request, h) => (h.response('Pong'))},
];
module.exports = routeArray;