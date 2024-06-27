// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const Product = require("./models/products.model");

dotenv.config(); // Load environment variables

// Sample data
const products = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 150,
    categories: ["Electronics", "Accessories", "Audio"]
  },
  {
    name: "Smartphone",
    price: 599.99,
    quantity: 75,
    categories: ["Electronics", "Mobile", "Gadgets"]
  },
  {
    name: "Laptop",
    price: 1299.99,
    quantity: 50,
    categories: ["Electronics", "Computers", "Portable"]
  },
  {
    name: "Smartwatch",
    price: 199.99,
    quantity: 200,
    categories: ["Electronics", "Wearables", "Fitness"]
  },
  {
    name: "Bluetooth Speaker",
    price: 49.99,
    quantity: 300,
    categories: ["Electronics", "Audio", "Portable"]
  },
  {
    name: "Tablet",
    price: 299.99,
    quantity: 100,
    categories: ["Electronics", "Mobile", "Computers"]
  },
  {
    name: "Gaming Console",
    price: 399.99,
    quantity: 60,
    categories: ["Electronics", "Gaming", "Entertainment"]
  },
  {
    name: "Digital Camera",
    price: 499.99,
    quantity: 80,
    categories: ["Electronics", "Photography", "Gadgets"]
  },
  {
    name: "E-reader",
    price: 129.99,
    quantity: 120,
    categories: ["Electronics", "Books", "Gadgets"]
  },
  {
    name: "External Hard Drive",
    price: 79.99,
    quantity: 250,
    categories: ["Electronics", "Storage", "Computers"]
  },
  {
    name: "Wireless Mouse",
    price: 29.99,
    quantity: 400,
    categories: ["Accessories", "Computers", "Gadgets"]
  },
  {
    name: "Mechanical Keyboard",
    price: 89.99,
    quantity: 150,
    categories: ["Accessories", "Computers", "Gaming"]
  },
  {
    name: "Fitness Tracker",
    price: 149.99,
    quantity: 180,
    categories: ["Wearables", "Fitness", "Health"]
  },
  {
    name: "4K TV",
    price: 799.99,
    quantity: 40,
    categories: ["Electronics", "Home Entertainment", "Visual"]
  },
  {
    name: "VR Headset",
    price: 349.99,
    quantity: 55,
    categories: ["Electronics", "Gaming", "Virtual Reality"]
  },
  {
    name: "Portable Charger",
    price: 24.99,
    quantity: 500,
    categories: ["Accessories", "Mobile", "Gadgets"]
  },
  {
    name: "Smart Home Hub",
    price: 99.99,
    quantity: 140,
    categories: ["Smart Home", "Gadgets", "Home Automation"]
  },
  {
    name: "Electric Toothbrush",
    price: 69.99,
    quantity: 200,
    categories: ["Health", "Personal Care", "Gadgets"]
  },
  {
    name: "Air Purifier",
    price: 149.99,
    quantity: 90,
    categories: ["Home Appliances", "Health", "Air Quality"]
  },
  {
    name: "Coffee Maker",
    price: 79.99,
    quantity: 110,
    categories: ["Home Appliances", "Kitchen", "Gadgets"]
  },
  {
    name: "Instant Pot",
    price: 99.99,
    quantity: 130,
    categories: ["Home Appliances", "Kitchen", "Gadgets"]
  },
  {
    name: "Robot Vacuum",
    price: 299.99,
    quantity: 70,
    categories: ["Home Appliances", "Smart Home", "Cleaning"]
  },
  {
    name: "Smart Thermostat",
    price: 199.99,
    quantity: 85,
    categories: ["Smart Home", "Home Automation", "Energy Saving"]
  },
  {
    name: "Noise Cancelling Headphones",
    price: 249.99,
    quantity: 65,
    categories: ["Electronics", "Audio", "Accessories"]
  },
  {
    name: "Dash Cam",
    price: 59.99,
    quantity: 150,
    categories: ["Automotive", "Cameras", "Safety"]
  },
  {
    name: "Action Camera",
    price: 199.99,
    quantity: 90,
    categories: ["Electronics", "Photography", "Outdoor"]
  },
  {
    name: "Wireless Charger",
    price: 39.99,
    quantity: 220,
    categories: ["Accessories", "Mobile", "Charging"]
  },
  {
    name: "Smart Light Bulbs",
    price: 49.99,
    quantity: 300,
    categories: ["Smart Home", "Lighting", "Home Automation"]
  },
  {
    name: "Streaming Device",
    price: 49.99,
    quantity: 180,
    categories: ["Electronics", "Entertainment", "Gadgets"]
  },
  {
    name: "Home Security Camera",
    price: 129.99,
    quantity: 100,
    categories: ["Smart Home", "Security", "Cameras"]
  },
];

// Insert sample data into the database
async function seedDB() {
  await connectDB(); // Connect to the database
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();