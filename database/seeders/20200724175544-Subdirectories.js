'use strict';

const path = require('path');
const moment = require('moment');
const todayDate = moment(new Date).format("YYYY-MM-DD hh:mm:ss");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Subdirectories', [{
      id: 1,
      path: path.join(process.cwd(), '/temp/www'),
      name: 'App Directory',
      createdAt: todayDate,
      updatedAt: todayDate
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subdirectories', null, {});
  }
};
