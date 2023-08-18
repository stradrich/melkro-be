const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const SpaceListing = sequelize.define(
    "SpaceListing",
    {
        listing_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "listing_id" // Match the field name from your database
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // Replace 'User' with your actual User model name
                key: 'user_id'
            }
        },
        price: {
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
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        }
    }
);

module.exports = SpaceListing;
