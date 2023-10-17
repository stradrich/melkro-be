const express = require('express')
const router = express.Router()
const listingController = require('../controllers/listings.controller')
// implement your middleware here
const { verifyToken, checkRoles } = require("../middlewares/auth.middleware")
const { viewListingsByUserId } = require('../controllers/listings.controller')
// Create a new listing

// router.post('/', verifyToken, checkRoles(['admin', 'provider']),listingController.createListing);

// router.use('/listings', verifyToken, checkRoles(['admin', 'provider']), listingRoutes);

// router.post('/', verifyToken, checkRoles(['admin', 'provider']), (req, res) => {
//     // Call the createListing method from the controller
//     listingController.createListing(req, res);
//   });
router.post('/', (req, res) => {
  // Call the createListing method from the controller
  listingController.createListing(req, res);
});

// Middware is messing up some of the functionalities, I've turned off some of the extra protection, for now.

// View All listings
// router.get('/', verifyToken, checkRoles(['admin', 'provider', 'musician']), listingController.viewAllListings);
router.get('/', listingController.viewAllListings);

// View a listing by listing ID
// router.get('/listing/:id', verifyToken, checkRoles(['admin', 'provider', 'musician']), listingController.viewListing);
router.get('/listing/:id', listingController.viewListing);


// View listings by user ID
// router.get('/users/:userId/listings', verifyToken, checkRoles(['admin', 'provider', 'musician']), viewListingsByUserId);
router.get('/users/:userId/listings', viewListingsByUserId);
// router.get('/users/:userId/listings', listingController.viewListing);
// router.get('/users/:userId/listings', viewListingsByUserId);



// Update a listing by ID
router.put('/listing/:id', listingController.updateListing);
// router.put('/listing/:id', verifyToken, checkRoles(['admin', 'provider']), listingController.updateListing);

// Delete a listing by ID
// router.delete('/listing/:id', verifyToken, checkRoles(['admin', 'provider']), listingController.deleteListing);
router.delete('/listing/:id', listingController.deleteListing);

module.exports = router;
