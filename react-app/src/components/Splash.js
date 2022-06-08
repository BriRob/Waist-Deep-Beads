import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllWaistbeadsThunk } from "../store/waistbeads";

function Splash() {
    const dispatch = useDispatch()
    const waistbeads = useSelector((state) => state.waistbeadsReducer?.waistbeads)

    // console.log('waistbeads', waistbeads)

    useEffect(() => {
        dispatch(getAllWaistbeadsThunk())
    }, [dispatch])

    return (
        <>
        <h1>My Home Page</h1>
        <div>
            {waistbeads?.map((bead,idx) => (
                <Link to={`/waistbeads/${bead.id}`} key={idx}>
                    <img src={bead.bead_img_url} alt="waistbeads"></img>
                    <h3>{bead.name}</h3>
                    {/* <div>Average Rating: {bead.rating}</div> */}
                    <div>${bead.price}</div>
                </Link>
            ))}
        </div>
        </>
    )
}

export default Splash;
