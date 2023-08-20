const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
// implement your middleware here
const { verifyToken, checkRole } = require("../middlewares/auth.middleware")


// CRUD - CREATE
// role (admin, provider, customer)
router.post(
    '/',
    verifyToken,
    // NEED TO ARGUE ABOUT THIS ‼️
    checkRole(['admin']),
    userController.createUser 
)

// CRUD - READ
// 1. GET ALL FROM DATABASE (only admin)
router.get(
    '/', 
    verifyToken,
    checkRole(['admin']),
    userController.getAllUsers)

// 2. GET SPECIFIC 
router.get(
    '/:userId', 
    verifyToken,
    checkRole(['admin','provider']),
    userController.getUserById)


// CRUD - UPDATE
router.put(
    '/:userId',
    verifyToken,
    checkRole(['admin','provider','customer']),
    userController.updateUser
)

// CRUD - DELETE
router.delete(
    '/:userId',
    verifyToken,
    checkRole(['admin','provider','customer']),
    userController.deleteUser
)

module.exports = router 