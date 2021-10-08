import { indexOf } from "lodash";
import { CREATEPROJECT_INPUTS, SUCCESS_MSG, GETALL_PROJECTS, DELETE_PROJECT_INPUTS } from "../actions/Projects/Types";

const initialState = {
    allProjects: [],
    createProjectInputs: [],
    message: "",
    statusCode: 0,
    deleteProjectInputs: []

};

const ProjectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATEPROJECT_INPUTS:
            const name = action.payload.name;
            const value = action.payload.value;
            return {
                ...state,
                createProjectInputs: {
                    ...state.createProjectInputs,
                    [name]: value,
                },
            };
        case DELETE_PROJECT_INPUTS:
            const updatedArray = [...state.deleteProjectInputs];
            if (updatedArray.includes(action.payload.value)) {
                const indexValue = updatedArray.indexOf(action.payload.value);
                updatedArray.splice(indexValue, 1)
            }
            else {
                updatedArray.push(action.payload.value)
            }
            return { ...state, deleteProjectInputs: updatedArray };
        case GETALL_PROJECTS:
            return { ...state, allProjects: action.payload.value };
        case SUCCESS_MSG:
            return Object.assign({}, state, {
                message: action.payload.message,
                statusCode: action.payload.statusCode,

            });

        default:
            return state;
    }
};

export default ProjectsReducer;
