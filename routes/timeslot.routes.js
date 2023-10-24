const express = require("express");
const router = express.Router();
const timeslotController = require("../controllers/timeslot.controller");
const { verifyToken, checkRoles } = require("../middlewares/auth.middleware");
// Define routes
// Create timeslot route
// router.post(
//   "/timeslot",
//   verifyToken,
//   checkRoles(["admin", "provider", "musician"]),
//   timeslotController.createTimeslot
// );
router.post("/timeslot", timeslotController.createTimeslot);

// View all timeslot route
// router.get(
//   "/timeslot",
//   verifyToken,
//   checkRoles(["admin", "provider", "musician"]),
//   timeslotController.getAllTimeslots
// );
router.get("/timeslot", timeslotController.getAllTimeslots);

// View timeslot by ID route
// router.get(
//   "/timeslot/:id",
//   verifyToken,
//   checkRoles(["admin", "provider", "musician"]),
//   timeslotController.getTimeslotById
// );
router.get("/timeslot/:id", timeslotController.getTimeslotById);

// Update timeslot route
// router.put(
//   "/timeslot/:id",
//   verifyToken,
//   checkRoles(["admin", "provider", "musician"]),
//   timeslotController.updateTimeslot
// ); 
router.put("/timeslot/:id", timeslotController.updateTimeslot); 

// Delete timeslot route
// router.delete(
//   "/timeslot/:id",
//   verifyToken,
//   checkRoles(["admin", "provider", "musician"]),
//   timeslotController.deleteTimeslot
// ); 
router.delete("/timeslot/:id", timeslotController.deleteTimeslot);

module.exports = router;
