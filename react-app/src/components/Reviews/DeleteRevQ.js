import { useDispatch } from "react-redux";
import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";

function DeleteRevQ({ review, beadId, setShowModal }) {
  const dispatch = useDispatch();

  const yesDel = async () => {
    setShowModal(false);
    await dispatch(deleteReviewThunk(review.id));
    await dispatch(getAllReviewsThunk(beadId));
  };

  return (
    <div>
      <h1>Delete Review?</h1>
      <div>Are you sure you would like to delete this review?</div>
      <div className="yesNoBtns">
        <button className="yes" onClick={yesDel}>
          Yes
        </button>
        <button className="no" onClick={() => setShowModal(false)}>
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteRevQ;
