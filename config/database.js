const {
  db
} = require('./environment');

module.exports = {
  development: db,
  test: db,
  production: {
      ...db,
      ...{
          logging: false
      }
  },
};