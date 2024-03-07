// src/index.js
const express = require("express");
const config = require('config');
const loggerHttp = require('pino-http')()
const securityHeaders = require('./middleware/securityHeaders');

// initialise db connection
// const sequelize = require('./db/dbConnection');

const logger = require('./logger');

// Example log statements
logger.fatal('fatal');
logger.error('error');
logger.warn('warn');
logger.info('info');
logger.debug('debug');
logger.trace('trace');


const app = express();
app.use(securityHeaders)

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// To log http req and res
app.use(loggerHttp)

const port = config.get('port') || 3000;

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  logger.fatal(error)
});

app.get('/', (req, res) => {
  res.send('Healthcheck');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


