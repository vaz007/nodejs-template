const { Sequelize } = require('sequelize');
const config = require('config');

const sequelize = new Sequelize({
    username : config.get('db.username'),
    password : config.get('db.username'),
    database : config.get('db.username'),
    dialect : "postgres",
    port  :config.get('db.port'),
    host : config.get('db.host'),
    dialectOptions : {
        ssl:false
    }});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
