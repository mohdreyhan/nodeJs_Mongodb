import {
  GET_ALL_FILES,
  UPLOAD_FILE,
  SUCCESS_MSG,
  DELETE_FILE,
} from "./Types.js";

export const GETALLFILES = (value) => {
  return {
    type: GET_ALL_FILES,
    payload: { value },
  };
};

export const UPLOADFILE = (name, value) => {
  return {
    type: UPLOAD_FILE,
    payload: { name, value },
  };
};

export const DELETEFILE = (value) => {
  return {
    type: DELETE_FILE,
    payload: { value },
  };
};

export const SUCCESSMSG = (message, statusCode) => {
  return {
    type: SUCCESS_MSG,
    payload: { message, statusCode },
  };
};