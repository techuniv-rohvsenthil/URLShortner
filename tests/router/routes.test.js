const {init} = require('../../src/server');
const dbOperations = require('../../src/utils/dbOperations');


describe('the server,', () => {  
	
	let server;

	beforeEach(async () => {
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});
    
	xit ('should return a statusCode 200 when /shortens is hit with POST ', async () => {
		const options = {
			method: 'POST',
			url: '/shortens',
			payload: 'longURL'
		};
		const mockstoreURLToDB = jest.spyOn(dbOperations, 'storeURLToDB');
		mockstoreURLToDB.mockResolvedValue();
		const response = await server.inject(options);
		expect(response.statusCode).toBe(200);
	});
    
	it ('should return a statusCode 302 when /{shortPath} is hit with GET ', async () => {
		const options = {
			method: 'GET',
			url: '/shortPath',
		};
		const mockstoreURLToDB = jest.spyOn(dbOperations, 'getLongURLFromDB');
		const mockGetLongURLFromDBResponse = [{longURL: 'longURL'}];
		mockstoreURLToDB.mockResolvedValue(mockGetLongURLFromDBResponse[0].longURL);
		const response = await server.inject(options);
		expect(response.statusCode).toBe(302);
	});

});
