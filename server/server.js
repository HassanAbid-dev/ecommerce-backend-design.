import "./config/env.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import paymentRoutes from "./routes/payment.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// ✅ express.json() BEFORE payment routes so req.body is parsed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⚠️ webhook route inside payment has its OWN express.raw() so it's fine
app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
