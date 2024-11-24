const handleError = (res, error) => {
  // Log the error details for debugging
  console.error("Error occurred:", error);

  // Respond with a generic error message or a specific one if available
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  } else if (error.name === "MongoError" && error.code === 11000) {
    return res
      .status(409)
      .json({ message: "Duplicate key error: Record already exists" });
  } else {
    return res
      .status(500)
      .json({ message: "An unexpected error occurred. Please try again." });
  }
};

module.exports = { handleError };
