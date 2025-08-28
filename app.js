const express = require('express');
const cors = require('cors');
const { allowedOrigins } = require('./config/config');
const router = require('./routes');

const app = express();

// CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true,
  })
);

// Routes
app.use(router);

module.exports = app;
