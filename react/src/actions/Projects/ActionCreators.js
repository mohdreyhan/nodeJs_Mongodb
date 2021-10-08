import token from "../../lib/token";
import { SUCCESSMSG, GETALLPROJECTS, DELETEPROJECTINPUTS } from "./Actions";

let baseUrl = "http://localhost:3000";
let xApiKey = "L75Ptr7TCv1p1jGM";

/* --------------------- CREATE PROJECT -------------------------------*/

export const CREATEPROJECT = (event, form, createProjInputs) => async (dispatch) => {
  event.preventDefault();
  const data = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authtoken": token.authtoken
    },
    body: JSON.stringify({
      createProjInputs,
    }),
  });
  const response = await data.json();
  if (data.status === 200) {
    form.reset();
    await dispatch(PROJECTS());
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

/* --------------------- GET ALL PROJECTS -------------------------------*/

export const PROJECTS = (userId) => async (dispatch) => {
  const data = await fetch(`${baseUrl}/api/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authtoken": token.authtoken
    },
  });
  const response = await data.json();
  if (data.status === 200) {
    await dispatch(GETALLPROJECTS(response.result));
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

/* --------------------- DELETE -------------------------------*/

export const DELETEPROJECT = (userId, deleteProjectInputs, projects) => async (dispatch) => {
  const data = await fetch(`${baseUrl}/api/projects/${deleteProjectInputs}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authtoken": token.authtoken
    },
    body: JSON.stringify({ userId })
  });
  const response = await data.json();
  if (data.status === 200) {
    const updatedProjectsArray= projects.filter((value, index) => {
     return value._id !== deleteProjectInputs
    })
    await dispatch(GETALLPROJECTS(updatedProjectsArray))
    await dispatch(DELETEPROJECTINPUTS(deleteProjectInputs))
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

/* --------------------- DELETE MANY -------------------------------*/

export const DELETEPROJECTS = (userId, projectIds) => async (dispatch) => {
  const data = await fetch(`${baseUrl}/api/projects/multiple`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authtoken": token.authtoken
    },
    body: {
      projectIds: JSON.stringify({ projectIds, userId })
    }
  });
  const response = await data.json();
  if (data.status === 200) {
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