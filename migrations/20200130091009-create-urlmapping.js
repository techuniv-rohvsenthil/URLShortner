'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('urlmappings', {
			longURL: {
				type: Sequelize.STRING,
				primaryKey: true
			},
			shortURL: {
				type: Sequelize.STRING
			},
			createdTime: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('urlmappings');
	}
};