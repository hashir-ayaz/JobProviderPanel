import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea"; // Assuming you have a Textarea component
import JobForm from "../components/JobForm";
// import { AttachmentIcon } from "lucide-react"; // Icon for attachment

const PostJobPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 space-y-8 lg:flex-row lg:space-y-0 lg:space-x-10 lg:px-20">
      {/* Left Section */}
      <div className="flex flex-col items-start max-w-md space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Time to Post your Job/Project
        </h1>
        <p className="text-gray-600">
          This is where you fill us in on the big picture.
        </p>
        <a
          href="/help"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          How can I optimize my job?
        </a>
        <img
          src="/assets/illustration.png" // Replace with your illustration path
          alt="Illustration"
          className="w-48 mt-6 lg:w-60"
        />
      </div>

      {/* Right Section */}
      <div className="w-full max-w-lg p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-blue-600">
            Are you a freelancer?
          </p>
          <a
            href="/become-seller"
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            Become a seller
          </a>
        </div>
        <JobForm />
      </div>
    </div>
  );
};

export default PostJobPage;
