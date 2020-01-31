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
		const data = await dbOperations.getLongURLFromDB(shortPath);
		if(!data[0]){
			return h.response('Not Found').code(404);
		}
		else if(data[0] == 'gone'){
			return h.response('Gone').code(410);
		}
		else{
			const redirectURL = data[0].longURL; //longURL in the form of http://www.sitename.com
			return h.redirect(redirectURL); 
		}
		
	}
	catch(err){
		return h.response(err.message).code(500);
	}

};

module.exports = {shortenURL, getSite};