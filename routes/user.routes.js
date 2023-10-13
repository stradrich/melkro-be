const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
// implement your middleware here
const { verifyToken, checkRoles } = require("../middlewares/auth.middleware")


// CRUD - CREATE
// role (admin, provider, customer)
router.post(
    '/',
    verifyToken,
    checkRoles(['admin']),
    userController.createUser,
    // authController.register
)

// CRUD - READ
// 1. GET ALL FROM DATABASE (only admin)
router.get(
    '/users', 
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
    checkRoles(['admin','provider','musician']),
    userController.updateUser
)

// CRUD - DELETE
router.delete(
    '/:userId',
    verifyToken,
    checkRoles(['admin','provider','musician']),
    userController.deleteUser
)

module.exports = router 