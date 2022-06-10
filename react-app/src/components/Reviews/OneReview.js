import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import EditReview from "./EditReview";

function OneReview({ review, beadId }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session?.user);

  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <div>{review.author.username}</div>
      <div>{review.created_at}</div>
      {/* {showEdit ? (
      <div>show edit is true</div>
      ): (
      <div>show edit is false
          <div>{review.rating}</div>
      <div>{review.content}</div>
      </div>
      )} */}
      {!showEdit && (<>

      <div>{review.rating}</div>
      <div>{review.content}</div>
      </>)}
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
