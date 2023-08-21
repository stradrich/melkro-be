const express = require('express')
const router = express.Router()
const RnRController = require('../controllers/RnR.controller')
// implement your middleware here
const { login, verifyToken, checkRoles }= require('../middlewares/auth.middleware'); // Adjust the path based on your project structure

// Create a new review and rating
router.post('/reviews', verifyToken, checkRoles(['admin', 'provider', 'customer']), reviewRatingController.createReviewRating);

// View a review and rating by ID
router.get('/reviews/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), reviewRatingController.viewReviewRating);

// Update a review and rating by ID
router.put('/reviews/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), reviewRatingController.updateReviewRating);

// Delete a review and rating by ID
router.delete('/reviews/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), reviewRatingController.deleteReviewRating);

module.exports = router;
