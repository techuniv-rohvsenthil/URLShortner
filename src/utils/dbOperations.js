const db = require('../../models/index');

const storeURLToDB = async (longURL, shortURL) => {
	db.urlmapping.create({ longURL: longURL, shortURL: shortURL});
};

const getLongURLFromDB = async (shortPath) => {
	return db.urlmapping.findAll({where: {shortURL: shortPath}});
};

module.exports = {storeURLToDB, getLongURLFromDB};