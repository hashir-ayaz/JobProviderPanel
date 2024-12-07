import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SubmitReviewForm = ({ onSubmit }) => {
  const { freelancerId } = useParams();
  const { toast } = useToast();
  const [review, setReview] = useState({
    rating: 0,
    title: "",
    reviewText: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setReview((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      review.rating === 0 ||
      !review.title.trim() ||
      !review.reviewText.trim()
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields and provide a rating.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onSubmit({
        reviewerId: "currentUserId", // Replace with actual current user ID
        revieweeId: freelancerId,
        ...review,
      });
      toast({
        title: "Success",
        description: "Your review has been submitted successfully.",
      });
      setReview({ rating: 0, title: "", reviewText: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Submit a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= review.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={review.title}
              onChange={handleInputChange}
              placeholder="Enter a title for your review"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="reviewText"
              className="block text-sm font-medium text-gray-700"
            >
              Review
            </label>
            <Textarea
              id="reviewText"
              name="reviewText"
              value={review.reviewText}
              onChange={handleInputChange}
              placeholder="Write your review here"
              rows={4}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubmitReviewForm;
