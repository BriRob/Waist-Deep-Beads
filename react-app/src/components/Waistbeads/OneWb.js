import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getAllCategories } from "../../store/categories";
import { getAllReviewsThunk } from "../../store/reviews";
import {
  deleteWaistbeadThunk,
  getAllWaistbeadsThunk,
  getOneWaistbeadThunk,
} from "../../store/waistbeads";
import Reviews from "../Reviews/Reviews";
import EditWb from "./EditWb";
import "./OneWb.css";

function OneWb() {
  const { beadId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session?.user);
  const waistbead = useSelector((state) => state.waistbeadsReducer?.waistbead);
  const reviews = useSelector((state) => state.reviewsReducer?.reviews);
  // console.log("waistbead", waistbead);

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(getOneWaistbeadThunk(beadId));
    dispatch(getAllReviewsThunk(beadId));
  }, [dispatch]);

  let categories;
  if (waistbead) {
    categories = Object.values(waistbead?.categories);
    // console.log("category", Object.values(waistbead.categories))
  }

  return (
    <>
      {waistbead && (
        <div className="oneWbBig">
          {/* <div>Hello</div> */}
          {/* <div className=""> */}
          <img
            src={waistbead.bead_img_url}
            alt="waistbeads"
            className="wbPic"
          ></img>
          {/* </div> */}
          <div className="wb-details">
            <h1>{waistbead.name}</h1>
            <div className="beader">Beader: {waistbead.user.username}</div>

            {!showEdit && (
              <div className="priceToEnd">
                <div className="priceToDesc">
                  <div className="priceInStock">
                    <div>
                      {waistbead.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                    <div>
                      In Stock?
                      {waistbead.in_stock ? <span>yes</span> : <span>no</span>}
                    </div>
                  </div>
                  <div className="categories">
                    <div className="categoriesT">categories:</div>
                    <div className="allCategories">
                      {categories.map((categ, idx) => (
                        <Link key={idx} to={`/categories/${categ.id}`}>
                        <div className="eachCategory" key={idx}>
                          {categ.category_name}
                        </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="wbDesc">{waistbead.description}</div>
                </div>
                <div>
                  <div className="wbPostDate">{waistbead.created_at}</div>
                  {sessionUser && waistbead.beader_id === sessionUser.id && (
                    <div className="editDelDiv">
                      <button
                        className="editBtn"
                        onClick={async () => {
                          await dispatch(getAllCategories());
                          setShowEdit(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delBtn"
                        onClick={async () => {
                          await dispatch(deleteWaistbeadThunk(beadId));
                          await dispatch(getAllWaistbeadsThunk());
                          return history.push("/");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {showEdit && <EditWb hideEdit={() => setShowEdit(false)} />}
          </div>
        </div>
      )}
      {reviews && <Reviews reviewsObj={reviews} />}
    </>
  );
}

export default OneWb;
