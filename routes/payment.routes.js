const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller');
const { verifyToken, checkRoles } = require("../middlewares/auth.middleware");
const { Model } = require('sequelize');
const Payment = require('../models/Payment')
// implement your middleware here

// CRUD
// router.post('/payment', verifyToken, checkRoles(['admin', 'provider']), paymentController.createPayment);
router.post('/payment', paymentController.createPayment);
// router.get('/payment/:id', verifyToken, checkRoles(['admin', 'provider', 'musician']), paymentController.getPaymentById);
router.get('/payment/:id', paymentController.getPaymentById);
// router.get('/payment/', verifyToken, checkRoles(['admin', 'provider', 'musician']), paymentController.getAllPayments);
router.get('/payment/', paymentController.getAllPayments);
// router.put('/payment/:id', verifyToken, checkRoles(['admin', 'provider', 'musician']), paymentController.updatePayment);
router.put('/payment/:id', paymentController.updatePayment);
// router.delete('/payment/:id', verifyToken, checkRoles(['admin', 'provider', 'musician']), paymentController.deletePayment);
router.delete('/payment/:id', paymentController.deletePayment);



module.exports = router; 