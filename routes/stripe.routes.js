const express = require('express');
const SpaceListing = require('../models/Listing');
const Payment = require("../models/Payment")
const Booking = require("../models/Booking")
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router()



// const app = express();

require('dotenv').config()

const YOUR_DOMAIN = 'http://localhost:8080';


router.post('/create-checkout-session', async (req, res) => {

  try {
    const listingId = req.body.listingId;
    const hours = req.body.hours;
    const addons = req.body.addons;
    
    if (!listingId) throw "Invalid listing id";
    if (!hours) throw "Invalid hours";

    // Check if the type of addons is an array or not
    if (addons && !Array.isArray(addons)) throw "Invalid addons";

    const listing = await SpaceListing.findByPk(listingId);
    console.log("listing", listing);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found.' });
    }

    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: listing.description,
          },
          unit_amount: listing.price_per_hour * parseInt(hours) * 100,
        },
        quantity: 1,
      },
    ]
    
    if (addons && addons.length > 0) {
      addons.forEach(addon => {
        lineItems.push({
          price: addon.priceId,
          quantity: addon.qty,
        })
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while creating the checkout session." });

  }

});

// Stripe Webhook 
const db = require('../models/Payment'); // Replace with your database module or configuration

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const event = req.body;
    if (event.type !== "checkout.session.completed") {
      console.log(`Unhandled event type ${event.type}`);
      return res.send();
    }

    const payload = event.data.object;

     // Extract the required values from the Stripe webhook payload
     const { booking_id, amount_total, payment_method_types } = payload;

    // Update payment data in your database
    const paymentData = {
      booking_id: booking_id,
      amount: amount_total,
      amount_total: amount_total,
      payment_method: payment_method_types[0], // Assuming it's an array
      status: "complete"
  };

    // Update booking data in your database
    const bookingData = {
        booking_id: booking_id,
        status: "confirmed"
    };

    // Update payment status to "complete"
    // Didn't update automatically, why?
    await Payment.update(paymentData, { where: { booking_id: booking_id } });

    // Update booking status to "confirmed"
    // Didn't update automatically, why?
    await Booking.update(bookingData, { where: { booking_id: booking_id } });

    try {
      console.log('Updating payment data for booking:', paymentData.booking_id);
      await db.query('UPDATE payments SET amount = ?, payment_method = ? WHERE booking_id = ?', [paymentData.amount, paymentData.payment_method, paymentData.booking_id]);
      console.log('Payment data updated in the database');
    } catch (error) {
      console.error('Error updating payment data in the database:', error);
    }

    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});







module.exports = router; 
