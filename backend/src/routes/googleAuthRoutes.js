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

// Callback for Google OAuth
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "/login/failed",
//     successRedirect: "http://localhost:5173/dashboard",
//   })
// );

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Redirect to frontend with token and user data
    const frontendURL = "http://localhost:5173/dashboard";
    res.redirect(
      `${frontendURL}?token=${encodeURIComponent(
        token
      )}&user=${encodeURIComponent(JSON.stringify(req.user))}`
    );
  }
);

module.exports = router;
