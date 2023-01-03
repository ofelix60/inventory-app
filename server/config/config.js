require('dotenv').config();

module.exports = {
  development: {
    // username: 'ofelix60',
    // password: 'HeL1piKaY7bW',
    // database: 'neondb',
    // host: 'ep-late-limit-066898.us-west-2.aws.neon.tech',
    // dialect: 'postgres',
    // sslmode: { require },
    // ssl: {},
    url: 'postgres://ofelix60:HeL1piKaY7bW@ep-late-limit-066898.us-west-2.aws.neon.tech/neondb',
    dialect: 'postgres',
    dialectOptions: { ssl: {} },
  },
  test: {
    username: 'ofelix60',
    password: 'HeL1piKaY7bW',
    database: 'neondb',
    host: 'ep-late-limit-066898.us-west-2.aws.neon.tech',
    dialect: 'postgres',
    sslmode: 'require',
    ssl: true,
  },
  production: {
    username: 'ofelix60',
    password: 'HeL1piKaY7bW',
    database: 'neondb',
    host: 'ep-late-limit-066898.us-west-2.aws.neon.tech',
    dialect: 'postgres',
    sslmode: 'require',
    ssl: true,
  },
};
