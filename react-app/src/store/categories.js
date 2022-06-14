const ALL_CATEGORIES = "categories/ALL_CATEGORIES";
const ONE_CATEGORY = "category/ONE_CATEGORY";

const allCategories = (categories) => ({
  type: ALL_CATEGORIES,
  categories,
});

const oneCategory = (category) => ({
  type: ONE_CATEGORY,
  category,
});

export const getAllCategories = () => async (dispatch) => {
  const response = await fetch("/api/categories/");
  if (response.ok) {
    const categories = await response.json();
    dispatch(allCategories(categories));
  }
  return response;
};

export const getOneCategory = (catId) => async (dispatch) => {
  const response = await fetch(`/api/categories/${catId}`);
  if (response.ok) {
    const category = await response.json();
    dispatch(oneCategory(category));
    return category
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
    case ONE_CATEGORY:
      newState = {...state};
      newState.category_wbs = action.category
      return newState
    // case DELETE_WB:
    //   newState = { ...state };
    //   delete newState.waistbead;
    //   return newState;
    default:
      return state;
  }
}
