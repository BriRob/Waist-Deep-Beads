import { useDispatch } from "react-redux";
import { deleteWaistbeadThunk, getAllWaistbeadsThunk } from "../../../store/waistbeads";
// import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";

function DeleteWbQ({ review, beadId, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const yesDel = async () => {
    await dispatch(deleteWaistbeadThunk(beadId));
    await dispatch(getAllWaistbeadsThunk());
    setShowModal(false)
    return history.push("/");
  }

  return (
    <div>
        <h1>Delete Post?</h1>
      <div>Are you sure you would like to delete this post?</div>
      <button onClick={yesDel}>Yes</button>
      <button onClick={() => setShowModal(false)}>No</button>
    </div>
  );
}

export default DeleteWbQ;
