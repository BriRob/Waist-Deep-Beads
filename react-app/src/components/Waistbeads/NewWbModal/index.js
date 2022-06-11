import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
// import LoginForm from '../auth/LoginForm';
import NewWb from '../NewWb';
import { Modal } from '../../../context/Modal';

function NewWbModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>NewWb</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewWb setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewWbModal;
