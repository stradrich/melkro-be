const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const SpaceListing = sequelize.define(
    "space_listings",
    {
        listing_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "listing_id" // Match the field name from your database
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users', // Replace 'User' with your actual User model name
                key: 'user_id'
            }
        },
        price_per_hour: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        address_link: {
            type: DataTypes.STRING(255)
        },
        pictures: {
            type: DataTypes.STRING(255)
        },
        availability: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

module.exports = SpaceListing;
