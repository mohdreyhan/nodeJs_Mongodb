import {
  CREATEPROJECT_INPUTS,
  SUCCESS_MSG,
  GETALL_PROJECTS,
  DELETE_PROJECT_INPUTS,
  EDIT_PROJECT_INPUTS,
} from "./Types.js";

export const GETALLPROJECTS = (value) => {
  return {
    type: GETALL_PROJECTS,
    payload: { value },
  };
};

export const CREATEPROJECTINPUTS = (name, value) => {
  return {
    type: CREATEPROJECT_INPUTS,
    payload: { name, value },
  };
};

export const SUCCESSMSG = (message, statusCode) => {
  return {
    type: SUCCESS_MSG,
    payload: { message, statusCode },
  };
};

export const DELETEPROJECTINPUTS = (value) => {
  return {
    type: DELETE_PROJECT_INPUTS,
    payload: { value },
  };
};

export const EDITPROJECTINPUTS = (value) => {
  return {
    type: EDIT_PROJECT_INPUTS,
    payload: { value },
  };
};
