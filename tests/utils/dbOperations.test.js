const dbOperations = require('../../src/utils/dbOperations');
const db = require('../../models/index');

describe('the storeURLToDB function,', () => {

	it('should insert an URL to the DB', async () => {
		const mockInsert = jest.spyOn(db.urlmapping, 'create');
		mockInsert.mockResolvedValue();
		const mockValues = {
			longURL: 'longURL',
			shortURL: 'shortURL',
			createdTime: Date.now()
		};
		await dbOperations.storeURLToDB(mockValues.longURL, mockValues.shortURL);
		expect(mockInsert).toHaveBeenCalledWith(mockValues); 
		mockInsert.mockRestore();
	});
    
});

describe('the getLongURLFromDB function,', () => {

	it('should get the longURL from the DB (< 30 min)', async () => {
		const mockInput = 'shortPath';
		const mockRetrieveResponse = [{longURL: 'longURL', createdTime: Date.now()}];
		const mockRetrieve = jest.spyOn(db.urlmapping, 'findAll');
		mockRetrieve.mockResolvedValue(mockRetrieveResponse);
		const res = await dbOperations.getLongURLFromDB(mockInput);
		expect(mockRetrieve).toHaveBeenCalled(); 
		expect(res).toBe(mockRetrieveResponse);
		mockRetrieve.mockRestore();
	});

	it('should consider longURL invalid from the DB if (> 30 min)', async () => {
		const mockInput = 'shortPath';
		const mockRetrieveResponse = [{longURL: 'longURL', createdTime: Date.now() + 1580440368398}];
		const mockRetrieve = jest.spyOn(db.urlmapping, 'findAll');
		mockRetrieve.mockResolvedValue(mockRetrieveResponse);
		const res = await dbOperations.getLongURLFromDB(mockInput);
		expect(mockRetrieve).toHaveBeenCalled(); 
		expect(res).toStrictEqual(['gone']);
		mockRetrieve.mockRestore();
	});
    
});