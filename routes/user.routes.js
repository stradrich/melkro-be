const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
// implement your middleware here
const { login, verifyToken, checkRoles } = require("../middlewares/auth.middleware")


// CRUD - CREATE
// role (admin, provider, customer)
router.post(
    '/',
    verifyToken,
    // NEED TO ARGUE ABOUT THIS ‼️
    checkRoles(['admin']),
    userController.createUser 
)

// CRUD - READ
// 1. GET ALL FROM DATABASE (only admin)
router.get(
    '/', 
    verifyToken,
    checkRoles(['admin']),
    userController.getAllUsers)

// 2. GET SPECIFIC 
router.get(
    '/:userId', 
    verifyToken,
    checkRoles(['admin','provider']),
    userController.getUserById)


// CRUD - UPDATE
router.put(
    '/:userId',
    verifyToken,
    checkRoles(['admin','provider','customer']),
    userController.updateUser
)

// CRUD - DELETE
router.delete(
    '/:userId',
    verifyToken,
    checkRoles(['admin','provider','customer']),
    userController.deleteUser
)

module.exports = router 