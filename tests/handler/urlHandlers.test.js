const {shortenURL, getSite} = require('../../src/handler/urlHandlers');
const dbOperations = require('../../src/utils/dbOperations');

describe('the shortenURL handler function,', () => {  

	it('should call h.response with success message when /shortens is hit with POST', async () => {
		const mockRequest = {
			payload: 'longURL'
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};	
		const mockStoreURLToDB = jest.spyOn(dbOperations, 'storeURLToDB');
		mockStoreURLToDB.mockResolvedValue();
		await shortenURL(mockRequest, mockH);
		expect(mockStoreURLToDB).toHaveBeenCalled();
		expect(mockH.response).toHaveBeenCalled();
		expect(mockCode).toHaveBeenCalledWith(200);
		mockStoreURLToDB.mockRestore();
	});

	it('should return statusCode: 500 DB storage of URL fails', async () => {
		const mockRequest = {
			payload: 'longURL'
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};	
		const mockStoreURLToDB = jest.spyOn(dbOperations, 'storeURLToDB');
		mockStoreURLToDB.mockRejectedValue(new Error('Failed to store URL'));
		await shortenURL(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Failed to store URL');
		expect(mockCode).toHaveBeenCalledWith(500);
		mockStoreURLToDB.mockRestore();
	});

});

describe('the getSite handler function,', () => {  

	it('should call h.response with success message when /{shortPath} is hit with GET', async () => {
		const mockRequest = {
			params: {
				shortPath: 'shortPath'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			redirect: jest.fn(() =>{
				return {code: mockCode};
			})
		};  
		const mockGetLongURLFromDBResponse = [{longURL: 'longURL'}];
		const mockGetLongURLFromDB = jest.spyOn(dbOperations, 'getLongURLFromDB');
		mockGetLongURLFromDB.mockResolvedValue(mockGetLongURLFromDBResponse);
		await getSite(mockRequest, mockH);
		expect(mockH.redirect).toHaveBeenCalledWith(mockGetLongURLFromDBResponse[0].longURL);
		expect(mockCode).toHaveBeenCalledWith(302);
		mockGetLongURLFromDB.mockRestore();
	});

	it('should return statusCode: 500 if retrieving URL fails', async () => {
		const mockRequest = {
			params: {
				shortPath: 'shortPath'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};  
		const mockGetLongURLFromDB = jest.spyOn(dbOperations, 'getLongURLFromDB');
		mockGetLongURLFromDB.mockRejectedValue(new Error('Failed to retrieve URL'));
		await getSite(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Failed to retrieve URL');
		expect(mockCode).toHaveBeenCalledWith(500);
		mockGetLongURLFromDB.mockRestore();
	});

	it('should return statusCode: 404 if URL doesnt exist', async () => {
		const mockRequest = {
			params: {
				shotPath: 'shortPath'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};  
		const mockGetLongURLFromDB = jest.spyOn(dbOperations, 'getLongURLFromDB');
		mockGetLongURLFromDB.mockResolvedValue([]);
		await getSite(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Not Found');
		expect(mockCode).toHaveBeenCalledWith(404);
		mockGetLongURLFromDB.mockRestore();
	});

	it('should return statusCode: 410 if URL has timed out', async () => {
		const mockRequest = {
			params: {
				shotPath: 'shortPath'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};  
		const mockGetLongURLFromDB = jest.spyOn(dbOperations, 'getLongURLFromDB');
		mockGetLongURLFromDB.mockResolvedValue(['gone']);
		await getSite(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Gone');
		expect(mockCode).toHaveBeenCalledWith(410);
		mockGetLongURLFromDB.mockRestore();
	});

});