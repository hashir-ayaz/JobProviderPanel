const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

module.exports = router;
