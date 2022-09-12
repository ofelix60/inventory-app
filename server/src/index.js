const express = require('express');
const { CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const { sequelize } = require('../models');
const path = require('path');
const port = process.env.PORT || 8000;

// import passport middleware
require('./middleware/passport-middleware');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

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
      console.log('Database synced');
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();

// { force: true }
