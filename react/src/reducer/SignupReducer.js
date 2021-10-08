import { SIGNUP_INPUTS, SIGNUPSUCCESS_ERROR } from "../actions/Types";

const initialState = {
  signupInputs: [],
  signupmsg: "",
};

const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_INPUTS:
      const name = action.payload.name;
      const value = action.payload.value;
      return {
        ...state,
        signupInputs: {
          ...state.signupInputs,
          [name]: value,
        },
      };
    case SIGNUPSUCCESS_ERROR:
      return Object.assign({}, state, {
        signupmsg: action.payload.value,
      });

    default:
      return state;
  }
};

export default SignupReducer;
