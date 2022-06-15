import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { oneUserWaistbeadsThunk } from "../../store/waistbeads";
import './User.css'

function User() {
  // const [user, setUser] = useState({});
  const { userId } = useParams();

  const dispatch = useDispatch();
  const userAndWbs = useSelector((state) => state.waistbeadsReducer?.userWbs);

  console.log("userAndWbs", userAndWbs);

  let user;
  let waistbeads;
  let waistbeadsArr;
  if (userAndWbs) {
    user = userAndWbs.user;
    waistbeads = userAndWbs.user_wbs;
    waistbeadsArr = Object.values(waistbeads).reverse();
  }

  console.log("user from selector", user);
  console.log("user's waistbeads", waistbeads);
  console.log("user's waistbeadsArr", waistbeadsArr);

  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(oneUserWaistbeadsThunk(userId));
  }, [userId, dispatch]);

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{user.username} Profile</h1>
      <div className="userInfo">{user.full_name}</div>
      <div className="userInfo">{user.email}</div>
      <h2>Your {waistbeadsArr.length} Creation(s)</h2>
      <div className="profPosts">
        {waistbeadsArr?.map((bead, idx) => (
          <Link to={`/waistbeads/${bead.id}`} key={idx} className="eachPost">
            <div className="">Posted on: {bead.created_at}</div>
            <img src={bead.bead_img_url} alt="waistbeads"></img>
            <h3>{bead.name}</h3>
            <div>
              {bead.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>

            <div>
              In Stock?
              {bead.in_stock ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-x"></i>}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
export default User;
