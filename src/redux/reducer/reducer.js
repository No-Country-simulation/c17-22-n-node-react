import {
	GET_USERS,
	GET_PROJECTS,
	GET_CATEGORIES,
	GET_SUBCATEGORIES,
	GET_VOTES,
	FILTER_CATEGORIES,
	FILTER_SUBCATEGORIES,
	POST_PROJECT,
} from "../actions/actions"

const initialState = {
	users: [],
	projectsOnScreen: [],
	allProjects: [],
	categories: [],
	subCategories: [],
	votes: [],
	newProject: [],
}

const rootReducer = (state = initialState, action) => {
	let filtered
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			}
		case GET_PROJECTS:
			return {
				...state,
				projectsOnScreen: [action.payload, ...state.newProject],
				allProjects: [action.payload, ...state.newProject],
			}
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			}
		case GET_SUBCATEGORIES:
			return {
				...state,
				subCategories: action.payload,
			}
		case GET_VOTES:
			return {
				...state,
				votes: action.payload,
			}
		case FILTER_CATEGORIES:
			filtered = state.allProjects.filter((project) => {
				return project.categoryId === action.payload
			})

			return {
				...state,
				projectsOnScreen: filtered,
			}
		case FILTER_SUBCATEGORIES:
			filtered = state.allProjects.filter((project) => {
				return (
					project.categoryId == action.payload.category.category &&
					project.subcategoryId == action.payload.category.subCategory
				)
			})

			return {
				...state,
				projectsOnScreen: filtered,
			}
		case POST_PROJECT:
			return {
				...state,
				newProject: [...state.newProject, action.payload],
			}
		default:
			return state
	}
}

export default rootReducer
