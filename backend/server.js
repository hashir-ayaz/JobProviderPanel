const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
require("./src/middleware/googleAuth");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");
const userRoutes = require("./src/routes/userRoutes");
const CORS = require("cors");
const app = express();
const jobRoutes = require("./src/routes/jobRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const proposalRoutes = require("./src/routes/proposalRoutes");
const googleAuthRoutes = require("./src/routes/googleAuthRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const cookieSession = require("cookie-session");

dotenv.config();

connectDB(); // Connect to database

app.use(express.json()); // Body parser
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  CORS({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth/", googleAuthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/proposals", proposalRoutes);
app.use("/api/v1/review", reviewRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
