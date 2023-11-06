const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const router = express.Router();

// Create a new payment
router.post("/", async (req, res) => {
  try {
    const { amount, description, email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: description,
      receipt_email: email,
    });

    if (paymentIntent) {
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      return res.status(500);
    }
  } catch (error) {
    console.error(error);
    // return server error
    return res.status(500);
  }
});
module.exports = router;
