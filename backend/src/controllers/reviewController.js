const Review = require("../models/Review");
const User = require("../models/User"); // Ensure the User model is available if needed

exports.createReview = async (req, res) => {
  try {
    const { reviewerId, revieweeId, rating, title, reviewText } = req.body;

    // Validate required fields
    if (!reviewerId || !revieweeId || !rating || !title || !reviewText) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure reviewer and reviewee are not the same
    if (reviewerId === revieweeId) {
      return res.status(400).json({ message: "You cannot review yourself." });
    }

    // Check if the reviewee exists
    const reviewee = await User.findById(revieweeId);
    if (!reviewee) {
      return res.status(404).json({ message: "Reviewee not found." });
    }

    // Check if the reviewer exists
    const reviewer = await User.findById(reviewerId);
    if (!reviewer) {
      return res.status(404).json({ message: "Reviewer not found." });
    }

    // Check for duplicate review (Optional)
    const existingReview = await Review.findOne({ reviewerId, revieweeId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this user." });
    }

    // Create the review
    const review = new Review({
      reviewerId,
      revieweeId,
      rating,
      title,
      reviewText,
    });

    // Save the review to the database
    const savedReview = await review.save();

    return res.status(201).json({
      message: "Review created successfully.",
      review: savedReview,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
