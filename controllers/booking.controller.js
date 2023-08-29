// booking.controller.js
const Booking = require('../models/Booking');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('../models/User'); // Import the User model

// booking.controller.js
const { verifyToken } = require('../middlewares/auth.middleware'); // Import the verifyToken middleware

// Create a new booking
async function createBooking(req, res) {
    try {// booking.controller.js
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
        
        // ... other controller functions ...
        
        const newBooking = await Booking.create(req.body);
        return res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the booking.' });
    }
}

// ... other controller functions ...





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
