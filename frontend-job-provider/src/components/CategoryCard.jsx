import { Star } from "lucide-react"; // Icon library

const CategoryCard = ({ title, rating, skills }) => {
  return (
    <div className="flex flex-col justify-between p-4 transition rounded-lg shadow bg-blue-50 hover:shadow-md hover:bg-blue-100">
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <div className="flex items-center mt-2 space-x-2">
        <Star className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">{rating}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{skills} skills</p>
    </div>
  );
};

export default CategoryCard;
