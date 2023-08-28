// Rating(s) and Review(s)

// Customer to Provider's Listing (BOTH Rating and Review)
// Provider to Customer (ONLY REVIEW)


// reviewRating.controller.js
const ReviewRating = require('../models/RnR');

// Create a new review and rating
async function createReviewRating(req, res) {
    console.log('checkpoint 1');
    try {
        console.log('checkpoint 2');
        const newReviewRating = await ReviewRating.create(req.body);
        return res.status(201).json(newReviewRating);
    } catch (error) {
        console.log('checkpoint 3');
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the review and rating.' });
    }
}

// View a review and rating by ID
async function viewReviewRating(req, res) {
    const reviewId = req.params.id;
    try {
        const reviewRating = await ReviewRating.findByPk(reviewId);
        if (!reviewRating) {
            return res.status(404).json({ error: 'Review and rating not found.' });
        }
        return res.status(200).json(reviewRating);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the review and rating.' });
    }
}

// View all review ratings
async function viewAllReviewRatings(req, res) {
    try {
        const allReviewRatings = await ReviewRating.findAll();
        return res.status(200).json(allReviewRatings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching all review ratings.' });
    }
}

// Update a review and rating by ID
async function updateReviewRating(req, res) {
    const reviewId = req.params.id;
    try {
        const [updatedCount, updatedReviewRating] = await ReviewRating.update(req.body, {
            where: { review_id: reviewId },
            returning: true, // Return the updated review and rating
        });
        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Review and rating not found.' });
        }
        return res.status(200).json(updatedReviewRating[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the review and rating.' });
    }
}

// Delete a review and rating by ID
async function deleteReviewRating(req, res) {
    const reviewId = req.params.id;
    try {
        const deletedCount = await ReviewRating.destroy({
            where: { review_id: reviewId },
        });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Review and rating not found.' });
        }
        return res.status(204).end(); // No content
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the review and rating.' });
    }
}

// Calculate ratings
// async function calculateAverageRatings(req, res) {
//     try {
//       const averageRatings = await SpaceListing.findAll({
//         attributes: ['listing_id'],
//         include: [
//           {
//             model: ReviewsRating,
//             attributes: [
//               [sequelize.fn('AVG', sequelize.col('rating')), 'average_rating'],
//             ],
//           },
//         ],
//         group: ['space_listings.listing_id'],
//       });
  
//       res.status(200).json(averageRatings);
//     } catch (error) {
//       res.status(500).json({ error: 'An error occurred while calculating average ratings.' });
//     }
//   }

module.exports = {
    createReviewRating,
    viewReviewRating,
    viewAllReviewRatings,
    updateReviewRating,
    deleteReviewRating,
};
