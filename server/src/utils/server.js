// import express from 'express';
const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // import routes
  const authRoutes = require('../routes/auth');

  // init routes
  app.use('/api', authRoutes);
  return app;
}
// export default createServer;

module.exports = { createServer };
