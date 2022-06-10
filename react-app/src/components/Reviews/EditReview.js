import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addReviewThunk,
  editReviewThunk,
  getAllReviewsThunk,
} from "../../store/reviews";

function EditReview({ reviewId, hideEdit }) {
  const { beadId } = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const review = useSelector(
    (state) => state.reviewsReducer?.reviews[reviewId]
  );

  // console.log("review I am editing!!!", review)
  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = { content, rating };
    const editRev = await dispatch(editReviewThunk(reviewId, form));

    if (editRev.errors) {
      setErrors(editRev.errors);
    } else {
      await dispatch(getAllReviewsThunk(beadId));
      setErrors([]);
      hideEdit()
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    hideEdit()
  };

  return (
    <>
      <div>EDIT YOUR REVIEW</div>
      <form onSubmit={handleSubmit}>
        {errors.map((error, idx) => (
          <div id="errors" key={idx}>
            {error}
          </div>
        ))}
        <div>
          <label>
            Rating<span>*</span>
            <input
              type="number"
              name="rating"
              value={rating}
              min={1}
              max={5}
              onChange={(e) => setRating(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            <textarea
              placeholder="Add your comments"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div>(optional, less than 300 characters)</div>
          </label>
        </div>
        <button disabled={content.length > 300}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
        <div>*Required</div>
      </form>
    </>
  );
}

export default EditReview;
