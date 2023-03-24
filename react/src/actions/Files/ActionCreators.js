import token from "../../lib/token";
import { GETALLFILES, UPLOADFILE, DELETEFILE, SUCCESSMSG } from "./Actions";

let baseUrl = "http://localhost:3000";
let xApiKey = "L75Ptr7TCv1p1jGM";

/* --------------------- CREATE PROJECT -------------------------------*/

export const FILETOS3 = (fileData, form) => async (dispatch) => {
  const data = await fetch(`${baseUrl}/api/files/upload`, {
    method: "POST",
    headers: {
      "authtoken": token.authtoken
    },
    body: fileData
  });
  const response = await data.json();
  if (data.status === 200) {
    form.reset();
    await dispatch(FILESFROMS3());
    await dispatch(SUCCESSMSG(response.message, data.status));
    setTimeout(async () => {
      await dispatch(SUCCESSMSG(""))
    }, 3000);
  }
  else {
    await dispatch(SUCCESSMSG(response.message));
    setTimeout(async () => {
      await dispatch(SUCCESSMSG(""))
    }, 3000);
  }
}

/* --------------------- GET ALL FILES -------------------------------*/

export const FILESFROMS3 = (userId) => async (dispatch) => {
  const data = await fetch(`${baseUrl}/api/files`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authtoken": token.authtoken
    },
  });
  const response = await data.json();
  if (data.status === 200) {
    await dispatch(GETALLFILES(response.result));
    await dispatch(SUCCESSMSG(response.message));
    setTimeout(async () => {
      await dispatch(SUCCESSMSG(""))
    }, 3000);
  }
  else {
    await dispatch(SUCCESSMSG(response.message));
    setTimeout(async () => {
      await dispatch(SUCCESSMSG(""))
    }, 3000);
  }
}

// /* --------------------- DELETE -------------------------------*/

// export const DELETEFROMS3 = (userId, deleteProjectInputs, projects) => async (dispatch) => {
//   const data = await fetch(`${baseUrl}/api/projects/${deleteProjectInputs}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//     body: JSON.stringify({ userId })
//   });
//   const response = await data.json();
//   if (data.status === 200) {
//     const updatedProjectsArray= projects.filter((value, index) => {
//      return value._id !== deleteProjectInputs
//     })
//     await dispatch(GETALLPROJECTS(updatedProjectsArray))
//     await dispatch(DELETEPROJECTINPUTS(deleteProjectInputs))
//     await dispatch(SUCCESSMSG(response.message));
//     setTimeout(async () => {
//       await dispatch(SUCCESSMSG(""))
//     }, 3000);
//   }
//   else {
//     await dispatch(SUCCESSMSG(response.message));
//     setTimeout(async () => {
//       await dispatch(SUCCESSMSG(""))
//     }, 3000);
//   }
// }

// /* --------------------- DELETE MANY -------------------------------*/

// export const DELETEPROJECTS = (userId, projectIds) => async (dispatch) => {
//   const data = await fetch(`${baseUrl}/api/projects/multiple`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "authtoken": token.authtoken
//     },
//     body: {
//       projectIds: JSON.stringify({ projectIds, userId })
//     }
//   });
//   const response = await data.json();
//   if (data.status === 200) {
//     await dispatch(SUCCESSMSG(response.message));
//     setTimeout(async () => {
//       await dispatch(SUCCESSMSG(""))
//     }, 3000);
//   }
//   else {
//     await dispatch(SUCCESSMSG(response.message));
//     setTimeout(async () => {
//       await dispatch(SUCCESSMSG(""))
//     }, 3000);
//   }
// }