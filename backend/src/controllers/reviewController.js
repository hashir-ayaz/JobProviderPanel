const Review = require("../models/Review");
const User = require("../models/User");

exports.createReview = async (req, res) => {
  try {
    console.log("Starting createReview function...");
    const reviewerId = req.user._id;
    const { revieweeId, rating, title, reviewText } = req.body;

    console.log("Request body:", req.body);

    // Validate required fields
    if (!reviewerId || !revieweeId || !rating || !title || !reviewText) {
      console.log("Validation failed: Missing required fields.");
      return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure reviewer and reviewee are not the same
    if (reviewerId === revieweeId.toString()) {
      console.log("Validation failed: Reviewer and reviewee are the same.");
      return res.status(400).json({ message: "You cannot review yourself." });
    }

    console.log("Fetching reviewee...");
    // Check if the reviewee exists
    const reviewee = await User.findById(revieweeId);
    if (!reviewee) {
      console.log("Reviewee not found.");
      return res.status(404).json({ message: "Reviewee not found." });
    }
    console.log("Reviewee found:", reviewee);

    console.log("Fetching reviewer...");
    // Check if the reviewer exists
    const reviewer = await User.findById(reviewerId);
    if (!reviewer) {
      console.log("Reviewer not found.");
      return res.status(404).json({ message: "Reviewer not found." });
    }
    console.log("Reviewer found:", reviewer);

    console.log("Checking for duplicate review...");
    // Check for duplicate review (Optional)

    console.log("Creating new review...");
    // Create the review
    const review = new Review({
      reviewerId,
      revieweeId,
      rating,
      title,
      reviewText,
    });

    console.log("Saving review to database...");
    // Save the review to the database
    const savedReview = await review.save();
    console.log("Review saved successfully:", savedReview);

    console.log("Updating reviewee's user document...");
    // Update the reviewee's user document
    reviewee.reviews.push(savedReview._id);

    // Calculate new average rating
    console.log("Calculating new average rating...");
    const totalRatings = reviewee.avgRating * reviewee.reviews.length + rating;
    const newAvgRating = totalRatings / (reviewee.reviews.length + 1);

    reviewee.avgRating = newAvgRating;
    console.log("New average rating:", newAvgRating);

    console.log("Saving updated reviewee document...");
    await reviewee.save();
    console.log("Reviewee document updated successfully.");

    console.log("Returning success response...");
    return res.status(201).json({
      message: "Review created successfully.",
      review: savedReview,
    });
  } catch (error) {
    console.error("Error in createReview function:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
