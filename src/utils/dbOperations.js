const db = require('../../models/index');

const storeURLToDB = async (longURL, shortURL) => {
	db.urlmapping.create({ longURL: longURL, shortURL: shortURL, createdTime: Date.now()});
};

const getLongURLFromDB = async (shortPath) => {
	const data = await db.urlmapping.findAll({where: {shortURL: shortPath}});
	const createdTime = data[0].createdTime;
	const currentTime = Date.now();
	console.log(createdTime - currentTime);
	if(currentTime - createdTime < 1800000){
		return data;
	}
	else{
		//delete particular row
		await db.urlmapping.destroy({where: {shortURL: shortPath}});
		return ['gone'];
	}
};

module.exports = {storeURLToDB, getLongURLFromDB};