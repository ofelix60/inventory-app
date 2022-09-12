require('dotenv').config();

module.exports = {
  development: {
    username: 'ubuntu',
    password: null,
    database: 'inventory_app',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'ubuntu',
    password: null,
    database: 'inventory_app',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'ubuntu',
    password: null,
    database: 'inventory_app',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
