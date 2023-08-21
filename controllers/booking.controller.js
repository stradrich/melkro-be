// booking.controller.js
const Booking = require('../models/Booking');

// Create a new booking
async function createBooking(req, res) {
    try {
        const newBooking = await Booking.create(req.body);
        return res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the booking.' });
    }
}

// View a booking by ID
async function viewBooking(req, res) {
    const bookingId = req.params.id;
    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found.' });
        }
        return res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the booking.' });
    }
}

// Update a booking by ID
async function updateBooking(req, res) {
    const bookingId = req.params.id;
    try {
        const [updatedCount, updatedBooking] = await Booking.update(req.body, {
            where: { booking_id: bookingId },
            returning: true, // Return the updated booking
        });
        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Booking not found.' });
        }
        return res.status(200).json(updatedBooking[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the booking.' });
    }
}

// Delete a booking by ID
async function deleteBooking(req, res) {
    const bookingId = req.params.id;
    try {
        const deletedCount = await Booking.destroy({
            where: { booking_id: bookingId },
        });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Booking not found.' });
        }
        return res.status(204).end(); // No content
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the booking.' });
    }
}

module.exports = {
    createBooking,
    viewBooking,
    updateBooking,
    deleteBooking,
};
