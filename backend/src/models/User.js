const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["freelancer", "client", "admin"],
    required: true,
    default: "freelancer",
  },
  profilePicture: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  skills: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Skill",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default: [],
    },
  ],
  totalEarnings: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    default: null,
  },
  avgRating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
