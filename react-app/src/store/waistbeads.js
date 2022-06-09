const GET_ALL_WB = "waistbeads/GET_ALL_WB";
const GET_ONE_WB = "waistbeads/GET_ONE_WB";

const getAllWb = (waistbeads) => ({
  type: GET_ALL_WB,
  waistbeads,
});

const getOneWb = (waistbead) => ({
  type: GET_ONE_WB,
  waistbead,
});


export const getAllWaistbeadsThunk = () => async (dispatch) => {
  const response = await fetch("/api/waistbeads/");
  if (response.ok) {
    const waistbeads = await response.json();
    dispatch(getAllWb(waistbeads));
  }
  return response;
};

export const getOneWaistbeadThunk = (beadId) => async (dispatch) => {
  const response = await fetch(`/api/waistbeads/${beadId}`);
  if (response.ok) {
    const waistbead = await response.json();
    dispatch(getOneWb(waistbead));
  }
  return response;
};

export const newWaistbeadThunk = (userId, form) => async (dispatch) => {
  const { bead_img_url, name, price, description, in_stock } = form;
  const formData = new FormData();

//   console.log("in thunk!!!")
  formData.append("bead_img_url", bead_img_url);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("in_stock", in_stock);

  const option = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(`/api/waistbeads/${userId}/new`, option);

  if (response.ok) {
    const post = await response.json();
    dispatch(getOneWb(post));
    return post;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  }
  // return response
};

export const editWaistbeadThunk = (beadId, form) => async (dispatch) => {
  const { bead_img_url, name, price, description, in_stock } = form;
  const formData = new FormData();

//   console.log("in thunk!!!")
  formData.append("bead_img_url", bead_img_url);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("in_stock", in_stock);

  const option = {
    method: "PUT",
    body: formData,
  };
  const response = await fetch(`/api/waistbeads/${beadId}/edit`, option);

  if (response.ok) {
    const post = await response.json();
    dispatch(getOneWb(post));
    return post;
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

export default function waistbeadsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_WB:
      newState = { ...state, ...action.waistbeads };
      // console.log(newState)
      return newState;
    case GET_ONE_WB:
      newState = { ...state };
      newState.waistbead = action.waistbead;
      return newState;
    default:
      return state;
  }
}
