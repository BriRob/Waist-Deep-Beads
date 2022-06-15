import { useDispatch } from "react-redux";
import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";

function DeleteRevQ({ review, beadId, setShowModal }) {
  const dispatch = useDispatch();

  const yesDel = async () => {
    await dispatch(deleteReviewThunk(review.id));
    await dispatch(getAllReviewsThunk(beadId));
    setShowModal(false)
  }

  return (
    <div>
        <h1>Delete Review?</h1>
      <div>Are you sure you would like to delete this review?</div>
      <button onClick={yesDel}>Yes</button>
      <button onClick={() => setShowModal(false)}>No</button>
    </div>
  );
}

export default DeleteRevQ;
