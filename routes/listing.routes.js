const express = require('express')
const router = express.Router()
const listingController = require('../controllers/listings.controller')
// implement your middleware here
const { login, verifyToken, checkRoles } = require("../middlewares/auth.middleware")

// Create a new listing
router.post('/listings', verifyToken, checkRoles(['admin', 'provider']),listingController.createListing);

// View a listing by ID
router.get('/listings/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), listingController.viewListing);

// Update a listing by ID
router.put('/listings/:id', verifyToken, checkRoles(['admin', 'provider']), listingController.updateListing);

// Delete a listing by ID
router.delete('/listings/:id', verifyToken, checkRoles(['admin', 'provider']), listingController.deleteListing);

module.exports = router;
