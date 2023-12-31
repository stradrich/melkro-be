const Payment = require('../models/Payment');
const Booking = require('../models/Booking')

// Create
const createPayment = async (req, res) => {
    try {
        const { booking_id, amount, amount_total, payment_method, payment_method_types, status } = req.body;

        // Create a new payment record in the SQL database
        const paymentRecord = await Payment.create({
            booking_id: booking_id,
            amount: amount,
            amount_total: amount_total,
            payment_method: payment_method,
            payment_method_types: payment_method_types,
            status: status,
        });

        // Check if the payment status is "complete" and update the corresponding booking status
        if (status === "complete") {
            await Booking.update({ status: "confirmed" }, { where: { booking_id: booking_id } });
        }

        const response = {
            message: 'Payment record created successfully',
            paymentRecord: paymentRecord
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error('Error creating Payment:', error);
        return res.status(500).json({ error: 'Error creating Payment' });
    }
};




// Read (by id)
async function getPaymentById(req, res) {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        return res.json(payment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the payment' });
    }
}

// Read ALL
async function getAllPayments(req, res) {
    try {
        const payments = await Payment.findAll();
        return res.json(payments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching payments' });
    }
}

// UPDATE
// async function updatePayment(req, res) {
//     try {
//         const { amount, payment_method } = req.body;

//         // Check if the payment exists
//         const payment = await Payment.findByPk(req.params.id);
//         if (!payment) {
//             return res.status(404).json({ error: 'Payment not found' });
//         }

//         // Update payment details
//         payment.amount = amount;
//         payment.payment_method = payment_method;
//         await payment.save();

//         return res.json(payment);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'An error occurred while updating the payment' });
//     }
// }

async function updatePayment(req, res) {
    try {
        const { amount, amount_total, payment_method, payment_method_types, status } = req.body;

        // Check if the payment exists
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // Update payment details
        payment.amount = amount || payment.amount; // If not provided, keep the existing value
        payment.amount_total = amount_total || payment.amount_total;
        payment.payment_method = payment_method || payment.payment_method;
        payment.payment_method_types = payment_method_types || payment.payment_method_types;
        payment.status = status || payment.status;

        // Save the updated payment
        await payment.save();

        return res.json(payment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the payment' });
    }
}


// DELETE
async function deletePayment(req, res) {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        await payment.destroy();
        return res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the payment' });
    }
}

module.exports = {
    createPayment,
    getPaymentById,
    getAllPayments,
    updatePayment,
    deletePayment,
};




// payment after confirm booking

// Update frontend
// On your frontend, make an AJAX request to the /create-payment-intent route to get the clientSecret.
// Use the obtained clientSecret to initiate the payment process on the frontend using the Stripe Elements or Checkout.
// After a successful payment, you can handle the success or failure accordingly.

