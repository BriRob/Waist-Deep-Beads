import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import AddReview from "./AddReview";
// import EditReview from "./EditReview";
import OneReview from "./OneReview";
import './Reviews.css'

function Reviews({ reviewsObj }) {
  const { beadId } = useParams();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session?.user);

  const [showAddRev, setShowAddRev] = useState(false)

  const stateOfAdd = () => {
      if (sessionUser){
          setShowAddRev(true)
      } else {
          history.push('/login')
      }

  }


  const reviews = Object.values(reviewsObj);

  return (
    <div className="bigReviews">
      {reviews.length > 1 && <h2 className="bigRevTitle">{reviews.length} Reviews</h2>}
      {reviews.length === 1 && <h2 className="bigRevTitle">{reviews.length} Review</h2>}
      {reviews.length === 0 && <h2 className="bigRevTitle">0 Reviews</h2>}
      <hr></hr>
      <div className="outsideAddRevBtn">

      <button className='addBtn' onClick={stateOfAdd}>Add Your Review</button>
      </div>
      {showAddRev && <AddReview hideRev={() => setShowAddRev(false)}/>}
      <div className="allRevs">
        {reviews.map((review, idx) => (
          <div key={review.id} className="eachRev">
              <OneReview review={review} beadId={beadId}/>
          </div>
        ))}
      </div>
    </div>
  );
}
// }

export default Reviews;
