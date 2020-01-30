const dbOperations = require('../../src/utils/dbOperations');
const db = require('../../models/index');

describe('the storeURLToDB function,', () => {

	it('should insert an URL to the DB', async () => {
		const mockInsert = jest.spyOn(db.urlmapping, 'create');
		mockInsert.mockResolvedValue();
		const mockValues = {
			longURL: 'longURL',
			shortURL: 'shortURL'
		};
		await dbOperations.storeURLToDB(mockValues.longURL, mockValues.shortURL);
		expect(mockInsert).toHaveBeenCalledWith(mockValues); 
		mockInsert.mockRestore();
	});
    
});

describe('the getLongURLFromDB function,', () => {

	it('should get the longURL from the DB', async () => {
		const mockInput = 'shortPath';
		const mockRetrieve = jest.spyOn(db.urlmapping, 'findAll');
		await dbOperations.getLongURLFromDB(mockInput);
		expect(mockRetrieve).toHaveBeenCalled(); 
		mockRetrieve.mockRestore();
	});
    
});