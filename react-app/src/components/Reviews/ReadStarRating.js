import { FaStar } from "react-icons/fa";
import "./StarRating.css";

function ReadStarRating({ rating }) {
  return (
    <>
      {[...Array(5)].map((star, idx) => {
        const value = idx + 1;
        return (
          <FaStar
            size={25}
            className="readStars"
            color={value <= rating ? "#ffc107" : "#e4e5e9"}
            key={idx}
          />
        );
      })}
    </>
  );
}

export default ReadStarRating;
