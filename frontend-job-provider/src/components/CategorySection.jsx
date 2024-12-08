import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const CategorySection = () => {
  // Example data
  const categories = [
    { title: "Development & IT", rating: "4.85/5", skills: 1853 },
    { title: "Graphic Design & Creative Stuff", rating: "4.91/5", skills: 968 },
    { title: "Sales & Marketing", rating: "4.77/5", skills: 392 },
    { title: "Copy Writing & Translation", rating: "4.92/5", skills: 505 },
    { title: "Admin & Customer Support", rating: "4.66/5", skills: 508 },
    { title: "Finance & Accounting", rating: "4.77/5", skills: 214 },
    { title: "Engineer & Architecture", rating: "4.13/5", skills: 756 },
    { title: "Legal", rating: "4.85/5", skills: 145 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-screen-xl py-10 mx-auto"
    >
      <header className="mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-extrabold text-foreground text-secondary"
        >
          Browse Talent by Category
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-1 text-sm text-muted-foreground"
        >
          Looking for work?{" "}
          <a href="/find-talent" className="text-blue-500">
            Browse jobs
          </a>
        </motion.p>
      </header>
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {categories.map((category, index) => (
          <motion.div key={index} variants={itemVariants}>
            <CategoryCard
              title={category.title}
              rating={category.rating}
              skills={category.skills}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default CategorySection;
