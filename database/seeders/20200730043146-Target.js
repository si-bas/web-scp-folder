'use strict';
const moment = require('moment');
const todayDate = moment(new Date).format("YYYY-MM-DD hh:mm:ss");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Targets', [{
      name: 'Elthree Production Old',
      path: '/var/www',
      user: 'elthree_id',
      host: '35.247.137.57',
      port: 22,
      createdAt: todayDate,
      updatedAt: todayDate
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Targets', null, {});
  }
};
