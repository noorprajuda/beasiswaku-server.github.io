const snap = require("../helpers/midtrans");
const { Payment } = require("../models");

class PaymentController {
  static async payment(req, res, next) {
    try {
      console.log("PAYMENT SETTLEMENT");
      const { name, email, amount, message } = req.body;
      console.log(req.body);
      const newPayment = await Payment.create({
        name,
        email,
        amount,
        message,
      });
      console.log("newPayment OrderId", newPayment.OrderId);

      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id: newPayment.OrderId,
          gross_amount: newPayment.amount,
        },
      });

      let transactionToken = transaction.token;

      let transactionRedirectUrl = transaction.redirect_url;

      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editPaymentStatus(req, res, next) {
    try {
      const { OrderId } = req.body;
      console.log("req body>>>>>", req.body);
      console.log("order_id>>>", req.body.OrderId);
      const payment = await Payment.findOne({
        where: {
          OrderId: OrderId,
        },
      });

      console.log("Payment>>>", payment);

      if (!payment) {
        throw { name: "Payment not found" };
      }
      await Payment.update(
        { paymentStatus: "Success" },
        { where: { OrderId: OrderId } }
      );

      console.log("Update success");

      res.status(200).json({
        message: "Payment status has been sucessfully updated",
      });
    } catch (err) {
      next(err);
    }
  }

  static async createPayment(req, res, next) {
    try {
      const { name, email, amount, message } = req.body;
      console.log(name, email, amount, message);
      const newPayment = await Payment.create({
        name,
        email,
        amount,
        message,
      });

      res.status(200).json(newPayment);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PaymentController;
