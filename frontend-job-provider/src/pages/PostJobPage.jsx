import { useEffect, useState } from "react";
import postJobAuntyImage from "../assets/post-job-aunty.png";
import JobForm from "../components/JobForm";
import { fetchSkills } from "../services/jobService";

const PostJobPage = () => {
  const [skills, setSkills] = useState([]);
  console.log("fetching skills from backend");

  useEffect(() => {
    const getSkills = async () => {
      try {
        console.log("Fetching skills from backend...");
        const fetchedSkills = await fetchSkills(); // Wait for the response
        setSkills(fetchedSkills); // Set the skills in the state
        console.log("Skills fetched:", fetchedSkills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    getSkills();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-8 lg:flex-row lg:space-y-0 lg:space-x-10 lg:px-20">
      {/* Left Section */}
      <div className="flex flex-col items-start w-full space-y-4 lg:w-1/3">
        <h1 className="text-4xl font-extrabold text-secondary lg:text-6xl">
          Time to Post your Job/Project
        </h1>
        <p className="text-xl text-gray-600 lg:text-3xl">
          This is where you fill us in on the big picture.
        </p>
        <a
          href="/help"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          How can I optimize my job?
        </a>
        <img
          src={postJobAuntyImage}
          alt="Illustration"
          className="mt-6 w-60 md:w-72 lg:w-96"
        />
      </div>

      {/* Right Section */}
      <div className="w-full max-w-3xl p-6 space-y-6 bg-white rounded-lg shadow-lg lg:w-2/3">
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
        <JobForm skills={skills} />
      </div>
    </div>
  );
};

export default PostJobPage;
