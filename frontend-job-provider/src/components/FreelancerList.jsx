import FreelancerCard from "../components/FreelancerCard";

const FreelancerList = ({ freelancers }) => {
  if (!freelancers) {
    return <p className="text-center text-gray-600">Loading Freelancers...</p>;
  }

  if (freelancers.length === 0) {
    return <p className="text-center text-gray-600">No freelancers found.</p>;
  }

  return (
    <div className="grid min-h-screen grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {freelancers.map((freelancer) => (
        <FreelancerCard key={freelancer._id} freelancer={freelancer} />
      ))}
    </div>
  );
};

export default FreelancerList;
