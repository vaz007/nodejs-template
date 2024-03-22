// src/index.js
const express = require("express");

const loggerHttp = require('pino-http')()
const securityHeaders = require('./middleware/securityHeaders');
const loanCalculator = require("./routes/loanCalculator");
require('dotenv').config({ path: './config' });


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

// Routes
app.get('/health', (req, res) => {
  res.send('Healthcheck');
});
app.use('/',loanCalculator);

// Server connection and error handler
const port = process.env.port|| 3000;

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  logger.fatal(error)
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


