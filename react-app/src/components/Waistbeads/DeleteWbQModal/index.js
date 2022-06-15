import React, { useState } from "react";
// import { Modal } from '../../context/Modal';
// import LoginForm from '../auth/LoginForm';
// import AddReview from "../AddReview";
// import DeleteRevQ from "../DeleteRevQ";
import { Modal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteWbQ from "./DeleteWbQ";

function DeleteWbQModal({ beadId }) {
  const [showModal, setShowModal] = useState(false);

//   const history = useHistory();
//   const sessionUser = useSelector((state) => state.session?.user);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Add Review</button> */}
      <div>
        <button className="delBtn" onClick={() => setShowModal(true)}>
          Delete
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteWbQ beadId={beadId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteWbQModal;
