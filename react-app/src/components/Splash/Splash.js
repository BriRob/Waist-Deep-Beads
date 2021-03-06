import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearAllWbs, getAllWaistbeadsThunk } from "../../store/waistbeads";
import Footer from "../Footer";
import Loading from "../Loading/Loading";
import "./Splash.css";

function Splash() {
  const dispatch = useDispatch();
  const waistbeads = useSelector(
    (state) => state.waistbeadsReducer?.waistbeads
  );

  // console.log('waistbeads', waistbeads)
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(getAllWaistbeadsThunk());
      setIsLoading(false);
    })();

    // return () => dispatch(clearAllWbs());
  }, [dispatch]);

  if (isLoading) {
    // return <h1>Loading...</h1>
    return <Loading />;
  } else {
    return (
      <>
        <div className="splash">
          {/* <i className="fa-solid fa-plus-large"></i> */}
          <div className="titleAndP">
            <h1>Welcome to Waist Deep Beads</h1>
            <p>
              Share your waistbead creations and review other beaders' creations
            </p>
          </div>
          <div className="splashPosts">
            {waistbeads?.map((bead, idx) => (
              <Link
                to={`/waistbeads/${bead.id}`}
                key={idx}
                className="eachPost"
              >
                {imageLoading && <Loading />}
                <img
                  src={bead.bead_img_url}
                  alt="waistbeads"
                  onLoad={() => setImageLoading(false)}
                  // loading="lazy"
                  style={{ visibility: imageLoading ? "hidden" : "visible" }}
                ></img>
                <h3>{bead.name}</h3>
                <div>{bead.user.username}</div>
                {/* <div>Average Rating: {bead.rating}</div> */}
                {/* <div>${bead.price}</div> */}
                <div>
                  {bead.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Splash;
