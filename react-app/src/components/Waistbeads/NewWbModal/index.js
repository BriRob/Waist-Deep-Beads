import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
// import LoginForm from '../auth/LoginForm';
import NewWb from '../NewWb';
import { Modal } from '../../../context/Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../store/categories';

function NewWbModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session?.user);
  const stateOfAdd = async () => {
    if (sessionUser) {
      setShowModal(true);
      await dispatch(getAllCategories())
    } else {
      history.push("/login");
    }
  };
  return (
    <>

      <button className='newWbbtn' onClick={() => stateOfAdd()}><i className="fa-solid fa-plus"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewWb setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewWbModal;
