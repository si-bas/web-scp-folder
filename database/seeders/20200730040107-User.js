'use strict';
const bcrypt = require('bcrypt');
const moment = require('moment');
const todayDate = moment(new Date).format("YYYY-MM-DD hh:mm:ss");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
        fullName: 'Abdurrohim Saifi',
        email: 'abdurrohim.saifi@avocacode.com',
        username: 'devpanda',
        password: bcrypt.hashSync('rahasia', 1),
        roleId: 1,
        createdAt: todayDate,
        updatedAt: todayDate
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
