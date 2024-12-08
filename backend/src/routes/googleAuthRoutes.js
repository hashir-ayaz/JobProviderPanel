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

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Google login failed",
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "User has successfully authenticated",
      user: req.user,
      // TODO send jwt token
    });
  } else {
    res.status(401).json({
      success: false,
      message: "User authentication failed",
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({
    success: true,
    message: "User has been logged out",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // put jwt in cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Redirect to frontend with token and user data
    const frontendURL =
      `${process.env.CLIENT_URL}/dashboard` ||
      "http://localhost:5173/dashboard";
    res.redirect(
      `${frontendURL}?token=${encodeURIComponent(
        token
      )}&user=${encodeURIComponent(JSON.stringify(req.user))}`
    );
  }
);

module.exports = router;
