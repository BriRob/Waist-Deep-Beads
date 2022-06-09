import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteWaistbeadThunk,
  getOneWaistbeadThunk,
} from "../../store/waistbeads";
import EditWb from "./EditWb";

function OneWb() {
  const { beadId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const waistbead = useSelector((state) => state.waistbeadsReducer?.waistbead);
  //   console.log("waistbead", waistbead);

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(getOneWaistbeadThunk(beadId));
  }, [dispatch]);

  let categories;
  if (waistbead) {
    categories = Object.values(waistbead?.categories);
    // console.log("category", Object.values(waistbead.categories))
  }

  return (
    <>
      {waistbead && (
        <div>
          {/* <div>Hello</div> */}
          <img src={waistbead.bead_img_url} alt="waistbeads"></img>
          <h2>{waistbead.name}</h2>
          <div>Beader: {waistbead.user.username}</div>

          {!showEdit && (
            <>
              <div>${waistbead.price}</div>
              <div>
                In Stock?
                {waistbead.in_stock ? <span>yes</span> : <span>no</span>}
              </div>
              <div>
                categories:
                {categories.map((name, idx) => (
                  <span key={idx}>{name.category_name}</span>
                ))}
              </div>
              <div>{waistbead.description}</div>
              <div>{waistbead.created_at}</div>
              <button onClick={() => setShowEdit(true)}>Edit</button>
              <button
                onClick={() => {
                  dispatch(deleteWaistbeadThunk(beadId));
                  return history.push("/");
                }}
              >
                Delete
              </button>
            </>
          )}
          {showEdit && <EditWb hideEdit={() => setShowEdit(false)} />}
        </div>
      )}
    </>
  );
}

export default OneWb;
