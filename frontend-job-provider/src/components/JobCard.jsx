import { Clock, DollarSign, MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function JobCard({ job }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-secondary ">
          {job.title}
        </CardTitle>
        <CardDescription className="mt-2">{job.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Skills:</span>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Budget:</span>
          <span>{job.budget}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Estimated Time:</span>
          <span>{job.estimatedTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{job.paymentType}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Location:</span>
          <span>{job.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <button className="w-full px-4 py-2 text-white rounded bg-primary text-primary-foreground hover:bg-primary/90">
          View Proposals
        </button>
      </CardFooter>
    </Card>
  );
}
