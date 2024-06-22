//this model fetches data from db for SCTracker
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");


const  shravani_allcolumns  = sequelize.define("shravani_allcolumns", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Beneficiary_Name : {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      SchemeName : {
        type: DataTypes.STRING(80),
        allowNull: true
      },
      AccountNumber_AsPerBank  : {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      Credit_Transaction_ID   : {
        type: DataTypes.STRING(40),
        allowNull: true
      },
      Credit_Date : {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      Status : {
        type: DataTypes.STRING(40),
        allowNull: true
      },
      First_ApplicationID : {
        type: DataTypes.STRING(40),
        allowNull: true
      },
      whatsapp_number : {
        type: DataTypes.STRING(40),
        allowNull: true
      }
      
});
 
module.exports = shravani_allcolumns;

