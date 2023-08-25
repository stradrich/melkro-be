const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller');
const { verifyToken, checkRoles } = require("../middlewares/auth.middleware");
const { Model } = require('sequelize');
const Payment = require('../models/Payment')
// implement your middleware here

// CRUD
router.post('/payment', verifyToken, checkRoles(['admin', 'provider']), paymentController.createPayment);
// router.get('/payment', verifyToken, checkRoles(['admin', 'provider', 'customer']), paymentController.createPaymentAttempt);
// router.get('/payment:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), paymentController.createPaymentAttempt);
// router.put('/payment/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), paymentController.createPaymentAttempt);
// router.delete('/payment?:od', verifyToken, checkRoles(['admin', 'provider', 'customer']), paymentController.createPaymentAttempt);



module.exports = router; 