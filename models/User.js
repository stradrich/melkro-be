const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define(
    "users",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'provider', 'musician'),
            defaultValue: 'musician',
        },
        firstName: {
            type: DataTypes.STRING(255),
        },
        lastName: {
            type: DataTypes.STRING(255),
        },
        major: {
            type: DataTypes.ENUM('Piano', 'Violin', 'Cello', 'Guitar', 'Others'),
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

module.exports = User;
