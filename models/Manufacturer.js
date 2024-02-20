const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Manufacturer = sequelize.define('Manufacturer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Manufacturer;