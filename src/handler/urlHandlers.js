const dbOperations = require('../utils/dbOperations');

const shortenURL = async (request, h) => {
	try{
		const longURL = request.payload;	
		//const shortPath = '';
		const shortURL = '';
		await dbOperations.storeURLToDB(longURL, shortURL); 
		return h.response(shortURL).code(200);
	}
	catch(err){
		return h.response(err.message).code(500); 
	}
};


module.exports = {shortenURL};