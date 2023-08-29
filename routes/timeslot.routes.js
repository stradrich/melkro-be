const express = require("express");
const router = express.Router();
const timeslotController = require("../controllers/timeslot.controller");
const { verifyToken, checkRoles } = require("../middlewares/auth.middleware");
// Define routes
router.post(
  "/timeslot",
  verifyToken,
  checkRoles(["admin", "provider", "customer"]),
  timeslotController.createTimeslot
);
router.get(
  "/timeslot",
  verifyToken,
  checkRoles(["admin", "provider", "customer"]),
  timeslotController.getAllTimeslots
);
router.get(
  "/timeslot/:id",
  verifyToken,
  checkRoles(["admin", "provider", "customer"]),
  timeslotController.getTimeslotById
);
router.put(
  "/timeslot/:id",
  verifyToken,
  checkRoles(["admin", "provider", "customer"]),
  timeslotController.updateTimeslot
); // Update timeslot route
router.delete(
  "/timeslot/:id",
  verifyToken,
  checkRoles(["admin", "provider", "customer"]),
  timeslotController.deleteTimeslot
); // Delete timeslot route

module.exports = router;
