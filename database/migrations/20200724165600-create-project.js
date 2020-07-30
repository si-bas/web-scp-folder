'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			name: {
				type: Sequelize.STRING
			},
			pathSource: {
				type: Sequelize.STRING
			},
			pathDest: {
				type: Sequelize.STRING
			},
			subdirectoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Subdirectories',
					key: 'id'
				}
			},
			status: {
				type: Sequelize.BOOLEAN
			},
			logOutputFile: {
				type: Sequelize.STRING
			},
			logOutputText: {
				type: Sequelize.TEXT
			},
			isInProgress: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			deletedAt: {
				type: Sequelize.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Projects');
  }
};