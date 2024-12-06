import React, { useEffect, useState } from "react";
import { Mail, MapPin, Star, DollarSign, Calendar, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAuth from "../hooks/useAuth";
import pfp from "../assets/logo.png";
import PreviousReviews from "../components/PreviousReviews";

export default function UserProfile() {
  const [showFullBio, setShowFullBio] = useState(false);

  const { user } = useAuth();

  useEffect(() => {}, [user]);

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
      return "No bio available";
    }
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div>
      <Card className="w-full max-w-4xl p-6 mx-auto border border-gray-200 rounded-lg shadow-lg font-custom bg-gradient-to-r from-white to-gray-100">
        <CardHeader>
          <div className="flex items-center justify-between">
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
                <CardTitle className="text-3xl font-extrabold text-gray-800">
                  {firstName} {lastName}
                </CardTitle>
                <CardDescription className="text-lg text-blue-600">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-white transition-all bg-blue-500 shadow-lg hover:bg-blue-600"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent className="mt-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">About Me</h3>
            <p className="text-gray-600">
              {showFullBio ? bio : truncateBio(bio, 50)}
              {bio.split(" ").length > 50 && (
                <button
                  className="ml-2 text-blue-500 transition-colors hover:text-blue-700"
                  onClick={() => setShowFullBio(!showFullBio)}
                >
                  {showFullBio ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="w-5 h-5 text-blue-500" />
              <span>{email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>{location}</span>
            </div>
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
          </div>

          <div className="space-y-2">
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
          </div>

          <div className="grid grid-cols-2 gap-6">
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
          </div>
        </CardContent>
      </Card>

      {/* Render reviews using PreviousReviews */}
      <div className="mt-8">
        <PreviousReviews reviews={reviews} />
      </div>
    </div>
  );
}
