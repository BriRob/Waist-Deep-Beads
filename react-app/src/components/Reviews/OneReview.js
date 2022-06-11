import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import EditReview from "./EditReview";
import ReadStarRating from "./ReadStarRating";
import "./OneReview.css";

function OneReview({ review, beadId }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session?.user);

  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <div className="uname-date">
        <div>{review.author.username}</div>
        <div>{review.created_at}</div>
      </div>
      {!showEdit && (
        <>
          <div>
            {/* {review.rating} */}
            <ReadStarRating rating={review.rating} />
          </div>
          <div>{review.content}</div>
        </>
      )}
      {!showEdit && sessionUser && sessionUser.id === review.author.id && (
        <>
          <button onClick={() => setShowEdit(true)}>Edit</button>
          <button
            onClick={async () => {
              await dispatch(deleteReviewThunk(review.id));
              await dispatch(getAllReviewsThunk(beadId));
            }}
          >
            Delete
          </button>
        </>
      )}
      {showEdit && sessionUser && sessionUser.id === review.author.id && (
        <EditReview reviewId={review.id} hideEdit={() => setShowEdit(false)} />
      )}
    </>
  );
}

export default OneReview;
