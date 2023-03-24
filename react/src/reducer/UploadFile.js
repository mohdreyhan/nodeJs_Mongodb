import { GET_ALL_FILES, UPLOAD_FILE, SUCCESS_MSG } from "../actions/Files/Types";

const initialState = {
  usersFiles: [],
  message: "",
  statusCode: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FILES:
      return Object.assign({}, state, {
        usersDetails: action.payload,
      });
    case UPLOAD_FILE:
      return Object.assign({}, state, {
        statuses: action.payload,
      });
    case SUCCESS_MSG:
      return Object.assign({}, state, {
        message: action.payload.message,
        statusCode: action.payload.statusCode,
      });

    default:
      return state;
  }
};

export default reducer;
