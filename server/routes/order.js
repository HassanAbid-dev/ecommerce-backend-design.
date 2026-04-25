import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authenticatedUser, adminOnly } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/", authenticatedUser, adminOnly, getAllOrders);
router.patch("/:id", authenticatedUser, adminOnly, updateOrderStatus);

export default router;
