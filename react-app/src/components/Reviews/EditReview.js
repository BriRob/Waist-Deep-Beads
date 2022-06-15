import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addReviewThunk,
  editReviewThunk,
  getAllReviewsThunk,
} from "../../store/reviews";
import StarRating from "./StarRating";
import './EditReview.css'

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
    <div className="bigEditRev">
      <h3>Edit Your Review</h3>
      <form onSubmit={handleSubmit}>
        {errors.map((error, idx) => (
          <div id="errors" key={idx}>
            {error}
          </div>
        ))}
        <div>
          <label>
          <div className="rating editRate">
            Rating<span>*</span>
              </div>
            <StarRating rating={rating} setRating={setRating}/>
            {/* <input
              type="number"
              name="rating"
              value={rating}
              min={1}
              max={5}
              onChange={(e) => setRating(e.target.value)}
            ></input> */}
          </label>
        </div>

          <label className="addRevTextALabel editRevTxL">
            <textarea
            className="addRevTextA editTxA"
              placeholder="Add your comments"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="lessThan">(less than 300 characters)</div>
          </label>
        <div className="postCancelbtns">

        {/* <button className="postbtn-editRev" disabled={content.length > 300}>Submit</button> */}
        <button className="postbtn-editRev">Submit</button>
        <button className="cancelbtn" onClick={handleCancel}>Cancel</button>
        </div>
        <div>*Required</div>
      </form>
    </div>
  );
}

export default EditReview;
