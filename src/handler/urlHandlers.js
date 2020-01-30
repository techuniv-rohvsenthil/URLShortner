const dbOperations = require('../utils/dbOperations');
const uid = require('uid');

const shortenURL = async (request, h) => {
	try{
		const longURL = request.payload;
		const shortPath = uid();	
		await dbOperations.storeURLToDB(longURL, shortPath); 
		return h.response(shortPath).code(200);
	}
	catch(err){
		return h.response(err.message).code(500); 
	}
};

const getSite = async (request, h) => {
	try{
		const shortPath = request.params.shortPath;
		const longURL = await dbOperations.getLongURLFromDB(shortPath);
		return h.response.redirect(longURL).code(200);
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

module.exports = {shortenURL, getSite};