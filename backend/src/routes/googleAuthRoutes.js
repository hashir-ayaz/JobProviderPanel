const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// Initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      // Extract user info and transform for JWT
      const user = req.user.toObject ? req.user.toObject() : req.user;

      // Ensure _id is converted to a string
      const payload = {
        userId: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      // Sign JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Set token as an HTTP-only cookie
      res.cookie("token", token, {
        secure: false, // Use HTTPS in production
        sameSite: "strict", // CSRF protection
        maxAge: 3600000, // 1 hour in milliseconds
        path: "/",
        httpOnly: false,
      });

      // Redirect with token
      res.redirect(`http://localhost:5173/dashboard`);
    } catch (error) {
      console.error("Error generating JWT:", error);
      res.status(500).json({ error: "Failed to generate token" });
    }
  }
);

module.exports = router;
