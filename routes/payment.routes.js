const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payment.controller');
const { Model } = require('sequelize');
// implement your middleware here

// CRUD
router.post('/create-payment-attempt', paymentController.createPaymentAttempt);

module.exports = router; 