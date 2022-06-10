import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReviewThunk } from "../../store/reviews";

function AddReview() {
    const {beadId} = useParams()
    const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);


    const [content, setContent] = useState('')
    const [rating, setRating] = useState(5)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const authId = user.id
        const form = {content, rating}
        const newRev = await dispatch(addReviewThunk(beadId, authId, form))
        console.log('from addrev thunk!! \n\n', newRev)
    }

    const handleCancel = (e) => {
        e.preventDefault()
        // close modal

    }
    return(
        <>
        <h2>Add Your Review</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Rating<span>*</span>
                   <input
                   type="number"
                   name="rating"
                   value={rating}
                   min={1}
                   max={5}
                   onChange={(e) => setRating(e.target.value)}
                   ></input>
                </label>
            </div>
            <div>
                <label>
                    <textarea
                    placeholder="Add your comments"
                    name='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </label>
            </div>
            <button>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
            <div>*Required</div>
        </form>
        </>
    )
}

export default AddReview;
