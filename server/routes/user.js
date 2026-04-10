import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/userController.js";
import { authenticatedUser } from "../middlewares/authmiddleware.js";
import express from "express";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticatedUser, getUserProfile);
router.post("/logout", logoutUser);
export default router;
