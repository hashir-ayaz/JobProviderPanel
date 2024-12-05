import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Star,
  DollarSign,
  Briefcase,
  Calendar,
  Edit,
  Clock,
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { useParams } from "react-router-dom";
import { fetchFreelancerById } from "../services/freelancerService";

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
    email = "error@example.com",
    profilePicture = null,
    bio = "No bio available",
    skills = [],
    createdAt = new Date(),
    reviews = [],
    totalEarnings = 0,
    completedJobs = 0,
    location = "Not specified",
    avgRating = 0,
    hourlyRate = 0,
    availability = "Full-time",
    languages = [],
    education = [],
    certifications = [],
  } = freelancer;

  return (
    <Card className="w-full max-w-4xl p-6 mx-auto border border-gray-200 rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-100 font-custom">
      <CardHeader>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24 border-2 shadow-md border-primary">
              <AvatarImage
                src={profilePicture}
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
        </div>
      </CardHeader>
      <CardContent className="mt-4 space-y-6">
        {/* About Me Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">About Me</h3>
          <p className="text-gray-600">
            {showFullBio ? bio : truncateBio(bio, 50)}
            {bio.split(" ").length > 50 && (
              <button
                className="ml-2 transition-colors text-primary hover:text-primary/80"
                onClick={() => setShowFullBio(!showFullBio)}
              >
                {showFullBio ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
        </div>

        {/* Freelancer Details */}
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

        {/* Skills Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 rounded-lg shadow-md text-primary-foreground bg-primary"
                >
                  {skill.name}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600">No skills listed</span>
            )}
          </div>
        </div>

        {/* Earnings and Jobs Completed */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="pb-2">
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
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Jobs Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {completedJobs}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Languages Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">Languages</h3>
          <div className="space-y-2">
            {languages.length > 0 ? (
              languages.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{lang.name}</span>
                  <div className="w-1/2">
                    <Progress value={lang.proficiency} className="h-2" />
                  </div>
                </div>
              ))
            ) : (
              <span className="text-gray-600">No languages listed</span>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">Education</h3>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <Card
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <CardContent>
                  <h4 className="font-semibold text-gray-700">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <span className="text-gray-600">No education details listed</span>
          )}
        </div>

        {/* Certifications Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-3">
            {certifications.length > 0 ? (
              certifications.map((cert, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 rounded-lg text-primary border-primary"
                >
                  {cert}
                </Badge>
              ))
            ) : (
              <span className="text-gray-600">No certifications listed</span>
            )}
          </div>
        </div>

        {/* Recent Reviews Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">
            Recent Reviews
          </h3>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.slice(0, 3).map((review, index) => (
                <Card
                  key={index}
                  className="p-4 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                >
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 border border-gray-300">
                          <AvatarImage
                            src={review.reviewer.profilePicture}
                            alt={review.reviewer.name}
                          />
                          <AvatarFallback>
                            {review.reviewer.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-700">
                          {review.reviewer.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 mr-1 text-yellow-400" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {review.comment}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <span className="text-gray-600">No reviews yet</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center mt-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="px-6 py-2 text-white transition rounded-lg shadow-lg bg-primary hover:bg-primary/90">
                View All Reviews
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See all {reviews.length} reviews</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
