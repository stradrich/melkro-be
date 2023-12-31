const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const stripe = require('stripe')(process.env.STRIPE_KEY);


const SpaceListing = sequelize.define(
    "space_listing",
    {
        listing_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },   
        stripeProductId: {
            type: DataTypes.STRING, // Store the Stripe Product ID
        },
        stripePriceId: {
            type: DataTypes.STRING, // Store the Stripe Price ID
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        },
        name: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        capacity: {
            type: DataTypes.INTEGER,
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


SpaceListing.addHook('afterCreate', async (listing) => {
    try {
        // Create a Stripe product for the new listing
        const stripeProduct = await stripe.products.create({
            name: listing.name,
            description: listing.description,
            // ... other properties
        });

        // Store the Stripe product ID in the listing
        await listing.update({ stripeProductId: stripeProduct.id });
    } catch (error) {
        console.error('Error creating Stripe product:', error);
    }
});

module.exports = SpaceListing;
