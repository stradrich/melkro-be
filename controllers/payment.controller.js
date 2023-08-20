const stripe = require('stripe')('STRIPE_KEY');

const createPaymentAttempt = async (req, res) => {
    try {
        const paymentAttempt = await stripe.paymentAttempts.create({
            amount: 1000, // amount in cents
            currency: 'usd',
        });

        res.json({ clientSecret: paymentAttempt.client_secret });
    } catch (error) {
        console.error('Error creating Payment Attempt:', error);
        res.status(500).json({ error: 'Error creating Payment Attempt' });
    }
}

// payment after confirm booking

// Update frontend
// On your frontend, make an AJAX request to the /create-payment-intent route to get the clientSecret.
// Use the obtained clientSecret to initiate the payment process on the frontend using the Stripe Elements or Checkout.
// After a successful payment, you can handle the success or failure accordingly.

module.exports = {
    createPaymentAttempt,
}