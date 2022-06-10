const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const getAllReviews = (reviews) => ({
  type: GET_ALL_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});

export const getAllReviewsThunk = (beadId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${beadId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getAllReviews(reviews));
    // console.log(reviews)
  }
  return response;
};

export const addReviewThunk = (beadId, authId, form) => async (dispatch) => {
  const { content, rating } = form;
  const formData = new FormData();

  //   console.log("in thunk!!!")
  formData.append("content", content);
  formData.append("rating", rating);

  const option = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(`/api/reviews/${beadId}/${authId}/new`, option);

  if (response.ok) {
    const review = await response.json();
    dispatch(addReview(review));
    // console.log('review from addthunk', review)
    return review;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  }
  return response
};

// edit review
export const editReviewThunk = (reviewId, form) => async (dispatch) => {
  const { content, rating } = form;
  const formData = new FormData();

  formData.append("content", content);
  formData.append("rating", rating);

  const option = {
    method: "PUT",
    body: formData,
  };
  const response = await fetch(`/api/reviews/${reviewId}/edit`, option);

  if (response.ok) {
    const review = await response.json();
    dispatch(addReview(review));
    return review;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  }
  return response
};

export default function reviewsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_REVIEWS:
      newState = { ...state, ...action.reviews };
    //   console.log(newState);
      return newState;
    case ADD_REVIEW:
      newState = { ...state };
      newState.reviews[action.review.id] = action.review
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState.review;
      return newState;
    default:
      return state;
  }
}
