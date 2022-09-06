const express = require('express');
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const { sequelize } = require('../models');

// import passport middleware
require('./middleware/passport-middleware');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// import routes
const authRoutes = require('./routes/auth');

// init routes
app.use('/api', authRoutes);

// sequelize
// app start
const appStart = () => {
  try {
    app.listen(PORT, async () => {
      console.log(`It's alive on http://localhost:${PORT}`);
      await sequelize.sync();
      console.log('Database synced');
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();

// { force: true }
