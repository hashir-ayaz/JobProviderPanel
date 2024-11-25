import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PostJobCard() {
  return (
    <Card className="w-[300px] border border-dashed rounded-lg py-5">
      <CardContent className="flex flex-col items-center pt-6 space-y-4 text-center">
        <div className="p-2 border border-dashed rounded-full">
          <Plus className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Post a new job</h3>
          <p className="text-sm text-muted-foreground">
            Create a new job post and get proposals from talent.
          </p>
        </div>
        <Button
          variant="outline"
          className="text-primary border-primary hover:bg-green-50 hover:text-primary-dark"
        >
          Post a new job
        </Button>
      </CardContent>
    </Card>
  );
}
