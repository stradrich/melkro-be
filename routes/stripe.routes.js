const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router()

require('dotenv').config()

// app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:8080';


router.post('/create-checkout-session', async (req, res) => {

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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
            currency: 'usd',
            product_data: {
            //   name: product.name,
            name: "music space",
            },
            // unit_amount: product.price,
            unit_amount: 10000,
          },
            //  quantity: product.quantity,
            quantity: 1, 
      },
      {
        price_data: {
            currency: 'usd',
            product_data: {
            //   name: product.name,
            name: "instrument rental",
            },
            // unit_amount: product.price,
            unit_amount: 10000,
          },
            //  quantity: product.quantity,
            quantity: 2,
      },
    ],
    // customer: customer.id,
    // line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({url: session.url });
});

// Create Order


// Stripe Webhook 
// This is your Stripe CLI webhook secret for testing your endpoint locally.

let endpointSecret;



router.post('/webhook', express.raw({type: 'application/json'})), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if(endpointSecret) {
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
