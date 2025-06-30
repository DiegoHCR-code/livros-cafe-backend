const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type: DataTypes.STRING,
    defaultValue: 'user',
    allowNull: false
  }
}, {
  timestamps: true,
});

module.exports = Usuario;
