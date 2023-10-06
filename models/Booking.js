const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Booking = sequelize.define(
    "bookings",
    {
        booking_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        listing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'space_listings',
                key: 'listing_id',
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'declined'),
            defaultValue: 'pending',
        },
        reminder: {
            type: DataTypes.ENUM('24_hours', '12_hours', '6_hours', '3_hours', '45_minutes'),
        },
        check_in: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        check_out: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        required_equipments: {
            type: DataTypes.ENUM('YES', 'NO'),
            defaultValue: 'NO',
        },
        other_remarks: {
            type: DataTypes.TEXT,
        },
        purpose: {
            type: DataTypes.ENUM('practice', 'teaching', 'recording', 'rehearsal', 'seminar', 'masterclasses', 'workshop'),
        },
        first_instrument: {
            type: DataTypes.TEXT,
        },
        capacity: {
            type: DataTypes.ENUM('individual', 'less than four', 'band/orchestra'),
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

module.exports = Booking;
