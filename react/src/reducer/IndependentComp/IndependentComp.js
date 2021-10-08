import { SHOW_SPINNER } from "../../actions/IndependentComp/Types";

const initialState = {
    showSpinner: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPINNER:
      return Object.assign({}, state, {
        showSpinner: action.payload.value,
      });
    default:
      return state;
  }
};

export default reducer;
