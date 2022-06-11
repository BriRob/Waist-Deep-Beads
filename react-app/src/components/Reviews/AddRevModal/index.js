import React, { useState } from "react";
// import { Modal } from '../../context/Modal';
// import LoginForm from '../auth/LoginForm';
import AddReview from "../AddReview";
import { Modal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function AddRevModal() {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const sessionUser = useSelector((state) => state.session?.user);
  const stateOfAdd = () => {
    if (sessionUser) {
      setShowModal(true);
    } else {
      history.push("/login");
    }
  };
  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Add Review</button> */}
      <div className="outsideAddRevBtn">
        <button className="addBtn" onClick={() => stateOfAdd()}>
          Add Review
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReview setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddRevModal;
