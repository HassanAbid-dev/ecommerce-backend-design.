import mongoose from "mongoose";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
// 🔌 Connect to DB

// 🌱 Sample Data
const products = [
  {
    name: "Burger",
    description: "Delicious beef burger",
    price: 500,
    imageUrl: "https://via.placeholder.com/150",
    category: "Fast Food",
    stock: 20,
  },
  {
    name: "Pizza",
    description: "Cheesy pizza",
    price: 1200,
    imageUrl: "https://via.placeholder.com/150",
    category: "Fast Food",
    stock: 15,
  },
  {
    name: "Shawarma",
    description: "Chicken shawarma wrap",
    price: 300,
    imageUrl: "https://via.placeholder.com/150",
    category: "Fast Food",
    stock: 30,
  },
  {
    name: "Pasta",
    description: "Creamy pasta",
    price: 800,
    imageUrl: "https://via.placeholder.com/150",
    category: "Italian",
    stock: 10,
  },
];

// 🌱 Seed Function
const seedProducts = async () => {
  try {
    await connectDB();

    // ❌ Remove old data
    await Product.deleteMany();
    console.log("Old products deleted");

    // ✅ Insert new data
    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

// 🚀 Run Seeder
seedProducts();
