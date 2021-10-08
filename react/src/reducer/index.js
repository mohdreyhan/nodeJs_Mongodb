import { combineReducers } from "redux";
import LoginReducer from "../reducer/LoginReducer.js";
import EmployeeReducer from "../reducer/EmployeeReducer.js";
import ManagerReducer from "../reducer/ManagerReducer.js";
import SignupReducer from "../reducer/SignupReducer.js";
import ProjectsReducer from "../reducer/ProjectsReducer.js";
import IndependentComp from "./IndependentComp/IndependentComp";  


export default combineReducers({
  LoginReducer: LoginReducer,
  EmployeeReducer: EmployeeReducer,
  ManagerReducer: ManagerReducer,
  SignupReducer: SignupReducer,
  ProjectsReducer: ProjectsReducer,
  IndependentComp: IndependentComp
});
