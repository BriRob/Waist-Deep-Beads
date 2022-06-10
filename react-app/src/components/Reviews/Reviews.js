import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import OneReview from "./OneReview";

function Reviews({ reviewsObj }) {
  const { beadId } = useParams();

  const reviews = Object.values(reviewsObj);

  return (
    <div>
      {reviews.length > 1 && <h3>{reviews.length} Reviews</h3>}
      {reviews.length === 1 && <h3>{reviews.length} Review</h3>}
      {reviews.length === 0 && <h3>0 Reviews</h3>}
      <button>Add Your Review</button>
      <AddReview />
      <div>
        {reviews.map((review, idx) => (
          <div key={review.id}>
              <OneReview review={review} beadId={beadId}/>
          </div>
        ))}
      </div>
    </div>
  );
}
// }

export default Reviews;
