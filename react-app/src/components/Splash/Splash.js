import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllWaistbeadsThunk } from "../../store/waistbeads";
import "./Splash.css"

function Splash() {
  const dispatch = useDispatch();
  const waistbeads = useSelector(
    (state) => state.waistbeadsReducer?.waistbeads
  );

  // console.log('waistbeads', waistbeads)

  useEffect(() => {
    dispatch(getAllWaistbeadsThunk());
  }, [dispatch]);

  return (
    <div className="splash">
      {/* <i className="fa-solid fa-plus-large"></i> */}
      <div className="titleAndP">
        <h1>Welcome to Waist Deep Beads</h1>
        <p>Share your waistbead creations and review other beaders' creations</p>
      </div>
      <div className="splashPosts">
        {waistbeads?.map((bead, idx) => (
          <Link to={`/waistbeads/${bead.id}`} key={idx} className="eachPost">
            <img src={bead.bead_img_url} alt="waistbeads"></img>
            <h3>{bead.name}</h3>
            {/* <div>Average Rating: {bead.rating}</div> */}
            {/* <div>${bead.price}</div> */}
            <div>{bead.price.toLocaleString('en-US', {style:'currency', currency:'USD'})}</div>

          </Link>
        ))}
      </div>
    </div>
  );
}

export default Splash;
