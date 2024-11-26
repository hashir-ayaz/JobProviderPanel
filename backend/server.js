const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
const userRoutes = require("./src/routes/userRoutes");
const CORS = require("cors");
const app = express();
const jobRoutes = require("./src/routes/jobRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const proposalRoutes = require("./src/routes/proposalRoutes");
dotenv.config();

connectDB(); // Connect to database

app.use(
  CORS({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); // Body parser

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/proposals", proposalRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
