const GET_ALL_WB = 'waistbeads/GET_ALL_WB'
const GET_ONE_WB = 'waistbeads/GET_ONE_WB'

const getAllWb = (waistbeads) => ({
    type: GET_ALL_WB,
    waistbeads
})

const getOneWb = (waistbead) => ({
    type: GET_ONE_WB,
    waistbead
})

export const getAllWaistbeadsThunk = () => async (dispatch) => {
    const response = await fetch("/api/waistbeads/")
    if (response.ok) {
        const waistbeads = await response.json()
        dispatch(getAllWb(waistbeads))
    }
    return response
}

export const getOneWaistbead = (beadId) => async (dispatch) => {
    const response = await fetch(`/api/waistbeads/${beadId}`)
    if (response.ok) {
        const waistbead = await response.json()
        dispatch(getOneWb(waistbead))
    }
    return response
}

export default function waistbeadsReducer(state = {}, action) {
    let newState;
    switch(action.type) {
        case GET_ALL_WB:
            newState = {...state, ...action.waistbeads}
            // console.log(newState)
            return newState
        case GET_ONE_WB:
            newState = {...state}
            newState.waistbead = action.waistbead
            return newState
        default:
            return state
    }
}
