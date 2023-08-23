const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import your Sequelize instance

const Timeslot = sequelize.define(
  'timeslot',
  {
    timeslot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Make sure this matches your actual table name
        key: 'user_id', // Make sure this matches the primary key of the referenced table
      },
    },
    timeslot_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
    updatedAt: 'updatedAt', // Customize the updatedAt field name if needed
  }
);

module.exports = Timeslot;