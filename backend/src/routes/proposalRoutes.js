const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createProposal,
  getProposalById,
} = require("../controllers/proposalController.js");

// Route to create a new proposal
router.post("/", protect, createProposal);

router.get("/:id", protect, getProposalById);

module.exports = router;
