const routes = require('./src/router/routes.js');
const Hapi = require('@hapi/hapi');

const server = Hapi.Server({
	host: 'localhost',
	port: 8080
});

server.start();

console.log('Server started');