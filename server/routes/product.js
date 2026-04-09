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
router.get("/getAllProducts", authenticatedUser, getAllProducts);
router.get("/getById/:id", authenticatedUser, getProductById);
router.get("/search", authenticatedUser, searchProducts);
router.put("/update/:id", authenticatedUser, adminOnly, updateProduct);

router.delete("/delete/:id", authenticatedUser, adminOnly, deleteProduct);

export default router;
