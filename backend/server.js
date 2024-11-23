const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");

const app = express();
dotenv.config();

connectDB(); // Connect to database

app.use(express.json()); // Body parser

// Routes
app.use("/api/v1/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
