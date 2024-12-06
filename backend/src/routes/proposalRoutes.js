const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createProposal,
  getProposalById,
  acceptProposal,
  rejectProposal,
} = require("../controllers/proposalController.js");

// Route to create a new proposal
router.post("/", protect, createProposal);

router.get("/:id", protect, getProposalById);

router.put("/:id/accept", protect, acceptProposal);

router.put("/:id/reject", protect, rejectProposal);

module.exports = router;
