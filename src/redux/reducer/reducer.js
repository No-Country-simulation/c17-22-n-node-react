import{ GET_CATEGORIES, GET_PROJECTS, GET_SUBCATEGORIES, FILTER_CATEGORIES, FILTER_SUBCATEGORIES } from "../actions/actions"

const initialState = {
    projectsOnScreen: [],
    allProjects: [],
    categories: [],
    subCategories: []
}

const rootReducer = (state = initialState, action) => {
    let filtered
    switch (action.type) {
        case GET_PROJECTS:
            return{
                ...state,
                projectsOnScreen: action.payload,
                allProjects: action.payload
            }
        case GET_CATEGORIES:
            return{
                ...state,
                categories: action.payload
            }
            case GET_SUBCATEGORIES:
                return{
                    ...state,
                    subCategories: action.payload
                }
            case FILTER_CATEGORIES:
                filtered = state.allProjects.filter((project) => {
                    return project.category === action.payload
                })
                
                return{
                    ...state,
                    projectsOnScreen: filtered
                }
                case FILTER_SUBCATEGORIES:
                    filtered = state.allProjects.filter((project) => {
                        return project.category == action.payload.category.category && project.subCategory == action.payload.category.subCategory
                    })
                    
                    return{
                        ...state,
                        projectsOnScreen: filtered
                    }
        default:
            return state
    }
}

export default rootReducer