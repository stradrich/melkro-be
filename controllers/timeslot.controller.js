const { Timeslot } = require('../models/Timeslot'); // Make sure the path to your Timeslot model is correct
const User = require('../models/User')

// Controller function to create a timeslot
async function createTimeslot(req, res) {
  try {
    console.log('checkpoint 1');
    const { user_id, timeslot_datetime } = req.body;

    // Create the timeslot in the database
    const timeslot = await Timeslot.create({
      user_id,
      timeslot_datetime,
    });
    console.log('checkpoint 2');
    console.error(error); // Log the error for debugging
    res.status(201).json(timeslot);
  } catch (error) {
    console.log('checkpoint 3');
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to get all timeslots
async function getAllTimeslots(req, res) {
  try {
    const timeslots = await Timeslot.findAll();
    res.status(200).json(timeslots);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getTimeslotById(req, res) {
    console.log('checkpoint 1');
  try {
    console.log('checkpoint 2');
    // const timeslotId = req.params.id; // Assuming you're passing the timeslot ID in the URL parameter
    const userId = req.params.user_id; // 


    // Find the timeslot by ID
    // const timeslot = await Timeslot.findByPk(timeslotId);
    const timeslot = await userId.findByPk(userId);
  
    if (!timeslot) {
      console.log('checkpoint 3');
      return res.status(404).json({ error: 'Timeslot not found' });
    }
  
    res.status(200).json(timeslot);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}








// Controller function to update a timeslot
async function updateTimeslot(req, res) {
    try {
      const timeslotId = req.params.id; // Assuming you're passing the timeslot ID in the URL parameter
      const { timeslot_datetime } = req.body;
  
      // Find the timeslot by ID
      const timeslot = await Timeslot.findByPk(timeslotId);
  
      if (!timeslot) {
        return res.status(404).json({ error: 'Timeslot not found' });
      }
  
      // Update the timeslot
      timeslot.timeslot_datetime = timeslot_datetime;
      await timeslot.save();
  
      res.status(200).json(timeslot);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Controller function to delete a timeslot
async function deleteTimeslot(req, res) {
    try {
      const timeslotId = req.params.id; // Assuming you're passing the timeslot ID in the URL parameter
  
      // Find the timeslot by ID
      const timeslot = await Timeslot.findByPk(timeslotId);
  
      if (!timeslot) {
        return res.status(404).json({ error: 'Timeslot not found' });
      }
  
      // Delete the timeslot
      await timeslot.destroy();
  
      res.status(204).json(); // No content
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

  module.exports = {
    createTimeslot,
    getAllTimeslots,
    getTimeslotById,
    updateTimeslot,
    deleteTimeslot,
  };

