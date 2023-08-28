const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('../models/User')

const Timeslot = sequelize.define(
    "timeslots",
    {
        timeslot_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        timeslot_datetime: {
            type: DataTypes.DATE,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
    }
);

module.exports = Timeslot;
