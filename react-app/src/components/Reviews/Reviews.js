import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import OneReview from "./OneReview";

function Reviews({ reviewsObj }) {
  const { beadId } = useParams();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session?.user);

  const [showAddRev, setShowAddRev] = useState(false)

  const stateOfAdd = () => {
      if (sessionUser){
          setShowAddRev(true)
      } else {
          history.push('/')
      }

  }


  const reviews = Object.values(reviewsObj);

  return (
    <div>
      {reviews.length > 1 && <h3>{reviews.length} Reviews</h3>}
      {reviews.length === 1 && <h3>{reviews.length} Review</h3>}
      {reviews.length === 0 && <h3>0 Reviews</h3>}
      <button onClick={stateOfAdd}>Add Your Review</button>
      {showAddRev && <AddReview hideRev={() => setShowAddRev(false)}/>}
      <div>
        {reviews.map((review, idx) => (
          <div key={review.id}>
              <OneReview review={review} beadId={beadId}/>
          </div>
        ))}
      </div>
    </div>
  );
}
// }

export default Reviews;
