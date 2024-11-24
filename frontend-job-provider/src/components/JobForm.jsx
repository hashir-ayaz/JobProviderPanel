import { useState } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budgetType: "Fixed",
    budgetAmount: "",
    hourlyRate: "",
    estimatedHours: "",
    paymentMilestones: [],
    deadline: "",
    attachments: [],
    requiredSkills: [],
    experienceLevel: "Entry",
    preferredLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Send `formData` to backend API here.
  };

  return (
    <form
      className="max-w-3xl p-6 mx-auto space-y-6 font-semibold bg-white rounded shadow font-custom"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-4 text-2xl font-bold text-secondary">Post a New Job</h1>

      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a job title"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the job in detail"
          rows={5}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <Select
          onValueChange={(value) => handleSelectChange("category", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select a category"
              value={formData.category}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="graphic-design">Graphic Design</SelectItem>
              <SelectItem value="content-writing">Content Writing</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Budget Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="budgetType"
            className="block text-sm font-medium text-gray-700"
          >
            Budget Type
          </label>
          <Select
            onValueChange={(value) => handleSelectChange("budgetType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Select budget type"
                value={formData.budgetType}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Fixed">Fixed</SelectItem>
                <SelectItem value="Hourly">Hourly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="budgetAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Budget Amount
          </label>
          <Input
            type="number"
            id="budgetAmount"
            name="budgetAmount"
            value={formData.budgetAmount}
            onChange={handleChange}
            placeholder="Enter amount"
            required={formData.budgetType === "Fixed"}
          />
        </div>
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <label
          htmlFor="attachments"
          className="block text-sm font-medium text-gray-700"
        >
          Attach Files
        </label>
        <Input
          type="file"
          id="attachments"
          onChange={handleFileUpload}
          multiple
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.attachments.map((file, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 border rounded-md"
            >
              {file.fileName}
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark"
        >
          Post Job
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
