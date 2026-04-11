import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  searchProducts,
} from "../controllers/productController.js";
import { adminOnly, authenticatedUser } from "../middlewares/authmiddleware.js";

import express from "express";
const router = express.Router();

router.post("/create-product", authenticatedUser, adminOnly, createProduct);
router.get("/getAllProducts", getAllProducts); // ✅ public - anyone can view
router.get("/getById/:id", getProductById); // ✅ public - anyone can view
router.get("/search", searchProducts); // ✅ public - anyone can search
router.put("/update/:id", authenticatedUser, adminOnly, updateProduct); // 🔒 admin only

router.delete("/delete/:id", authenticatedUser, adminOnly, deleteProduct); // 🔒 admin only

export default router;
