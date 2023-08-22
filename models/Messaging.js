const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Message = sequelize.define(
    "Message",
    {
        message_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "message_id" // Match the field name from your database
        },
        parent_message_id: {
            type: DataTypes.INTEGER,
            field: "parent_message_id" // Message threading
        },
        conversation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Conversation', // Replace 'Conversation' with your actual Conversation model name
                key: 'conversation_id'
            }
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', 
                key: 'user_id'
            }
        },
        recipient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // Replace 'User' with your actual User model name
                key: 'user_id'
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        sent_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
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

module.exports = Message;

