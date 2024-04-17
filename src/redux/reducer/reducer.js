import {
	GET_USERS,
	GET_PROJECTS,
	GET_CATEGORIES,
	GET_SUBCATEGORIES,
	GET_VOTES,
	FILTER_CATEGORIES,
	FILTER_SUBCATEGORIES,
} from "../actions/actions"

const initialState = {
	users: [],
	projectsOnScreen: [],
	allProjects: [],
	categories: [],
	subCategories: [],
	votes: [],
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
				projectsOnScreen: action.payload,
				allProjects: action.payload,
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
		default:
			return state
	}
}

export default rootReducer
