require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'inventory_app',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'inventory_app',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'ubuntu',
    password: 'password123',
    database: 'inventory_app',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
