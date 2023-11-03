const Timeslot = require('../models/Timeslot'); // Make sure the path to your Timeslot model is correct
const User = require('../models/User')

// Controller function to create a timeslot
async function createTimeslot(req, res) {
  try {
    console.log('checkpoint 1');
    const { user_id, booking_id, timeslot_datetime_start,timeslot_datetime_end } = req.body;

    // Create the timeslot in the database
    const timeslot = await Timeslot.create({
      user_id: user_id,
      booking_id: booking_id,
      timeslot_datetime_start: timeslot_datetime_start,
      timeslot_datetime_end: timeslot_datetime_end
    });
    console.log('checkpoint 2');
    return res.status(201).json(timeslot);
  } catch (error) {
    console.log('checkpoint 3');
    console.error('Error creating timeslot:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function to get all timeslots
async function getAllTimeslots(req, res) {
  console.log("See All Timeslots");
  try {
    const timeslots = await Timeslot.findAll();
   return  res.status(200).json(timeslots);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getTimeslotById(req, res) {
    console.log('checkpoint 1');
  try {
    console.log('checkpoint 2');
    const timeslotId = req.params.id; // Assuming you're passing the timeslot ID in the URL parameter


    // Find the timeslot by ID
    const timeslot = await Timeslot.findByPk(timeslotId);
  
    if (!timeslot) {
      console.log('checkpoint 3');
      return res.status(404).json({ error: 'Timeslot not found' });
    }
  
    return res.status(200).json(timeslot);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}








// Controller function to update a timeslot
// async function updateTimeslot(req, res) {
//     try {
//       const timeslotId = req.params.id; // Assuming you're passing the timeslot ID in the URL parameter
//       const { timeslot_datetime_start,timeslot_datetime_end } = req.body;
  
//       // Find the timeslot by ID
//       const timeslot = await Timeslot.findByPk(timeslotId);
  
//       if (!timeslot) {
//         return res.status(404).json({ error: 'Timeslot not found' });
//       }
  
//       // Update the timeslot
//       timeslot.timeslot_datetime_start = timeslot_datetime_start;
//       timeslot.timeslot_datetime_end = timeslot_datetime_end;
//       await timeslot.save();
  
//       return res.status(200).json(timeslot);
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   }
const updateTimeslot = async (req, res) => {
  try {
    const { user_id, booking_id, timeslot_datetime_start, timeslot_datetime_end } = req.body;

    // Validate or sanitize input data if necessary

    // Update the timeslot in the database
    const updatedTimeslot = await Timeslot.update(
      {
        user_id,
        booking_id,
        timeslot_datetime_start,
        timeslot_datetime_end,
      },
      {
        where: {
          timeslot_id: req.params.id, // Assuming the timeslot_id is in the URL parameter
        },
      }
    );

    if (updatedTimeslot[0] === 1) {
      res.status(200).json({ message: 'Timeslot updated successfully' });
    } else {
      res.status(404).json({ error: 'Timeslot not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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
  
      return res.status(204).json(); // No content
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  

  module.exports = {
    createTimeslot,
    getAllTimeslots,
    getTimeslotById,
    updateTimeslot,
    deleteTimeslot,
  };

