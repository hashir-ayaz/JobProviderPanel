const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUserById,
  getFreelancers,
  updateOwnProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", register);
router.post("/login", login);
router.patch("/me", protect, updateOwnProfile);
router.get("/freelancers", getFreelancers);

// this can be viewed by guest and logged in user
router.get("/profile/:id", getUserById);

// router.post("/:id/reviews", protect, createReview);

module.exports = router;
