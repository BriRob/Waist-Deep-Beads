const GET_ALL_WB = "waistbeads/GET_ALL_WB";
const GET_ONE_WB = "waistbeads/GET_ONE_WB";
const DELETE_WB = "waistbeads/DELETE_WB";
const ONE_USER_WBS = "waistbeads/ONE_USER_WBS";
// const CLEAR_ALL_WBS = "waistbeads/CLEAR_ALL_WBS"
const CLEAR_ONE_WB = "waistbeads/CLEAR_ONE_WB";

const getAllWb = (waistbeads) => ({
  type: GET_ALL_WB,
  waistbeads,
});

const getOneWb = (waistbead) => ({
  type: GET_ONE_WB,
  waistbead,
});

const deleteWb = (waistbead) => ({
  type: DELETE_WB,
  waistbead,
});

const oneUserWbs = (waistbeads) => ({
  type: ONE_USER_WBS,
  waistbeads,
})

// clear all WBS state
// export const clearAllWbs = () => ({
//   type: CLEAR_ALL_WBS
// })

// clear one WB state
export const clearWbs = () => ({
  type: CLEAR_ONE_WB
})

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

export const newWaistbeadThunk = (userId, form, newCateArr) => async (dispatch) => {
  const { bead_img_url, name, price, description, in_stock } = form;
  const formData = new FormData();
  // console.log('in newwbthunk', newCateArr)

  //   console.log("in thunk!!!")
  formData.append("bead_img_url", bead_img_url);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("in_stock", in_stock);
  // newCateArr.forEach(cat => {

  //   formData.append(`${cat}`, cat);
  // })

  const option = {
    method: "POST",
    body: formData,
  };
  // const response = await fetch(`/api/waistbeads/${userId}/new`, option);
  const response = await fetch(`/api/waistbeads/${userId}/new?cates=${newCateArr}`, option);

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

export const editWaistbeadThunk = (beadId, form, newCateArr) => async (dispatch) => {
  const { bead_img_url, name, price, description, in_stock } = form;
  const formData = new FormData();

    // console.log(newCateArr, "in edit thunk!!!")
  formData.append("bead_img_url", bead_img_url);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("in_stock", in_stock);

  const option = {
    method: "PUT",
    body: formData,
  };
  const response = await fetch(`/api/waistbeads/${beadId}/edit?cates=${newCateArr}`, option);

  if (response.ok) {
    const bead = await response.json();
    dispatch(getOneWb(bead));
    return bead;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  }
  return response;
};

export const deleteWaistbeadThunk = (beadId) => async (dispatch) => {
  // console.log('<--------- HELLO From DELETE POST THUNK -------->')
  const response = await fetch(`/api/waistbeads/${beadId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const bead = await response.json();
    dispatch(deleteWb(bead));
    return bead

  }
  return response;
};


export const oneUserWaistbeadsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/waistbeads/users/${userId}`);
  if (response.ok) {
    const waistbeads = await response.json();
    dispatch(oneUserWbs(waistbeads));
    return waistbeads
  }
  return response;
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
      console.log("newState \n\n", newState)
      return newState;
    case DELETE_WB:
      newState = { ...state };
      delete newState.waistbead;
      return newState;
    case ONE_USER_WBS:
      newState = { ...state };
      newState.userWbs = action.waistbeads;
      return newState;
    // case CLEAR_ALL_WBS:
    //   newState = { ...state };
    //   console.log("newState before making one null", newState)
    //   return newState.waistbeads = null;
    case CLEAR_ONE_WB:
      newState = { ...state};
      // console.log("newState before making one null", newState)
      newState.waistbead = null
      // console.log("newState", newState)
      return newState;
    default:
      return state;
  }
}
