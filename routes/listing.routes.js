const express = require('express')
const router = express.Router()
const listingController = require('../controllers/listings.controller')
// implement your middleware here
const { verifyToken, checkRoles } = require("../middlewares/auth.middleware")

// Create a new listing
router.post('/', verifyToken, checkRoles(['admin', 'provider']),listingController.createListing);

// View All listings
router.get('/', verifyToken, checkRoles(['admin', 'provider', 'customer']), listingController.viewAllListings);
// View a listing by ID
router.get('/listing/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), listingController.viewListing);

// Update a listing by ID
router.put('/listing/:id', verifyToken, checkRoles(['admin', 'provider']), listingController.updateListing);

// Delete a listing by ID
router.delete('/listing/:id', verifyToken, checkRoles(['admin', 'provider']), listingController.deleteListing);

module.exports = router;
