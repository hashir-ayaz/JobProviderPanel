import { useEffect, useState } from "react";
import { Mail, MapPin, Star, Calendar, Edit, Save, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import AuthContext from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import pfp from "../assets/logo.png";
import PreviousReviews from "../components/PreviousReviews";
import { motion } from "framer-motion";
import { updateUserProfile } from "../services/userService";

export default function UserProfile() {
  const [showFullBio, setShowFullBio] = useState(false);
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    bio: "",
    // Add other fields as necessary
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setEditData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        location: user.location || "",
        bio: user.bio || "",
        // Initialize other fields as necessary
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="mt-6 text-center text-red-500">
        Error: User data is missing or undefined.
      </div>
    );
  }

  const {
    firstName = "John",
    lastName = "Doe",
    email = "johndoe@example.com",
    role = "freelancer",
    profilePicture = pfp,
    bio = "No bio available",
    skills = [],
    createdAt = new Date(),
    reviews = [],
    totalEarnings = 0,
    totalJobs = 0,
    location = "Not specified",
    avgRating = 0,
  } = user;

  const truncateBio = (text, wordLimit) => {
    if (!text || typeof text !== "string") {
      return "No bio available"; // Fallback in case `text` is null or not a string
    }
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      //  check if user is logged in
      if (!user) {
        console.log("User not logged in");
        alert("User not logged in");
      }

      const response = await updateUserProfile(editData);
      console.log("Updated user:", response);

      // Update AuthContext and localStorage
      setUser(response.data);

      // Exit edit mode
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      location: user.location || "",
      bio: user.bio || "",
      // Reset other fields as necessary
    });
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 sm:px-8 lg:px-16"
    >
      <Card className="w-full p-6 mx-auto my-4 border border-gray-200 rounded-lg shadow-lg max-w-screen-2xl font-custom">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24 border-2 border-blue-500 shadow-md">
                <AvatarImage
                  src={profilePicture}
                  alt={`${firstName} ${lastName}`}
                />
                <AvatarFallback className="text-lg font-bold bg-gray-300">
                  {firstName[0]}
                  {lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="First Name"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Last Name"
                      required
                    />
                  </>
                ) : (
                  <>
                    <CardTitle className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
                      {firstName} {lastName}
                    </CardTitle>
                    <CardDescription className="text-lg text-blue-600">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </CardDescription>
                  </>
                )}
              </div>
            </div>
            {isEditing ? (
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : <Save className="w-5 h-5 mr-2" />}
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="mt-4 text-white transition-all shadow-lg bg-primary hover:bg-primary-dark sm:mt-0"
                onClick={handleEditToggle}
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="mt-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h3 className="text-xl font-semibold text-gray-700">About Me</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={editData.bio}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Tell us about yourself"
              />
            ) : (
              <p className="text-gray-600">
                {showFullBio ? bio : truncateBio(bio, 50)}
                {bio && bio.split(" ").length > 50 && (
                  <button
                    className="ml-2 text-blue-500 transition-colors hover:text-blue-700"
                    onClick={() => setShowFullBio(!showFullBio)}
                  >
                    {showFullBio ? "Show Less" : "Read More"}
                  </button>
                )}
              </p>
            )}
            {isEditing && error && <div className="text-red-500">{error}</div>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {isEditing ? (
              <>
                <div className="flex flex-col">
                  <label className="mb-1 text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-gray-600">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editData.location}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>{location}</span>
                </div>
              </>
            )}
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>Member since {new Date(createdAt).getFullYear()}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>
                {avgRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 text-blue-800 bg-blue-100 rounded-lg shadow-md"
                  >
                    {skill.name}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-600">No skills listed</span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <Card className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">
                  ${totalEarnings.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Jobs Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">
                  {totalJobs}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-8"
      >
        <PreviousReviews reviews={reviews} />
      </motion.div>
    </motion.div>
  );
}
