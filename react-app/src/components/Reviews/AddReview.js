import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import StarRating from "./StarRating";
import './AddReview.css'

function AddReview({hideRev}) {
  const { beadId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const [errors, setErrors] = useState([]);

  const root = document.documentElement;

  const scrollToBottom = () => {
    root.scrollTo(100000, 1000000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authId = user.id;
    const form = { content, rating };
    const newRev = await dispatch(addReviewThunk(beadId, authId, form));

    if (newRev.errors) {
      setErrors(newRev.errors);
    } else {
      await dispatch(getAllReviewsThunk(beadId));
      setContent("");
      setRating(5);
      setErrors([])
      hideRev()
      scrollToBottom()
    }
    // console.log("from addrev thunk!! \n\n", newRev);
  };

//   console.log(errors);

  const handleCancel = (e) => {
    e.preventDefault();
    hideRev()
    // close modal
  };


  return (
    <>
      <h2>Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        {errors.map((error, idx) => (
          <div id="errors" key={idx}>
            {error}
          </div>
        ))}
        <div>
          <label>
            Rating<span>*</span>
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

export default AddReview;
