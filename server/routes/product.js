import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import {
  adminOnly,
  authennticatedUser,
} from "../middlewares/authmiddleware.js";

import express from "express";
const router = express.Router();

router.post("/create-product", authennticatedUser, adminOnly, createProduct);
router.get("/getAllProducts", authennticatedUser, getAllProducts);
router.get("/getById/:id", authennticatedUser, getProductById);
router.put("/update/:id", authennticatedUser, adminOnly, updateProduct);
router.delete("/delete/:id", authennticatedUser, adminOnly, deleteProduct);

export default router;
