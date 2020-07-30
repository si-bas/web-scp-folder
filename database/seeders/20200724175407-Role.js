'use strict';

const moment = require('moment');
const todayDate = moment(new Date).format("YYYY-MM-DD hh:mm:ss");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
        id: 1,
        code: 'admin',
        name: 'Administrator',
        createdAt: todayDate,
        updatedAt: todayDate
      },
      {
        id: 2,
        code: 'dev',
        name: 'Developer User',
        createdAt: todayDate,
        updatedAt: todayDate
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
