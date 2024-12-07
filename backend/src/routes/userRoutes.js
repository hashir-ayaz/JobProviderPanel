const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUserById,
  updateOwnProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", register);
router.post("/login", login);
router.patch("/me", protect, updateOwnProfile);

// this can be viewed by guest and logged in user
router.get("/profile/:id", getUserById);

// router.post("/:id/reviews", protect, createReview);

module.exports = router;
