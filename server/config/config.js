require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'inventory_app',
    host: 'pgdb',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'inventory_app',
    host: 'pgdb',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'postgres',
    database: 'inventory_app',
    host: 'pgdb',
    dialect: 'postgres',
  },
};
