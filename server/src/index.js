const express = require('express');
const { CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const { sequelize } = require('../models');
const path = require('path');
const port = process.env.PORT || 8000;
const { createServer } = require('./utils/server');

// TRYIING SOMETHING

const { Pool } = require('pg');
require('dotenv').config();

const devConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PG_PORT,
  dialect: process.env.PG_DIALECT,
  secret: process.env.SECRET,
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

const app = createServer();
/////////////////////////////////
// const app = express();

// app.use(express.json());
/////////////////////////////////
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(passport.initialize());

if (process.env.NODE_ENV === 'production') {
  // SERVE STATIC CONTENT
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// // import routes
// const authRoutes = require('./routes/auth');

// // init routes
// app.use('/api', authRoutes);

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
module.exports = { app };
