import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { submitReview } from "../services/reviewService";
import { fetchFreelancerById } from "../services/freelancerService";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroPic from "../assets/hero-section.png"; // Replace with a suitable image

const ReviewFreelancerPage = () => {
  const { freelancerId } = useParams();
  const { toast } = useToast();

  const [freelancer, setFreelancer] = useState(null);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const response = await fetchFreelancerById(freelancerId);
        setFreelancer(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching freelancer:", error);
        toast({
          title: "Error",
          description: "Failed to fetch freelancer data.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchFreelancer();
  }, [freelancerId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        revieweeId: freelancerId,
        rating,
        title,
        reviewText,
      };

      await submitReview(reviewData);
      toast({
        title: "Review Submitted",
        description: "Your review has been successfully submitted!",
        status: "success",
      });

      setRating(0);
      setTitle("");
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the review.",
        status: "error",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600">Loading freelancer details...</p>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Freelancer not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen lg:flex-row font-custom">
      {/* Left Column - Freelancer Details */}
      <div className="relative flex flex-col justify-between p-8 lg:p-12 bg-gradient-to-r from-primary-light to-white lg:w-1/2">
        <div>
          <h1 className="text-3xl font-bold lg:text-4xl text-secondary">
            Review Freelancer
          </h1>
          <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl text-secondary">
            {freelancer.firstName} {freelancer.lastName}
          </h2>
          <p className="mt-4 text-base text-gray-600 lg:text-lg">
            Share your feedback to help improve their profile and services.
          </p>
          <div className="mt-6 text-lg text-gray-600">
            <p>
              <strong>Email:</strong> {freelancer.email}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {freelancer.location || "Not specified"}
            </p>
            <p>
              <strong>Average Rating:</strong> {freelancer.avgRating.toFixed(1)}
            </p>
            <p>
              <strong>Bio:</strong> {freelancer.bio || "No bio available"}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <img
            src={heroPic}
            alt="Freelancer Review Illustration"
            className="object-contain w-full max-w-xs mx-auto md:max-w-sm lg:max-w-md"
          />
        </div>
        <div className="mt-8 text-xs text-center text-gray-500 lg:text-sm lg:text-left">
          © 2024 SkillConnect. All rights reserved.
        </div>
      </div>

      {/* Right Column - Review Form */}
      <div className="flex items-center justify-center w-full p-6 bg-white lg:p-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold lg:text-3xl text-secondary">
            Submit Your Review
          </h3>
          <p className="mt-2 text-sm text-gray-600 lg:text-base">
            Your feedback helps freelancers grow and improve.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Rating */}
            <div>
              <Input
                type="number"
                placeholder="Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min="1"
                max="5"
                required
              />
            </div>

            {/* Title */}
            <div>
              <Input
                type="text"
                placeholder="Review Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Review Text */}
            <div>
              <textarea
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark"
            >
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewFreelancerPage;
