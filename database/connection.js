// database/connection.js
const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('vehicle', process.env.DB_USER_NAME, process.env.DB_USER_PWD, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
