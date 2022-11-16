const express = require('express');
const { CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const { sequelize } = require('../models');
const path = require('path');
const port = process.env.PORT || 8000;

// TRYIING SOMETHING

const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  dialect: process.env.PG_DIALECT,
};
const proConfig = {
  connectionString: process.env.DATABASE_URL,
};
const pool = new Pool(
  process.env.NODE_ENV === 'production' ? proConfig : devConfig
);

module.exports = {
  query: (text, params) => pool.query(text, params),
};

//
// import passport middleware
require('./middleware/passport-middleware');

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// console.log('PROCESSdotENV!:', process.env);
console.log('DIALECT!: ', process.env.PG_DIALECT);

if (process.env.NODE_ENV === 'production') {
  // SERVE STATIC CONTENT
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// import routes
const authRoutes = require('./routes/auth');

// init routes
app.use('/api', authRoutes);

// sequelize
// app start
const appStart = () => {
  try {
    app.listen(port, async () => {
      console.log(`It's alive on http://localhost:${port}`);
      await sequelize.sync();
      console.log('** DATABASE SYNCED **');
    });
  } catch (error) {
    console.log(`ERROR!: ${error.message}`);
  }
};

appStart();

// { force: true }
