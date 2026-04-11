import mongoose from "mongoose";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
// 🔌 Connect to DB

// 🌱 Sample Data
const products = [
  {
    name: "iPhone 15 Pro",
    description:
      "Latest Apple iPhone with advanced camera system and A17 Pro chip",
    price: 999,
    imageUrl:
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop",
    category: "Smartphones",
    stock: 25,
  },
  {
    name: "Samsung Galaxy S24",
    description: "Flagship Android phone with 200MP camera and AI features",
    price: 949,
    imageUrl:
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop",
    category: "Smartphones",
    stock: 20,
  },
  {
    name: "MacBook Pro 16",
    description: "Powerful laptop with M3 Max chip for professionals",
    price: 2499,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "Laptops",
    stock: 15,
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Premium noise-cancelling wireless headphones",
    price: 399,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Audio",
    stock: 30,
  },
  {
    name: "iPad Pro 12.9",
    description: "Versatile tablet with M2 chip and stunning display",
    price: 1099,
    imageUrl:
      "https://images.unsplash.com/photo-1538108149393-fbcd185cb4b7?w=400&h=400&fit=crop",
    category: "Tablets",
    stock: 18,
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced fitness and health tracking smartwatch",
    price: 399,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Wearables",
    stock: 35,
  },
  {
    name: "Canon EOS R5 Camera",
    description: "Professional mirrorless camera with 45MP sensor",
    price: 3799,
    imageUrl:
      "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=400&fit=crop",
    category: "Cameras",
    stock: 10,
  },
  {
    name: "DJI Air 3S Drone",
    description: "Advanced drone with dual cameras and 46-minute flight time",
    price: 1299,
    imageUrl:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop",
    category: "Drones",
    stock: 12,
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
