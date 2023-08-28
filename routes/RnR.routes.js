const express = require('express')
const router = express.Router()
const RnRController = require('../controllers/RnR.controller')
// implement your middleware here
const { verifyToken, checkRoles }= require('../middlewares/auth.middleware'); // Adjust the path based on your project structure

// Create a new review and rating
router.post('/reviews-ratings', verifyToken, checkRoles(['admin', 'provider', 'customer']), RnRController.createReviewRating);

// View a review and rating by ID
router.get('/reviews-ratings/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), RnRController.viewReviewRating);

// View a review and rating by ID
router.get('/reviews-ratings/', verifyToken, checkRoles(['admin', 'provider', 'customer']), RnRController.viewAllReviewRatings);

// Update a review and rating by ID
router.put('/reviews-ratings/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), RnRController.updateReviewRating);

// Delete a review and rating by ID
router.delete('/reviews-ratings/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), RnRController.deleteReviewRating);

module.exports = router;
