'use strict';
module.exports = (sequelize, DataTypes) => {
	const URLMap = sequelize.define('urlmap', {
		longURL: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		shortURL: DataTypes.STRING
	}, {});
	URLMap.associate = function(models) {
		// associations can be defined here
	};
	return URLMap;
};