const {shortenURL} = require('../../src/handler/urlHandlers');
const dbOperations = require('../../src/utils/dbOperations');

describe('the shortenURL handler function,', () => {  

	it('should call h.response with success message when /notes is hit with POST', async (done) => {
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

	it('should return statusCode: 500 adding new note fails', async (done) => {
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