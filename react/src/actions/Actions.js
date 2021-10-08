import { LOGIN_INPUTS, LOGIN_SUCCESS } from "./Types.js";
import { LOGOUT_SUCCESS } from "./Types.js";
import { SIGNUP_INPUTS, SIGNUPSUCCESS_ERROR } from "./Types";
import { TASK_DETAILS, TASKADDED_SUCCESS } from "./Types.js";
import { USERS_DATA, SHEET_DATA } from "./Types";
import { ASSIGNEMP_INPUTS, ASSIGN_ACTION } from "./Types";
import { UPDATETASK_INPUTS, START_STARTED } from "./Types";
import { FETCH_USERS, ALL_STATUSES } from "./Types";
import { EMP_ROLES, UPDATE_USER_ROLE } from "./Types";

/*------------------------------- SIGN UP --------------------------------------------*/

export const SIGNUPINPUTS = (name, value) => {
  return {
    type: SIGNUP_INPUTS,
    payload: { name, value },
  };
};

export const SIGNUPSUCCESSERROR = (value) => {
  return {
    type: SIGNUPSUCCESS_ERROR,
    payload: { value },
  };
};

/*-------------------------------LOGIN-------------------------*/

export const LOGININPUTS = (name, value) => {
  return {
    type: LOGIN_INPUTS,
    payload: { name, value },
  };
};

export const LOGINSUCCESS = (message) => {
  return {
    type: LOGIN_SUCCESS,
    payload: message,
  };
};

/*-------------------------------LOGOUT-------------------------*/

export const LOGOUTSUCCESS = (message) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: message,
  };
};
/*----------------------------------------------------------------------MANAGER-------------------------------------------------------------*/

/*-------------------------------TASK DETAILS-------------------------*/

export const TASKDETAILS = (results) => {
  return {
    type: TASK_DETAILS,
    payload: results,
  };
};

/*-------------------------------TASKADDEDSUCCESS-------------------------*/

export const TASKADDEDSUCCESS = (message) => {
  return {
    type: TASKADDED_SUCCESS,
    payload: message,
  };
};

/*-------------------------------USERSDATA-------------------------*/

export const USERSDATA = (results) => {
  return {
    type: USERS_DATA,
    payload: results,
  };
};

/*-------------------------------ASSIGNACTION-------------------------*/

export const ASSIGNACTION = (message) => {
  return {
    type: ASSIGN_ACTION,
    payload: message,
  };
};

/*-------------------------------ASSIGNEMPINPUTS-------------------------*/

export const ASSIGNEMPINPUTS = (name, value) => {
  return {
    type: ASSIGNEMP_INPUTS,
    payload: { name, value },
  };
};

/*-------------------------------UPDATETASKINPUTS-------------------------*/

export const UPDATETASKINPUTS = (name, value) => {
  return {
    type: UPDATETASK_INPUTS,
    payload: { name, value },
  };
};

/*----------------------------------------------------------------------SHEET_DATA-------------------------------------------------------------*/

export const SHEETDATA = (results) => {
  return {
    type: SHEET_DATA,
    payload: results,
  };
};

/*----------------------------------------------------------------------EMPLOYEE-------------------------------------------------------------*/

export const STARTSTARTED = (message) => {
  return {
    type: START_STARTED,
    payload: message,
  };
};

export const STATUSES = (results) => {
  return {
    type: ALL_STATUSES,
    payload: results,
  };
};


export const ROLES = (results) => {
  return {
    type: EMP_ROLES,
    payload: results,
  };
};

export const UPDATEUSERROLE = (message) => {
  return {
    type: UPDATE_USER_ROLE,
    payload: message,
  };
};

