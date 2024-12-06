const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const generateToken = (payload) => {
  console.log("Generating token with payload:", payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}`,
  });
  console.log("Generated token:", token);
  return token;
};

const hashPassword = async (password) => {
  console.log("Hashing password...");
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log("Password hashed successfully");
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  console.log("Comparing passwords...");
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Password comparison result:", isMatch);
  return isMatch;
};

// Extract token from headers or cookies
const extractToken = (req) => {
  console.log("Extracting token from request...");
  console.log("Request headers:", req.headers);
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // Remove 'Bearer' prefix
    console.log("Token extracted from headers:", token);
  } else if (req.cookies?.token) {
    token = req.cookies.token; // Check cookies if no token in headers
    console.log("Token extracted from cookies:", token);
  } else {
    console.warn("No token found in request");
  }
  return token;
};

// Verify the token and get the user
const verifyTokenAndGetUser = async (token) => {
  try {
    console.log("Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
    console.log("Token decoded successfully:", decoded);

    console.log("Fetching user with ID:", decoded.userId || decoded.id);
    const user = await User.findById(decoded.userId || decoded.id); // Find user by ID in the token

    if (!user) {
      console.warn("No user found for the provided token");
    } else {
      console.log("User found:", user);
    }
    return user;
  } catch (error) {
    id;
    console.error("Error verifying token:", error.message);
    throw error;
  }
};

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
  extractToken,
  verifyTokenAndGetUser,
};
