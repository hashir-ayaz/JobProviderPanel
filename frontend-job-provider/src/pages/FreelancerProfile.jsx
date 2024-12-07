import { useEffect, useState } from "react";
import { Mail, MapPin, Star, DollarSign, Calendar, Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { fetchFreelancerById } from "../services/freelancerService";
import PreviousReviews from "../components/PreviousReviews";

export default function FreelancerProfilePage() {
  const { freelancerId } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchFreelancerById(freelancerId);
        console.log("Fetched freelancer by ID:", response);
        setFreelancer(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch freelancer data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancer();
  }, [freelancerId]);

  const truncateBio = (text, wordLimit) => {
    if (!text || typeof text !== "string") {
      return "No bio available";
    }
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="mt-6 text-center text-red-500">{error}</div>;
  }

  if (!freelancer) {
    return (
      <div className="mt-6 text-center text-red-500">
        Error: Freelancer data is missing or undefined.
      </div>
    );
  }

  const {
    firstName = "Placeholder",
    lastName = "Placeholder",
    email = "No email provided",
    profilePicture = null,
    bio = "",
    skills = [],
    createdAt = new Date(),
    reviews = [],
    totalEarnings = 0,
    completedJobs = 0,
    location = "Not specified",
    avgRating = 0,
    hourlyRate = 0,
    availability = "Full-time",
  } = freelancer || {};

  return (
    <>
      <Card className="w-4/5 p-6 mx-auto mt-6 border border-gray-200 rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-100 font-custom md:max-w-none">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24 border-2 shadow-md border-primary">
              <AvatarImage
                src={profilePicture || "/default-avatar.png"}
                alt={`${firstName} ${lastName}`}
              />
              <AvatarFallback className="text-lg font-bold bg-muted">
                {firstName[0]}
                {lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-extrabold text-gray-800">
                {firstName} {lastName}
              </CardTitle>
              <CardDescription className="text-lg text-primary">
                Freelance Professional
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">About Me</h3>
            <p className="text-gray-600">
              {showFullBio ? bio || "No bio available" : truncateBio(bio, 50)}
              {(bio || "").split(" ").length > 50 && (
                <button
                  className="ml-2 transition-colors text-primary hover:text-primary/80"
                  onClick={() => setShowFullBio(!showFullBio)}
                >
                  {showFullBio ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="w-5 h-5 text-primary" />
              <span>{email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Member since {new Date(createdAt).getFullYear()}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>
                {avgRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <DollarSign className="w-5 h-5 text-primary" />
              <span>${hourlyRate}/hour</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="w-5 h-5 text-primary" />
              <span>{availability}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <PreviousReviews reviews={reviews} />
    </>
  );
}
