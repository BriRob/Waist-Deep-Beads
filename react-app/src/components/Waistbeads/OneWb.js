import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneWaistbeadThunk } from "../../store/waistbeads";

function OneWb() {
  const { beadId } = useParams();
  const dispatch = useDispatch();
  const waistbead = useSelector((state) => state.waistbeadsReducer?.waistbead);
  //   console.log("waistbead", waistbead);
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
        </div>
      )}
    </>
  );
}

export default OneWb;
