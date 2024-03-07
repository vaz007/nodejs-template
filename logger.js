const pino = require('pino');
const pinoConfig = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  })

module.exports = pinoConfig;
