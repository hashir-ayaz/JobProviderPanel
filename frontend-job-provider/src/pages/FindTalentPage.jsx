import { useEffect, useState } from "react";
import FreelancerList from "../components/FreelancerList";
import FilterSheet from "../components/FilterSheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { fetchFreelancers } from "../services/freelancerService";

// // Dummy data for freelancers
// const dummyFreelancers = [
//   {
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     skills: [{ name: "React" }, { name: "Node.js" }],
//     totalJobs: 15,
//     totalEarnings: 5000,
//     avgRating: 4.5,
//     reviews: [1, 2, 3, 4, 5],
//     profilePicture: "https://via.placeholder.com/150",
//     bio: "Experienced React and Node.js developer.",
//     location: "New York, USA",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     skills: [{ name: "Python" }, { name: "Data Science" }],
//     totalJobs: 20,
//     totalEarnings: 7500,
//     avgRating: 4.8,
//     reviews: [1, 2, 3, 4, 5, 6],
//     profilePicture: "https://via.placeholder.com/150",
//     bio: "Data scientist with expertise in machine learning.",
//     location: "London, UK",
//   },
//   // Add more dummy freelancers as needed
// ];

function FindTalentPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    skills: "",
    minRating: 0,
    maxBudget: 10000,
  });
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const loadFreelancers = async () => {
      try {
        const response = await fetchFreelancers();
        console.log("response", response);
        setFreelancers(response.data);
      } catch {
        console.log("error");
      }
    };
    // fetch freelancers from API
    loadFreelancers();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Function to apply filters to the freelancers list
  const applyFilters = () => {
    let filtered = freelancers;

    // Filter by skills
    if (filters.skills) {
      const skillsArray = filters.skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase());
      filtered = filtered.filter((freelancer) =>
        freelancer.skills.some((skill) =>
          skillsArray.includes(skill.name.toLowerCase())
        )
      );
    }

    // Filter by minimum rating
    if (filters.minRating > 0) {
      filtered = filtered.filter(
        (freelancer) => freelancer.avgRating >= filters.minRating
      );
    }

    // Filter by maximum budget
    if (filters.maxBudget < 10000) {
      filtered = filtered.filter(
        (freelancer) => freelancer.totalEarnings <= filters.maxBudget
      );
    }

    return filtered;
  };

  const filteredFreelancers = applyFilters();

  return (
    <div className="container px-4 py-8 mx-auto font-custom">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Find Talent</h1>
        <FilterSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <FreelancerList freelancers={filteredFreelancers} />
    </div>
  );
}

export default FindTalentPage;
