import { SHOW_SPINNER } from "./Types.js";

/*------------------------------- SIGN UP --------------------------------------------*/

export const SPINNER = (value) => {
  return {
    type: SHOW_SPINNER,
    payload: { value },
  };
};
