// this maps through the reviews and displays them in a list
import ReviewCard from "./ReviewCard";

const PreviousReviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600 font-custom">
        No reviews available.
      </div>
    );
  }

  return (
    <div className="space-y-4 font-custom">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};

export default PreviousReviews;
