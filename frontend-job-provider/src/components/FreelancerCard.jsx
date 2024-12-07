import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Briefcase, DollarSign } from "lucide-react";

const FreelancerCard = ({ freelancer = {} }) => {
  const {
    firstName = "[Firstname]",
    lastName = "[Lastname]",
    profilePicture = null,
    bio = "No bio available",
    skills = [],
    totalEarnings = 0,
    totalJobs = 0,
    location = "No location specified",
    avgRating = 0,
    reviews = [],
  } = freelancer;

  const truncateBio = (text, limit) => {
    if (!text) return "No bio available";
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <Card className="w-full max-w-sm transition-all duration-300 hover:shadow-lg max-h-96">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          {profilePicture ? (
            <AvatarImage
              src={profilePicture}
              alt={`${firstName} ${lastName}`}
            />
          ) : (
            <AvatarFallback>
              {firstName[0] || "?"}
              {lastName[0] || "?"}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle className="text-xl">
            {firstName} {lastName}
          </CardTitle>
          <CardDescription className="flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{truncateBio(bio, 100)}</p>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill.name || "Skill"}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline">+{skills.length - 3} more</Badge>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
            <span>{totalJobs} jobs</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
            <span>${totalEarnings.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium">
            {avgRating.toFixed(1)}
          </span>
          <span className="ml-1 text-xs text-gray-500">
            ({reviews.length} reviews)
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary-dark hover:bg-primary">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FreelancerCard;
