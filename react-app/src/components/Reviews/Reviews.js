import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/reviews";

function Reviews() {
    const {beadId} = useParams()
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviewsReducer?.reviews)

    console.log(reviews)

    useEffect(() => {
        dispatch(getAllReviewsThunk(beadId))
    }, [dispatch])

    return (
        <>
        <div>

        </div>
        </>
    )
}

export default Reviews;
