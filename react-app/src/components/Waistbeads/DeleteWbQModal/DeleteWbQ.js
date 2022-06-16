import { useDispatch } from "react-redux";
import {
  deleteWaistbeadThunk,
  getAllWaistbeadsThunk,
} from "../../../store/waistbeads";
// import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";

function DeleteWbQ({ review, beadId, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const yesDel = async () => {
    setShowModal(false);
    await dispatch(deleteWaistbeadThunk(beadId));
    await dispatch(getAllWaistbeadsThunk());
    return history.push("/");
  };

  return (
    <div>
      <h1>Delete Post?</h1>
      <div>Are you sure you would like to delete this post?</div>
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

export default DeleteWbQ;
