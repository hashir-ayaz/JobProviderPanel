const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUserById,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// this can be viewed by guest and logged in user
router.get("/:id/profile", getUserById);

router.post("/:id/reviews", protect, createReview);

module.exports = router;
