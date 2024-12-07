import { useEffect, useState } from "react";
import FreelancerList from "../components/FreelancerList";
import FilterSheet from "../components/FilterSheet";
import { fetchFreelancers } from "../services/freelancerService";
import { fetchSkills } from "../services/jobService";

function FindTalentPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    skills: "",
    minRating: 0,
    maxBudget: 10000,
  });
  const [skills, setSkills] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state
  const [error, setError] = useState(null); // Define error state

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

  useEffect(() => {
    const loadSkills = async () => {
      setIsLoading(true); // Use setIsLoading
      setError(null); // Reset error state
      try {
        const response = await fetchSkills();
        const fetchedSkills = response;
        console.log("fetchedSkills", fetchedSkills);
        setSkills(fetchedSkills);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills");
        setSkills([]);
      } finally {
        setIsLoading(false); // Stop loading indicator
      }
    };
    loadSkills();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filtered = freelancers;

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

    if (filters.minRating > 0) {
      filtered = filtered.filter(
        (freelancer) => freelancer.avgRating >= filters.minRating
      );
    }

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
          skills={skills}
          isLoading={isLoading} // Pass isLoading as prop
          error={error} // Pass error as prop
        />
      </div>

      <FreelancerList freelancers={filteredFreelancers} />
    </div>
  );
}

export default FindTalentPage;
