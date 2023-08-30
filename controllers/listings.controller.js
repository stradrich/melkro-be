const SpaceListing = require("../models/Listing");

// create listing
const stripe = require('stripe')(process.env.STRIPE_KEY);

async function createListing(req, res) {
    try {
        // Create the listing in your database
        const newListing = await SpaceListing.create({...req.body});

        // Create a Stripe product for the new listing
        const stripeProduct = await stripe.products.create({
            name: newListing.name,
            // name: 'Test Sell 1', 
            description: newListing.description,
            // price_per_hour: 100.00
            // ... other properties
        });

        // Store the Stripe product ID in your listing
        newListing.stripeProductId = stripeProduct.id;
        await newListing.save();

        return res.status(201).json(newListing);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the listing.' });
    }
}

// async function createListing(req, res) { 

//     console.log('checkpoint 0');
//     try {
//         console.log('checkpoint 1');
//         const newListing = await SpaceListing.create({...req.body});
//         console.log('checkpoint 2 new listing', newListing);
        
//         // return res.status(201).json(newListing)
//         return res.json(newListing)
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json( { error: 'An error occurred while creating the listing.' });
//     }
// }

// view (read) listing

async function viewListing(req, res) {
    const listingId = req.params.id;
    try {
        const listing = await SpaceListing.findByPk(listingId);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found.'});
        }
        return res.status(200).json(listing);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching the listing. "}); 
        
    }
}

async function viewAllListings(req, res) {
    try {
        const listings = await SpaceListing.findAll();
        if (listings.length === 0) {
            return res.status(404).json({ error: 'No listings found.' });
        }
        return res.status(200).json(listings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the listings.' });
    }
}
 
// update listing
async function updateListing(req, res) {
    const listingId = req.params.id;

    try {
        const listing = await SpaceListing.findByPk(listingId);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found.' });
        }

        if (!listing.stripeProductId) {
            return res.status(400).json({ error: 'Stripe product ID is missing for this listing.' });
        }

        await stripe.products.update(listing.stripeProductId, {
            name: req.body.name,
            description: req.body.description,
            // ... other properties to update
        });

        await listing.update(req.body);

        return res.status(200).json(listing);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the listing.' });
    }
}





// async function updateListing(req, res) {
//     const listingId = req.params.id;
//     try {
//         const [updatedCount, updatedListing] = await SpaceListing.update(req.body, {
//             where: { listing_id: listingId },
//             returning: true, // Return the updated listing
//         });
//         if (updatedCount === 0) {
//             return res.status(404).json( { error: "Listing not found. "});
//         }
//         // res.json(updatedCount) 
//         return res.json(updatedListing) 
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'An error occurred while updating the listing. '})
//     }
// }
// delete listing 
async function deleteListing(req, res) {
    const listingId = req.params.id;

    try {
        // Find the listing in the database
        const listing = await SpaceListing.findByPk(listingId);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found.' });
        }

        // Delete the listing in the Stripe product
        await stripe.products.del(listing.stripeProductId);

        // Delete the listing in the database
        await listing.destroy();

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the listing.' });
    }
}



// async function deleteListing(req, res) {
//     const listingId = req.params.id;
//     try {
//         const deletedCount = await SpaceListing.destroy({
//             where: { listing_id: listingId}, 
//         });
//         if (deletedCount === 0) {
//             return res.status(404).json({ error: 'Listing not found. '});
//         }
//         // return res.status(204).end(); // No content
//        return res.json(deletedCount) 
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'An error occurred while deleting the listing. '})
//     }
// }

module.exports = {
    createListing,
    viewListing,
    viewAllListings,
    updateListing,
    deleteListing
}