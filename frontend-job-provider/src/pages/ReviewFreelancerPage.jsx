import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { submitReview } from "../services/reviewService";
import { fetchFreelancerById } from "../services/freelancerService";
import { useToast } from "@/hooks/use-toast";

const ReviewFreelancerPage = () => {
  const { freelancerId } = useParams(); // Get freelancer ID from route params
  const { toast } = useToast();

  const [freelancer, setFreelancer] = useState(null); // Store freelancer data
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state for freelancer data

  useEffect(() => {
    // Fetch freelancer data
    const fetchFreelancer = async () => {
      try {
        const response = await fetchFreelancerById(freelancerId);
        setFreelancer(response.data); // Assume API response has `freelancer` key
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

      // Optionally reset the form
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
      <div className="container max-w-md px-4 py-8 mx-auto text-center">
        <p className="text-lg text-red-500">Freelancer not found.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-md px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Review Freelancer: {freelancer.firstName} {freelancer.lastName}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label
            htmlFor="rating"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
            required
          />
        </div>

        {/* Review Text */}
        <div>
          <label
            htmlFor="reviewText"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Review
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewFreelancerPage;
