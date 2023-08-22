const SpaceListing = require("../models/Listing");

// create listing

async function createListing(req, res) { 
    try {
        const newListing = await SpaceListing.create(req.body);
        return res.status(201).json(newListing)
    } catch (error) {
        console.error(error);
        return res.status(500).json( { error: 'An error occurred while creating the listing.' });
    }
}
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
// update listing
async function updateListing(req, res) {
    const listingId = req.params.id;
    try {
        const [updatedCount, updatedListing] = await SpaceListing.update(req.body, {
            where: { listing_id: listingId },
            returning: true, // Return the updated listing
        });
        if (updatedCount === 0) {
            return res.status(404).json( { error: "Listing not found. "});
        }
        return res.status(200).json([0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the listing. '})
    }
}
// delete listing 
async function deleteListing(req, res) {
    const listingId = req.params.id;
    try {
        const deletedCount = await SpaceListing.destory({
            where: { listing_id: listingId}, 
        });
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Listing not found. '});
        }
        return res.status(204).end(); // No content
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the listing. '})
    }
}

module.exports = {
    createListing,
    viewListing,
    updateListing,
    deleteListing
}