import React from "react";
import { Link } from "react-router-dom";
import { StarIcon, UserIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ReviewCard = ({ review }) => {
  const {
    reviewerId = {},
    title = "No title provided",
    reviewText = "No review text provided",
    rating = 0,
    createdAt = "No creation date provided",
  } = review;

  const {
    firstName = "Anonymous",
    lastName = "User",
    email = "N/A",
    profilePicture = "/default-avatar.png",
  } = reviewerId;

  return (
    <div className="p-4 mb-4 bg-white border rounded-lg shadow-sm">
      <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>
      <div className="flex items-center mb-4 space-x-3">
        <Avatar className="w-12 h-12 border border-gray-300">
          <AvatarImage src={profilePicture} alt={`${firstName} ${lastName}`} />
          <AvatarFallback className="text-lg font-bold bg-muted">
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-gray-800">
            {firstName} {lastName}
          </div>
          <div className="text-sm text-gray-600">{email}</div>
        </div>
      </div>
      <div className="flex items-center mb-2 space-x-2">
        <StarIcon className="w-5 h-5 text-yellow-500" />
        <span className="font-medium text-gray-800">{rating} / 5</span>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">{reviewText}</p>
      </div>
      <div className="text-sm text-gray-600">
        <CalendarIcon className="inline-block w-4 h-4 mr-1" />
        <span>
          Reviewed on {new Date(createdAt).toLocaleDateString("en-US")}
        </span>
      </div>
      <Link to={`/reviewer/${reviewerId._id}`}>
        <Badge className="px-3 py-1 mt-4 rounded-md text-primary-foreground bg-primary hover:bg-primary/80">
          View Reviewer Profile
        </Badge>
      </Link>
    </div>
  );
};

export default ReviewCard;
