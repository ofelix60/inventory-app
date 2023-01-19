const express = require('express');
const cors = require('cors');
const { CLIENT_URL } = require('../constants/index');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  // import routes
  const authRoutes = require('../routes/auth');

  // init routes
  app.use('/api', authRoutes);
  return app;
}
// export default createServer;

module.exports = { createServer };
