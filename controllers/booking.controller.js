// booking.controller.js
const Booking = require('../models/Booking');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('../models/User'); // Import the User model

// booking.controller.js
const { verifyToken } = require('../middlewares/auth.middleware'); // Import the verifyToken middleware

// Create a new booking
async function createBooking(req, res) {
    try {
        console.log('checkpoint 1');

        const {
            listing_id,
            user_id,
            // musician_id,
            status,
            reminder,
            check_in,
            check_out,
            required_equipments,
            other_remarks,
            purpose,
            first_instrument,
            capacity,
            // other properties...
        } = req.body;

        const newBooking = await Booking.create({
            listing_id: listing_id,
            user_id: user_id,
            // musician_id: musician_id,
            status: status,
            reminder: reminder,
            check_in: check_in,
            check_out: check_out,
            required_equipments: required_equipments,
            other_remarks: other_remarks,
            purpose: purpose,
            first_instrument: first_instrument,
            capacity: capacity,
            
        });

        console.log('checkpoint 2');
        return res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        console.log('checkpoint 3');
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

// View all bookings
async function viewAllBookings(req, res) {
    try {
        const bookings = await Booking.findAll();
        return res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the bookings.' });
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
        // res.json(updatedBooking)
        return res.json(updatedBooking)
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
        // res.json(deletedCount)
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
    viewAllBookings,
    deleteBooking,
};
