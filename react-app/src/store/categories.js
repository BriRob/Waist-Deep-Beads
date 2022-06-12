const ALL_CATEGORIES = "waistbeads/ALL_CATEGORIES";

const allCategories = (categories) => ({
  type: ALL_CATEGORIES,
  categories,
});

export const getAllCategories = () => async (dispatch) => {
  const response = await fetch("/api/waistbeads/categories");
  if (response.ok) {
    const categories = await response.json();
    dispatch(allCategories(categories));
  }
  return response;
};

export default function categoriesReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ALL_CATEGORIES:
      newState = { ...state};
      newState.categories = action.categories
      // console.log(newState)
      return newState;
    // case GET_ONE_WB:
    //   newState = { ...state };
    //   newState.waistbead = action.waistbead;
    //   return newState;
    // case DELETE_WB:
    //   newState = { ...state };
    //   delete newState.waistbead;
    //   return newState;
    default:
      return state;
  }
}
