const {shortenURL, getSite} = require('../handler/urlHandlers');

const routeArray = [
	{path: '/shortens', method: 'POST', handler: shortenURL},
	{path: '/{shortPath}', method: 'GET', handler: getSite}
];
module.exports = routeArray;