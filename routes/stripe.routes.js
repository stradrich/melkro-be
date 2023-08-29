const express = require('express');
const SpaceListing = require('../models/Listing');
const Payment = require("../models/Payment")
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
const crypto = require('crypto');
const db = require('../models/Payment'); // Replace with your database module or configuration

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  console.log('checkpoint 1');
  const sigHeader = req.get('stripe-signature'); // Get the stripe-signature header

  const sig = req.headers['stripe-signature'];

  let event;
  try {
    console.log('checkpoint 2');
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('checkpoint 3');
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Calculate the expected signature
  // const payload = req.body;
  const payload = JSON.stringify(req.body);
  console.log('Original Payload:', payload);
  const expectedSig = crypto
    .createHmac('sha256', endpointSecret)
    .update(payload)
    .digest('hex');

    console.log('checkpoint 4');
    console.log('Calculated Signature:', expectedSig);

  // Compare the calculated signature with the header signature
  if (sigHeader !== expectedSig) {
    console.log('checkpoint 5');
    return res.status(400).send('Webhook signature verification failed');
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object;
      const paymentData = {
        booking_id: checkoutSession.client_reference_id,
        amount: checkoutSession.amount_total / 100,
        payment_method: checkoutSession.payment_method_types[0],
      };

      // Insert payment data into your database
      try {
        console.log('checkpoint 6');
        await db.query('INSERT INTO payments SET ?', paymentData);
        console.log('Payment data inserted into the database');
      } catch (error) {
        console.log('checkpoint 7');
        console.error('Error inserting payment data into the database:', error);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});




module.exports = router; 
