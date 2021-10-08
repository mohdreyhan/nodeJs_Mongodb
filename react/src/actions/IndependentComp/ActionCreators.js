// import { LOGINSUCCESS, LOGOUTSUCCESS, STATUSES } from "./Actions";
// import { SIGNUPSUCCESSERROR } from "../actions/Actions";
// import { TASKDETAILS, TASKADDEDSUCCESS } from "./Actions";
// import { USERSDATA, SHEETDATA } from "./Actions";
// import { ASSIGNACTION, STARTSTARTED } from "./Actions";
// import { ROLES, UPDATEUSERROLE } from "./Actions";
// import token from "../lib/token";

// let baseUrl = "http://localhost:3000";
// let xApiKey = "L75Ptr7TCv1p1jGM";

// /* --------------------- SIGN UP -------------------------------*/

// export const SIGNUP = (form, history, signupInputs) => async (dispatch) => {
//   let signupURL = `${baseUrl}/signup`;
//   const data = await fetch(signupURL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       signupInputs,
//     }),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.status === 200) {
//         dispatch(SIGNUPSUCCESSERROR(response.message));
//         history.replace("/");
//         setTimeout(() => {
//           dispatch(SIGNUPSUCCESSERROR(""));
//         }, 3000);
//       } else {
//         form.reset();
//         dispatch(SIGNUPSUCCESSERROR(response.message));
//         setTimeout(() => {
//           dispatch(SIGNUPSUCCESSERROR(""));
//         }, 5000);
//       }
//     });
// }

// /*---------------------------LOGIN-------------------------------*/

// export const USERLOGIN = (event, form, loginInputs, history) => async (dispatch) => {
//   event.preventDefault();
//   let userData = await fetch(`${baseUrl}/login`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(loginInputs),
//   });
//   const response = await userData.json();
//   if (response.results.tokenStatus) {
//     localStorage.setItem('userId', response.results._id);
//     localStorage.setItem('role', response.results.role);
//     history.replace("/dashboard");
//     form.reset();
//   }
//   dispatch(LOGINSUCCESS(response.message));
//   setTimeout(() => {
//     dispatch(LOGINSUCCESS(""));
//   }, 3000);
// };

// /*---------------------------LOGOUT-------------------------------*/

// export const USERLOGOUT = (emp_id, history) => async (dispatch) => {
//   const data = await fetch(`${baseUrl}/logout`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//     body: JSON.stringify({
//       emp_id: emp_id,
//     }),
//   })
//   const response = await data.json();
//   if (response.status === 200) {
//     localStorage.clear();
//     if (localStorage.length === 0) {
//       history.replace("/");
//       document.cookie = 'authtoken =' + ''
//     }
//     dispatch(LOGOUTSUCCESS(response.message));
//     setTimeout(() => {
//       dispatch(LOGOUTSUCCESS(""));
//     }, 3000);
//   }
// };

// /*---------------------------INSERT TASK-------------------------------*/

// export const INSERTTASKS = (sheet_name, form, task_data) => async (dispatch) => {
//   const data = await fetch(`${baseUrl}/addtask/inserttask`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//     body: JSON.stringify({
//       task_data,
//       sheet_name: sheet_name,
//       "authtoken": token.authtoken
//     }),
//   });
//   const response = await data.json();
//   if (response.status === 200) {
//     form.reset();
//     dispatch(TASKADDEDSUCCESS(response.message));
//   }
//   setTimeout(() => {
//     dispatch(TASKADDEDSUCCESS(" "));
//   }, 3000);
// };

// /*---------------------------Task Details-------------------------------*/

// export const FETCHTASKDETAILS = (id, emp_id) => (dispatch) => {
//   if (!id) {
//     return fetch(`${baseUrl}/fetchtasks/fetchtaskdetailsemp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "authtoken": token.authtoken
//       },
//       body: JSON.stringify({
//         emp_id: emp_id,
//       }),
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(TASKDETAILS(response.results));
//         }
//       });
//   } else {
//     return fetch(`${baseUrl}/fetchtasks/fetchtaskdetails`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "authtoken": token.authtoken
//       },
//       body: JSON.stringify({
//         id: id,
//       }),
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(TASKDETAILS(response.results));
//         }
//       });
//   }
// };

// /*---------------------------GET SHEET_DATA-------------------------------*/

// export const FETCHSHEETDATA = () => async (dispatch) => {
//   const data = await fetch(`${baseUrl}/fetchsheet/sheetdata`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//   })
//   const response = await data.json();
//       if (response.status === 200) {
//         dispatch(SHEETDATA(response.results));
//       }
// };

// /*---------------------------GET USERS-------------------------------*/

// export const FETCHUSERS = () => async (dispatch) => {
//   let fetchUsersURL = `${baseUrl}/fetchusers/users`;
//   const data = await fetch(fetchUsersURL, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//   });
//   const response = await data.json();
//   if (response.status === 200) {
//     dispatch(USERSDATA(response.results));
//   }
// };

// /*---------------------------ASSIGN EMP-------------------------------*/

// export const ASSIGNEMP = (assignemp_Inputs, event, form, task_id, task_name, sheet_id) => async (dispatch) => {
//       event.preventDefault();
//       const data = await fetch(`${baseUrl}/assign/assignemp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "authtoken": token.authtoken
//         },
//         body: JSON.stringify({ assignemp_Inputs, task_id, task_name, sheet_id }),
//       });
//       const response = await data.json();
//       if (response.status === 200) {
//         form.reset();
//         window.location.reload();
//         dispatch(ASSIGNACTION(response.message));
//       }
//     };

// /*---------------------------UPDATETASK-------------------------------*/

// export const UPDATETASK =
//   (updatetask_Inputs, event, form, task_id, sheet_id) => async (dispatch) => {
//     event.preventDefault();
//     const data = await fetch(`${baseUrl}/updateTicketDetails/updateEmpTask`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "authtoken": token.authtoken
//       },
//       body: JSON.stringify({ updatetask_Inputs, task_id, sheet_id }),
//     });
//     const response = await data.json();
//     if (response.status === 200) {
//       // form.reset();
//       window.location.reload();
//       // dispatch(ASSIGNACTION(response.message));
//     }
//   };

// /*---------------------------STARTTASK-------------------------------*/

// export const STARTTASK = (task_id) => async (dispatch) => {
//   const data = await fetch(`${baseUrl}/starttask`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//     body: JSON.stringify({ task_id: task_id }),
//   });
//   const response = await data.json();
//   if (response.status === 200) {
//     dispatch(STARTSTARTED(response.message));
//   }
// };

// export const FETCHSTATUS = (task_id) => async (dispatch) => {
//   const data = await fetch(`${baseUrl}/api/status`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//   });
//   const response = await data.json();
//   if (response.status === 200) {
//     dispatch(STATUSES(response.results));
//   }
// };

// export const FETCHROLES = () => async (dispatch) => {
//   const data = await fetch(`${baseUrl}/api/roles`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//   });
//   const response = await data.json();
//   if (response.status == 200) {
//     dispatch(ROLES(response.results));
//   }
// };

// export const USERROLE =
//   (event, form, updateUserInputs, user_id, handleUpdateUser, showUpdateModal) => async (dispatch) => {
//     event.preventDefault();
//     const data = fetch(`${baseUrl}/api/user/${user_id}/updateRole`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "authtoken": token.authtoken
//       },
//       body: JSON.stringify(updateUserInputs),
//     });
//     const response = await data.json();
//     if (response.status == 200) {
//       form.reset();
//       handleUpdateUser(0, !showUpdateModal);
//       dispatch(UPDATEUSERROLE(response.message));
//     }
//   };
