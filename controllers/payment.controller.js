const Payment = require('../models/Payment');

const createPayment = async (req, res) => {
    console.log("checkpoint 1");
    try {
        const { booking_id, amount, payment_method } = req.body;

        // Create a new payment record in the SQL database
        const paymentRecord = await Payment.create({
            booking_id: booking_id,
            amount: amount,
            payment_method: payment_method,
        });

        console.log("checkpoint 2");
        
        const response = {
            message: 'Payment record created successfully',
            paymentRecord: paymentRecord
        };
        
        res.status(201).json(response);
        console.log("checkpoint 3", paymentRecord);
    } catch (error) {
        console.error('Error creating Payment:', error);
        res.status(500).json({ error: 'Error creating Payment' });
    }
}

module.exports = {
    createPayment,
}




// payment after confirm booking

// Update frontend
// On your frontend, make an AJAX request to the /create-payment-intent route to get the clientSecret.
// Use the obtained clientSecret to initiate the payment process on the frontend using the Stripe Elements or Checkout.
// After a successful payment, you can handle the success or failure accordingly.

