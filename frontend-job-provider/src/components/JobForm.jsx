import { useState } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import countries from "../data/countries.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postJob } from "../services/jobService";

const estimatedTimeOptions = [
  "Less than a week",
  "Less than a month",
  "1 to 3 months",
  "1 to 6 months",
];

const JobForm = ({ skills = [] }) => {
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      budgetType: "Fixed",
      budgetAmount: "",
      hourlyRate: "",
      estimatedTime: "",
      paymentMilestones: [],
      deadline: "",
      attachments: [],
      requiredSkills: [],
      experienceLevel: "Entry",
      preferredLocation: "",
    });
  };

  console.log("skills in job form", skills);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budgetType: "Fixed",
    budgetAmount: "",
    hourlyRate: "",
    estimatedTime: "",
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
    console.log("formData is now", formData);
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      console.log("Updated formData:", updatedFormData);
      return updatedFormData;
    });
  };

  const handleSkillChange = (value) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.requiredSkills];
      if (!updatedSkills.includes(value)) {
        updatedSkills.push(value);
        // Log inside the setState callback to see the new state
        console.log("Skill added:", value);
        console.log("Updated skills:", updatedSkills);
      }
      return {
        ...prev,
        requiredSkills: updatedSkills,
      };
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Send `formData` to backend API here.
    try {
      const response = await postJob(formData);
      console.log("Response from API:", response);
      resetForm();
    } catch (error) {
      console.error("Failed to post job:", error.message);
    }
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
          Job Title *
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
          Job Description *
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

      {/* Skill */}
      <div className="space-y-2">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Required Skills *
        </label>
        <Select
          value={formData.skill}
          onValueChange={(value) => handleSkillChange(value)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a skill/category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {Array.isArray(skills) && skills.length > 0 ? (
                skills.map((skill) => (
                  <SelectItem
                    key={skill._id}
                    value={skill._id}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {skill.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No skills available</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Budget Details */}
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
            required
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
            required
          />
        </div>
      </div>

      {/* Deadline */}
      <div className="space-y-2">
        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-gray-700"
        >
          Deadline
        </label>
        <Input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <label
          htmlFor="experienceLevel"
          className="block text-sm font-medium text-gray-700"
        >
          Experience Level
        </label>
        <Select
          onValueChange={(value) =>
            handleSelectChange("experienceLevel", value)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select experience level"
              value={formData.experienceLevel}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Entry">Entry</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Preferred Location */}

      <div className="grid grid-cols-2 gap-4">
        {/* Preferred Location */}
        <div>
          <label
            htmlFor="preferredLocation"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Location
          </label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("preferredLocation", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a preferred location">
                {formData.preferredLocation || "Select a preferred location"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {countries.map((country) => (
                  <SelectItem
                    key={country.code}
                    id={`location-${country.code.toLowerCase()}`}
                    value={country.name}
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Estimated Time */}
        <div>
          <label
            htmlFor="estimatedTime"
            className="block text-sm font-medium text-gray-700"
          >
            Estimated Time
          </label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("estimatedTime", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {formData.estimatedTime ||
                  "Select estimated time for project completion"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem id="time-1-week" value="1 week">
                  1 week
                </SelectItem>
                <SelectItem id="time-2-weeks" value="2 weeks">
                  2 weeks
                </SelectItem>
                <SelectItem id="time-3-weeks" value="3 weeks">
                  3 weeks
                </SelectItem>
                <SelectItem id="time-1-month" value="1 month">
                  1 month
                </SelectItem>
                <SelectItem id="time-1-3-months" value="1-3 months">
                  1-3 months
                </SelectItem>
                <SelectItem id="time-3-6-months" value="3-6 months">
                  3-6 months
                </SelectItem>
                <SelectItem id="time-6-12-months" value="6-12 months">
                  6-12 months
                </SelectItem>
                <SelectItem id="time-1-year" value="1 year">
                  1 year
                </SelectItem>
                <SelectItem id="time-more-than-1-year" value="More than 1 year">
                  More than 1 year
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
