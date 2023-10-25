const SpaceListing = require("../models/Listing");

// create listing
const stripe = require('stripe')(process.env.STRIPE_KEY);

async function createListing(req, res) {
    try {
        console.log('Request Payload:', req.body);
        // Create the listing in your database 
        const { listingData: { name, price_per_hour, ...otherFields } } = req.body;
    
        console.log('Extracted Data:', { name, price_per_hour, ...otherFields });
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required in the request.' });
        }

        // Create the listing in your database
        const newListing = await SpaceListing.create({
        user_id: otherFields.user_id ? otherFields.user_id : null,
        price_per_hour: parseFloat(price_per_hour), // Ensure it's a valid decimal
        name: name,
        ...otherFields,
            });

        console.log('New Listing:', newListing);
        console.log(name)


        // Create a Stripe product for the new listing
        const stripeProduct = await stripe.products.create({
            name: newListing.name,
            // name: 'Test Sell 1', 
            description: newListing.description,
            // price: newListing.price_per_hour,
            // price_per_hour: 100.00
            // unit_amount: Math.round(newListing.price_per_hour * 100), // Convert to cents
            // unit_amount: 1000, // The amount in cents (for example, $10.00 would be 1000)
            // currency: 'usd', // The currency
            // recurring: { 
            //     interval: 'once',// This makes it a one-time payment
            // },
            // ... other properties
        });

            // Set the price directly for the product
        const stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: Math.round(newListing.price_per_hour * 100),
            // unit_amount: 1000, // The amount in cents (for example, $10.00 would be 1000)
            currency: 'usd',
        });

        // Store the Stripe product ID and price IDs in your listing
        newListing.stripeProductId = stripeProduct.id;
        console.log('Stripe Product ID:', newListing.stripeProductId);

        newListing.stripePriceId = stripePrice.id;
        console.log('Stripe Price ID:', newListing.stripePriceId);

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

// View listing by Listing ID
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

// View listing by provider ID?
// Assuming you have a method in your model or database connection to fetch listings by user_id
async function viewListingsByUserId(req, res) {
    
    console.log('View Listings By User ID Route Accessed');
    
    // const userId = req.params.userId; // Assuming you're passing the user ID as a parameter
  
    try {
      // Fetch listings from the database for the given user ID
      const userlistings = await SpaceListing.findAll({ where: { user_id: req.params.userId } });
  
      // Send the listings in the response
      res.json(userlistings);
    } catch (error) {
      console.error('Error fetching user listings:', error);
      res.status(500).json({ error: 'An error occurred while fetching listings.' });
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
// async function updateListing(req, res) {
//     const listingId = req.params.id;

//     try {
//         const listing = await SpaceListing.findByPk(listingId);

//         if (!listing) {
//             return res.status(404).json({ error: 'Listing not found.' });
//         }

//         if (!listing.stripeProductId) {
//             return res.status(400).json({ error: 'Stripe product ID is missing for this listing.' });
//         }

//         await stripe.products.update(listing.stripeProductId, {
//             name: req.body.name,
//             description: req.body.description,
//             // ... other properties to update
//         });

//         await listing.update(req.body);

//         return res.status(200).json(listing);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'An error occurred while updating the listing.' });
//     }
// }

async function updateListing(req, res) {
    const listingId = req.params.id;

    try {
        console.log('Request Payload:', req.body);
        
        // Fetch the listing from your database
        const listing = await SpaceListing.findByPk(listingId);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found.' });
        }

        console.log('Existing Listing:', listing);

        // Update the listing in your database
        const { name, price_per_hour, ...otherFields } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required in the request.' });
        }

        await listing.update({
            // user_id: otherFields.user_id ? otherFields.user_id : null,
            user_id: otherFields.user_id,
            price_per_hour: parseFloat(price_per_hour), // Ensure it's a valid decimal
            name: name,
            ...otherFields,
        });

        console.log('Updated Listing:', listing);

        // UPDATE PRODUCT NAME AND PRODUCT ID FROM API DOESN'T WORK FOR NOW
        // Update the corresponding Stripe product
        await stripe.products.update(listing.stripeProductId, {
            name: listing.name,
            description: listing.description,
            // ... other properties
        });

           // Update the corresponding Stripe product price
        //    await stripe.prices.update(listing.stripePriceId, {
            // unit_amount: Math.round(listing.price_per_hour * 100),
            // unit_amount: 1000, // The amount in cents (for example, $10.00 would be 1000)
            // currency: 'usd',
        // });

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

const listingController = {
    createListing: (req, res) => {
      console.log('Received Payload:', req.body);
  
      // Rest of your code for creating a listing
      // Make sure to handle errors and send appropriate responses
  
      // For example, you might have something like:
      try {
        // Your code to create a listing
        // ...
        // Send a success response
        res.status(201).json({ message: 'Listing created successfully' });
      } catch (error) {
        // Log the error
        console.error('Error creating listing:', error);
        // Send an error response
        res.status(500).json({ error: 'An error occurred while creating the listing.' });
      }
    },
  
    // Other methods
  };

module.exports = {
    createListing,
    viewListing,
    viewListingsByUserId,
    viewAllListings,
    updateListing,
    deleteListing,
   listingController
}