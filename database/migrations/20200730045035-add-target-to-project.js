'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Projects', 'targetId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Targets',
        key: 'id'
      },
      after: 'pathSource'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Projects', 'targetId');
  }
};
