import { useState } from "react";
import {
  Clock,
  DollarSign,
  MapPin,
  Briefcase,
  MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function JobCard({ job, onDelete, onMarkCompleted }) {
  if (!job) {
    return (
      <div className="text-red-500">
        Error: Job data is missing or undefined.
      </div>
    );
  }

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fallback values for missing fields
  const {
    title = "No title provided",
    description = "No description available",
    budgetType = "Budget type not specified",
    budgetAmount = "Budget not specified",
    hourlyRate = "Not applicable",
    estimatedTime = "Not specified",
    preferredLocation = "Location not provided",
    experienceLevel = "Experience level not specified",
    requiredSkills = [],
    status = "Status not specified",
    deadline = "No deadline provided",
  } = job;

  // Helper to truncate description
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <Card className="w-full max-w-md transition-transform transform hover:scale-103 hover:shadow-lg">
      <CardHeader className="relative">
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDelete(job._id)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMarkCompleted(job._id)}>
                Mark as Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-xl font-bold text-secondary">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="mt-2">
            {showFullDescription ? description : truncateText(description, 35)}
            {description.split(" ").length > 35 && (
              <button
                className="ml-2 text-blue-600 hover:underline"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Skills Section */}
        <div className="flex items-center space-x-2">
          <Briefcase className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Skills:</span>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(requiredSkills) && requiredSkills.length > 0 ? (
              requiredSkills.map((skill) => (
                <Badge key={skill._id} variant="secondary">
                  {skill.name}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                No skills provided
              </span>
            )}
          </div>
        </div>

        {/* Budget Section */}
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Budget:</span>
          <span>
            {budgetType === "Fixed"
              ? `$${budgetAmount}`
              : `$${budgetAmount}/hr`}
          </span>
        </div>

        {/* Estimated Time Section */}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Estimated Time:</span>
          <span>{estimatedTime}</span>
        </div>

        {/* Experience Level Section */}
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{experienceLevel}</Badge>
        </div>

        {/* Status Section */}
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{status}</Badge>
        </div>

        {/* Location Section */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Location:</span>
          <span>{preferredLocation}</span>
        </div>

        {/* Deadline Section */}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Deadline:</span>
          <span>{new Date(deadline).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/job/${job._id}`} className="w-full">
          <Button className="w-full px-4 py-2 text-white rounded bg-primary hover:bg-primary/90">
            View Proposals
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
