import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/reviews";
import AddReview from "./AddReview";

function Reviews({reviewsObj}) {
//   const { beadId } = useParams();
  const dispatch = useDispatch();
//   const reviews = useSelector((state) => state.reviewsReducer?.reviews);

//   console.log(reviewsObj);
  const reviews = Object.values(reviewsObj)

//   useEffect(() => {
//     dispatch(getAllReviewsThunk(beadId));
//   }, [dispatch]);

//   if (reviews === undefined) {
//     return <h3>Loading...</h3>;
//   } else {
    return (

      <div>
        {reviews.length > 1 && <h3>{reviews.length} Reviews</h3>}
        {reviews.length === 1 && <h3>{reviews.length} Review</h3>}
        {reviews.length === 0 && <h3>0 Reviews</h3>}
        <button>Add Your Review</button>
        <AddReview />
        <div>
          {reviews.map((review, idx) => (
            <div key={idx}>
              <div>{review.author.username}</div>
              <div>{review.created_at}</div>
              <div>{review.rating}</div>
              <div>{review.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
// }

export default Reviews;
