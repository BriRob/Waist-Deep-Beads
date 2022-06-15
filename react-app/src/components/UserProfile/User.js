import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { oneUserWaistbeadsThunk } from "../../store/waistbeads";

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
    waistbeadsArr = Object.values(waistbeads)
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
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>

      <div className="splashPosts">
        {waistbeadsArr?.map((bead, idx) => (
          <Link to={`/waistbeads/${bead.id}`} key={idx} className="eachPost">
            <img src={bead.bead_img_url} alt="waistbeads"></img>
            <h3>{bead.name}</h3>
            <div>{bead.price.toLocaleString('en-US', {style:'currency', currency:'USD'})}</div>

          </Link>
        ))}
      </div>
    </>
  );
}
export default User;
