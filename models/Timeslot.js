const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('../models/User');

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
        booking_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'bookings',
                key: 'booking_id',
            },
        },
        timeslot_datetime_start: {
            type: DataTypes.DATE,
        },
        timeslot_datetime_end: {
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
