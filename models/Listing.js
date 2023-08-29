const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const SpaceListing = sequelize.define(
    "space_listing",
    {
        listing_id: {
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
        price_per_hour: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        address_link: {
            type: DataTypes.STRING(255),
        },
        pictures: {
            type: DataTypes.STRING(255),
        },
        availability: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

module.exports = SpaceListing;
