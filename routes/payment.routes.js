const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller');
const { verifyToken, checkRoles } = require("../middlewares/auth.middleware");
const { Model } = require('sequelize');
const Payment = require('../models/Payment')
// implement your middleware here

// CRUD
router.post('/payment', verifyToken, checkRoles(['admin', 'provider']), paymentController.createPayment);
router.get('/payment/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), paymentController.getPaymentById);
router.get('/payment/', verifyToken, checkRoles(['admin', 'provider', 'customer']), paymentController.getAllPayments);
router.put('/payment/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), paymentController.updatePayment);
router.delete('/payment/:id', verifyToken, checkRoles(['admin', 'provider', 'customer']), paymentController.deletePayment);



module.exports = router; 