const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const Vehicle = require("./Vehicle");

const Owner = sequelize.define("Owner", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vehicleId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Vehicle,
        key: 'id'
    }
}
});

Owner.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
module.exports = Owner;
