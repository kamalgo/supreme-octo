const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection"); // Adjust the path to your sequelize instance
const { DataTypes } = require('sequelize');

const RenewalMahadbt = sequelize.define('RenewalMahadbt', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Mahadbt_Username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'renewal_mahadbt',
    timestamps: false
});

module.exports = RenewalMahadbt;
