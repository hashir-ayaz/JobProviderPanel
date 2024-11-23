const mongoose = require("mongoose");

/**
 * Global error handling middleware.
 */
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    const errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  // Handle Mongoose CastError
  if (err.name === "CastError") {
    return res.status(400).json({
      message: `Invalid value for ${err.path}: ${err.value}`,
    });
  }

  // Handle Duplicate Key Errors
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: `Duplicate value for field ${field}: ${err.keyValue[field]}`,
    });
  }

  // Default to 500 Internal Server Error
  res.status(500).json({ message: "Internal server error" });
};

module.exports = errorHandler;
