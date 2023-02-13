require('dotenv').config();

module.exports = {
  development: {
    url: '',
    dialect: 'postgres',
    dialectOptions: { ssl: {} },
  },
  test: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: 'postgres',
    sslmode: 'require',
    ssl: true,
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: 'postgres',
    sslmode: 'require',
    ssl: true,
  },
};
