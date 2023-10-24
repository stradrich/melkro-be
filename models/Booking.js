const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Booking = sequelize.define(
  'bookings',
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
      allowNull: true, // Now, it can be null
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
      allowNull: true, // Now, it can be null
    },
    other_remarks: {
      type: DataTypes.TEXT,
      allowNull: true, // Now, it can be null
    },
    purpose: {
      type: DataTypes.ENUM(
        'practice',
        'teaching',
        'recording',
        'rehearsal',
        'seminar',
        'masterclasses',
        'workshop'
      ),
      allowNull: true, // Now, it can be null
    },
    first_instrument: {
      type: DataTypes.TEXT,
      allowNull: true, // Now, it can be null
    },
    capacity: {
      type: DataTypes.ENUM('individual', 'less than four', 'band/orchestra'),
      allowNull: true, // Now, it can be null
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
