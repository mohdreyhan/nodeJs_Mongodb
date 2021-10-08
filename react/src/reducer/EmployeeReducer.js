import { ALL_STATUSES, USERS_DATA } from "../actions/Types";

const initialState = {
  usersDetails: [],
  statuses: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA:
      return Object.assign({}, state, {
        usersDetails: action.payload,
      });
    case ALL_STATUSES:
      return Object.assign({}, state, {
        statuses: action.payload,
      });
    default:
      return state;
  }
};

export default reducer;
