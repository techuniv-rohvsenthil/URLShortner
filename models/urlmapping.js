'use strict';
module.exports = (sequelize, DataTypes) => {
	const urlmapping = sequelize.define('urlmapping', {
		longURL: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		shortURL: DataTypes.STRING
	}, {});
	urlmapping.associate = function(models) {
		// associations can be defined here
	};
	return urlmapping;
};