const express = require('express');
const cors = require('cors');
const { CLIENT_URL } = require('../constants/index');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authrization'],
      credentials: true,
    })
  );

  const authRoutes = require('../routes/auth');

  app.use('/api', authRoutes);
  return app;
}

module.exports = { createServer };
