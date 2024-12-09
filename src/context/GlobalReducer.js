import { GLOBAL_REDUCER_ACTIONS } from "../constants/actionTypes";

function GlobalReducer(state, action) {
  switch (action.type) {
    case GLOBAL_REDUCER_ACTIONS.SET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
      };
    default:
      return state;
  }
}

export default GlobalReducer;
