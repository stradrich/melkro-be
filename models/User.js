const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Users = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "user_id" // Match the field name from your database
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'provider', 'customer'),
            defaultValue: 'customer'
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

module.exports = Users;
