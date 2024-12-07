import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";

const FilterSheet = ({ isOpen, setIsOpen, filters, handleFilterChange }) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="font-custom" side="right">
        <SheetHeader>
          <SheetTitle>Filter Freelancers</SheetTitle>
          <SheetDescription>
            Apply filters to find the perfect freelancer for your project.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {/* Skills Filter */}
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="skills" className="text-right">
              Skills
            </Label>
            <Input
              id="skills"
              value={filters.skills}
              onChange={(e) => handleFilterChange("skills", e.target.value)}
              className="col-span-3"
              placeholder="e.g., React, Node.js"
            />
          </div>
          {/* Min Rating Filter */}
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="minRating" className="text-right">
              Min Rating
            </Label>
            <Slider
              id="minRating"
              min={0}
              max={5}
              step={0.1}
              value={[filters.minRating]}
              onValueChange={(value) =>
                handleFilterChange("minRating", value[0])
              }
              className="col-span-3"
            />
          </div>
          {/* Max Budget Filter */}
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="maxBudget" className="text-right">
              Max Budget
            </Label>
            <Slider
              id="maxBudget"
              min={0}
              max={10000}
              step={100}
              value={[filters.maxBudget]}
              onValueChange={(value) =>
                handleFilterChange("maxBudget", value[0])
              }
              className="col-span-3"
            />
          </div>
        </div>
        <Button className="w-full bg-primary" onClick={() => setIsOpen(false)}>
          Apply Filters
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
