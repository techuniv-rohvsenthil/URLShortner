const {shortenURL, getSite} = require('../../src/handler/urlHandlers');
const dbOperations = require('../../src/utils/dbOperations');

describe('the shortenURL handler function,', () => {  

	it('should call h.response with success message when /shortens is hit with POST', async (done) => {
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
		done();
	});

	it('should return statusCode: 500 DB storage of URL fails', async (done) => {
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
		done();
	});

});

describe('the getSite handler function,', () => {  

	it('should call h.response with success message when /{shortPath} is hit with GET', async (done) => {
		const mockRequest = {
			params: {
				shotPath: 'shortPath'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			response: {
				redirect: jest.fn(() => {
					return{
						code: mockCode
					};    
				})
			}
		};  
		const mockGetLongURLFromDBResponse = 'longURL';
		const mockGetLongURLFromDB = jest.spyOn(dbOperations, 'getLongURLFromDB');
		mockGetLongURLFromDB.mockResolvedValue(mockGetLongURLFromDBResponse);
		await getSite(mockRequest, mockH);
		expect(mockH.response.redirect).toHaveBeenCalledWith(mockGetLongURLFromDBResponse);
		expect(mockCode).toHaveBeenCalledWith(200);
		done();
	});

	it('should return statusCode: 500 retrieving URL fails', async (done) => {
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
		mockGetLongURLFromDB.mockRejectedValue(new Error('Failed to retrieve URL'));
		await getSite(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Failed to retrieve URL');
		expect(mockCode).toHaveBeenCalledWith(500);
		mockGetLongURLFromDB.mockRestore();
		done();
	});

});