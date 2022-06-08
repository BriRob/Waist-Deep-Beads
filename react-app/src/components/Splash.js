import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
                <div key={idx}>
                    <img src={bead.bead_img_url} alt="waistbeads"></img>
                    <div>{bead.name}</div>
                    {/* {bead.in_stock ? <div>yes</div> : <div>no</div>} */}
                    <div>{bead.rating}</div>
                    <div>{bead.price}</div>
                </div>
            ))}
        </div>
        </>
    )
}

export default Splash;
