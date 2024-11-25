import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Briefcase,
  User,
  Star,
  FileText,
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
import { format } from "date-fns";

export default function DetailedJobPage({ job }) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
          <Badge
            variant={job.status === "Open" ? "success" : "secondary"}
            className="ml-2"
          >
            {job.status}
          </Badge>
        </div>
        <CardDescription className="text-base">
          {job.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Budget and Time Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Budget:</span>
            <span className="font-medium">
              {job.budgetAmount} ({job.budgetType})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Duration:</span>
            <span className="font-medium">{job.estimatedTime}</span>
          </div>
        </div>

        {/* Experience and Location */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Experience:</span>
            <span className="font-medium">{job.experienceLevel}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Location:</span>
            <span className="font-medium">{job.preferredLocation}</span>
          </div>
        </div>

        {/* Required Skills */}
        {job.requiredSkills && job.requiredSkills.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Required Skills:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Proposals Count */}
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Proposals:</span>
          <span className="font-medium">{job.proposalsCount}</span>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Posted: {format(new Date(job.createdAt), "PPP")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Deadline: {format(new Date(job.deadline), "PPP")}</span>
          </div>
        </div>

        {/* Attachments */}
        {job.attachments && job.attachments.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Attachments:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.attachments.map((attachment, index) => (
                <Badge key={index} variant="outline">
                  {attachment}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Job ID: {job._id.slice(0, 8)}...
        </div>
        <button className="px-6 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90">
          Submit Proposal
        </button>
      </CardFooter>
    </Card>
  );
}
