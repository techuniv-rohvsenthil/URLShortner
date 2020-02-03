const createServer = require('./src/server');

const startSever = async () => {
	const server = await createServer();
	await server.start();
};
startSever();
console.log('Server started');