const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/booking.controller')
// implement your middleware here
const { verifyToken, checkRoles} = require('../middlewares/auth.middleware')

// Create a new booking
router.post('/bookings', verifyToken, checkRoles(['admin', 'provider', 'musician']), bookingController.createBooking);

// View a booking by ID
router.get('/bookings/:id', verifyToken, checkRoles(['admin', 'provider', 'musician']), bookingController.viewBooking);
// View all booking 
router.get('/bookings/', verifyToken, checkRoles(['admin']), bookingController.viewAllBookings);

// Update a booking by ID
router.put('/bookings/:id', verifyToken, checkRoles(['admin', 'provider', 'musician']), bookingController.updateBooking);

// Delete a booking by ID
router.delete('/bookings/:id', verifyToken, checkRoles(['admin', 'provider', 'musician']), bookingController.deleteBooking);

module.exports = router;
