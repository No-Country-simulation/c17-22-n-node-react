import{ GET_PROJECTS } from "../actions/actions"

const initialState = {
    allProjects: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return{
                ...state,
                allProjects: action.payload
            }
        default:
            return state
    }
}

export default rootReducer