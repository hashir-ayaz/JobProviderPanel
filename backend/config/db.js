const mongoose = require("mongoose");
require("dotenv").config();

// const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.nw4lxia.mongodb.net/${process.env.MONGO_DATABASE}`;

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // console.log(`Connecting to Mongodb at ${MONGO_URI} 🚀`);
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Mongodb 😎");
  } catch (error) {
    console.error(`Error ⛔: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
