const express = require('express');
const router = express.Router();
const timeslotController = require('../controllers/timeslot.controller');

// Define routes
router.get('timeslot/', timeslotController.getAllTimeslots);
router.get('timeslot/:id', timeslotController.getAllTimeslots);
router.post('timeslot/', timeslotController.createTimeslot);
router.put('timeslot/:id', timeslotController.updateTimeslot); // Update timeslot route
router.delete('timeslot/:id', timeslotController.deleteTimeslot); // Delete timeslot route

module.exports = router;
