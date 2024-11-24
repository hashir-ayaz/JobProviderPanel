import { useState } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: [],
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

  const handleMilestones = (index, field, value) => {
    const updatedMilestones = [...formData.paymentMilestones];
    updatedMilestones[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      paymentMilestones: updatedMilestones,
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

  const handleAddMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      paymentMilestones: [
        ...prev.paymentMilestones,
        { milestoneTitle: "", amount: "", dueDate: "" },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Send `formData` to backend API here.
  };

  return (
    <form
      className="max-w-3xl p-6 mx-auto space-y-6 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-4 text-2xl font-bold">Post a New Job</h1>

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
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: [e.target.value] })
          }
          className="w-full border-gray-300 rounded-md"
          required
        >
          <option value="">Select a category</option>
          <option value="web-development">Web Development</option>
          <option value="graphic-design">Graphic Design</option>
          <option value="content-writing">Content Writing</option>
        </select>
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
          <select
            id="budgetType"
            name="budgetType"
            value={formData.budgetType}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md"
            required
          >
            <option value="Fixed">Fixed</option>
            <option value="Hourly">Hourly</option>
          </select>
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

      {/* Payment Milestones */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Payment Milestones
        </label>
        {formData.paymentMilestones.map((milestone, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Milestone Title"
              value={milestone.milestoneTitle}
              onChange={(e) =>
                handleMilestones(index, "milestoneTitle", e.target.value)
              }
              required
            />
            <Input
              type="number"
              placeholder="Amount"
              value={milestone.amount}
              onChange={(e) =>
                handleMilestones(index, "amount", e.target.value)
              }
              required
            />
            <Input
              type="date"
              placeholder="Due Date"
              value={milestone.dueDate}
              onChange={(e) =>
                handleMilestones(index, "dueDate", e.target.value)
              }
              required
            />
          </div>
        ))}
        <Button variant="outline" onClick={handleAddMilestone} type="button">
          Add Milestone
        </Button>
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
        <Button type="submit" className="w-full">
          Post Job
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
