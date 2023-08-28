const express = require('express');
const SpaceListing = require('../models/Listing');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router()

require('dotenv').config()

// app.use(express.static('public'));

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
  // const customer = await stripe.customers.create({
  //     metadata: {
  //         userId: req.body.userId,
  //         cart: JSON.stringify(req.body.cartItem)
  //     }
  // })
  // const line_items = req.body.cartItems.map(item => {
  //     return {
  //         price_data: {
  //             currency: 'usd',
  //             product_data: { // listings!!
  //               name: product.name,
  //               metadata: {
  //                 id: item.id
  //               }
  //             },
  //              unit_amount: product.price *  100,
  //           },
  //              quantity: product.quantity,
  //     }
  // })


});

// Create Order


// Stripe Webhook 
// This is your Stripe CLI webhook secret for testing your endpoint locally.

let endpointSecret;



router.post('/webhook', express.raw({ type: 'application/json' })), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('Webhook verified');
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type

  }

  // Handle the event
  //   switch (event.type) {
  //     case 'payment_intent.succeeded':
  //       const paymentIntentSucceeded = event.data.object;
  //       // Then define and call a function to handle the event payment_intent.succeeded
  //       break;
  //     // ... handle other event types
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log(customer);
        console.log("data", data);
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
}



module.exports = router; 
