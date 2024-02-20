// models/Vehicle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Manufacturer = require("../models/Manufacturer");

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturerId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Manufacturer,
            key: 'id'
        }
    }
});

// Define associations
Vehicle.belongsTo(Manufacturer, { foreignKey: 'manufacturerId' }); // Define the association between Vehicle and Manufacturer

module.exports = Vehicle;

