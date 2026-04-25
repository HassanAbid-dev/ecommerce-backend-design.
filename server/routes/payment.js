import express from "express";
import {
  createPaymentIntent,
  stripeWebhook,
  getMyOrders,
} from "../controllers/paymentController.js";
import { authenticatedUser } from "../middlewares/authmiddleware.js";

const router = express.Router();

// ⚠️ Webhook needs raw body — has its own express.raw() middleware
// This must be defined BEFORE express.json() parses the body
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

// Protected routes — uses your existing authenticatedUser middleware
// which reads the JWT from cookies (same as your other routes)
router.post("/create-payment-intent", authenticatedUser, createPaymentIntent);
router.get("/my-orders", authenticatedUser, getMyOrders);

export default router;
