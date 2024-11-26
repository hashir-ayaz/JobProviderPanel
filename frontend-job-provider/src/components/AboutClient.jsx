import { BriefcaseIcon } from "@heroicons/react/24/outline";

const AboutClient = ({ jobProviderId }) => {
  return (
    <div className="pt-6 border-t border-gray-200 text-secondary">
      <h2 className="mb-4 text-xl font-semibold ">About the Client</h2>
      <div className="flex items-center mb-2">
        <BriefcaseIcon className="w-5 h-5 mr-2 " />
        <span className="font-bold ">
          {jobProviderId?.firstName || "N/A"} {jobProviderId?.lastName || "N/A"}
        </span>
      </div>
      <div className="mb-2 text-gray-700">
        <strong>Bio:</strong> {jobProviderId?.bio || "N/A"}
      </div>
      <div className="mb-2 text-gray-700">
        <strong>Email:</strong> {jobProviderId?.email || "N/A"}
      </div>
      <div className="mb-2 text-gray-700">
        <strong>Location:</strong> {jobProviderId?.location || "N/A"}
      </div>
      <div className="mb-2 text-gray-700">
        <strong>Total Jobs:</strong> {jobProviderId?.totalJobs || 0}
      </div>
      <div className="mb-2 text-gray-700">
        <strong>Total Spent:</strong> ${jobProviderId?.totalEarnings || 0}
      </div>

      <div className="mb-2 text-gray-700">
        <strong>Member since:</strong>{" "}
        {new Date(jobProviderId?.createdAt).toLocaleDateString("en-US") ||
          "N/A"}
      </div>
    </div>
  );
};

export default AboutClient;
