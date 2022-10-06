const express = require("express");
const PaymentController = require("../controllers/paymentController");
const router = express.Router();

router.post("/", PaymentController.payment);
router.patch("/", PaymentController.editPaymentStatus);

module.exports = router;
