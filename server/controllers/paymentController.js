import Stripe from "stripe";
import Order from "../models/Order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { items } = req.body;
    // items = [{ productId, name, price, quantity }, ...]
    // same shape as your CartContext cart array
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    // Create Stripe PaymentIntent (amount in cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "usd",
      metadata: { userId: req.user._id.toString() },
    });
    // Save a pending order in MongoDB
    await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      stripePaymentIntentId: paymentIntent.id,
      status: "pending",
    });
    // Send clientSecret to frontend so Stripe.js can charge the card
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
};
// Stripe calls this automatically after successful payment
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // must be raw buffer (not parsed JSON)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    await Order.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: "paid" },
    );
  }

  res.json({ received: true });
};
// Frontend can call this to show user their past orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
