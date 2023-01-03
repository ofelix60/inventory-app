// const { config } = require('dotenv');
// config();
require('dotenv').config({ path: __dirname + '/./../../.env' });

module.exports = {
  PORT: process.env.PORT,
  SERVER_URL: process.env.DATABASE_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SECRET: process.env.SECRET,
  ssl: true,
  sslmode: require,
};
