const User = require("../models/User");
const { handleError } = require("../utils/handleError");
const authUtils = require("../utils/authUtils");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt started");
  console.log("Received email:", email);

  try {
    // Find the user by email
    console.log("Searching for user in the database...");
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("User found:", user);

    // Check if the provided password matches
    console.log("Verifying password...");
    const isPasswordCorrect = await auth.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      console.log("Password verification failed");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("Password verification successful");

    // Generate a token for the authenticated user
    console.log("Generating authentication token...");
    const token = authUtils.generateToken({ userId: user._id });
    console.log("Token generated:", token);

    // Respond with user and token
    console.log("Login successful, sending response...");
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error during login:", error.message);
    handleError(res, error);
  }
};

exports.register = async (req, res) => {
  const {
    email,
    password,
    username,
    profilePhoto,
    moviePreferences,
    personalWishlist,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      email,
      password: await authUtils.hashPassword(password),
      username,
      profilePhoto,
      moviePreferences,
      personalWishlist,
    });

    await newUser.save();
    const token = auth.generateToken({ userId: newUser._id });
    return res.status(200).json({ user: newUser, token });
  } catch (error) {
    console.error("Error during registration:", error.message);
    handleError(res, error);
  }
};

// if the user is geting their own profile
// return the whole user object
// if the user(client)/guest is getting another user's profile
// return only the public info of the user

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  const requestingUserId = req.user ? req.user.id : null; // Assuming req.user is populated by authentication middleware

  try {
    // Fetch the user by ID
    const user = await User.findById(userId)
      .populate("skills", "name") // Assuming the Skill model has a "name" field
      .populate("reviews"); // Populate reviews if necessary

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // If the requesting user is the same as the user being fetched, return the full user object
    if (requestingUserId && requestingUserId === userId) {
      return res.status(200).json({
        success: true,
        data: user,
      });
    }

    // Otherwise, return only public information
    const publicInfo = {
      name: user.name,
      profilePicture: user.profilePicture,
      bio: user.bio,
      skills: user.skills,
      reviews: user.reviews,
      location: user.location,
      avgRating: user.avgRating,
      role: user.role, // Role is public (freelancer, client)
    };

    return res.status(200).json({
      success: true,
      data: publicInfo,
    });
  } catch (error) {
    // Log the error
    console.error(`Error fetching user with ID ${userId}:`, error);

    // Return a 500 Internal Server Error
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user profile.",
      error: error.message,
    });
  }
};

exports.createReview = async (req, res) => {
  if (req.user.role === "guest") {
    return res.status(401).json({
      message: "You are a guest, you need to be logged in to leave a rev",
    });
  }
  const { id } = req.params;
  const { reviewText, rating, title } = req.body;
  const { reviewerId } = req.user.id;

  const revieweeId = id;

  try {
    // check if reviewee exists
    const reviewee = await User.findById(revieweeId);
    if (!reviewee) {
      return res.status(404).json({ message: "Reviewee not found" });
    }

    const review = new Review({
      reviewerId,
      revieweeId,
      reviewText,
      title,
      rating,
    });
  } catch (error) {
    next(error);
  }
};
