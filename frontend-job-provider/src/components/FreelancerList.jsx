import FreelancerCard from "../components/FreelancerCard";
import { motion } from "framer-motion";

const FreelancerList = ({ freelancers }) => {
  if (!freelancers) {
    return <p className="text-center text-gray-600">Loading Freelancers...</p>;
  }

  if (freelancers.length === 0) {
    return <p className="text-center text-gray-600">No freelancers found.</p>;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {freelancers.map((freelancer, index) => (
        <motion.div
          key={freelancer._id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <FreelancerCard freelancer={freelancer} />
        </motion.div>
      ))}
    </div>
  );
};

export default FreelancerList;
