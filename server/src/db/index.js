const { Pool } = require('pg');
const pool = new Pool({
  user: 'oscar',
  host: 'localhost',
  database: 'inventory_app',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
