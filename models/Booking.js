const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Booking = sequelize.define(
    "Booking",
    {
        booking_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "booking_id" // Match the field name from your database
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'declined'),
            defaultValue: 'pending'
        },
        reminder: {
            type: DataTypes.ENUM('24_hours', '12_hours', '6_hours', '3_hours', '45_minutes')
        },
        check_in: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        check_out: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        required_equipments: {
            type: DataTypes.ENUM('YES', 'NO'),
            defaultValue: 'NO'
        },
        other_remarks: {
            type: DataTypes.TEXT
        },
        purpose: {
            type: DataTypes.ENUM('practice', 'teaching', 'recording', 'rehearsal', 'seminar', 'masterclasses', 'workshop')
        },
        first_instrument: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        capacity: {
            type: DataTypes.ENUM('individual', 'less than four', 'band/orchestra')
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        }
    }
);

module.exports = Booking;

