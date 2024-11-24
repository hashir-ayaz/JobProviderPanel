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

  return (
    <section className="max-w-screen-xl py-10 mx-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-extrabold text-foreground">
          Browse Talent by Category
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Looking for work?{" "}
          <a href="#" className="text-blue-500 underline">
            Browse jobs
          </a>
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            rating={category.rating}
            skills={category.skills}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
