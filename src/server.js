const routes = require('./router/routes.js');
const Hapi = require('@hapi/hapi');

const createServer = async () => {
	const server = Hapi.Server({
		host: 'localhost',
		port: 8080,
	});
	server.route(routes);
	//await server.validator(Joi);
	return server;
};

module.exports = createServer;