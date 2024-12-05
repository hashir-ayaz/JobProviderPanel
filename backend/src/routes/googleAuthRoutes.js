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

// Callback for Google OAuth
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const user = req.user.toObject ? req.user.toObject() : req.user;

      const payload = {
        userId: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
        path: "/",
        httpOnly: true,
      });

      // Return user and token as JSON
      res.status(200).json({
        message: "Google login successful",
        token,
        user: payload,
      });
    } catch (error) {
      console.error("Error generating JWT:", error);
      res.status(500).json({ error: "Failed to generate token" });
    }
  }
);

module.exports = router;
