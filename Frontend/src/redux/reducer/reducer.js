import {
	GET_USERS,
	GET_USER_BY_ID,
	LOGIN,
	POST_USER,
	PUT_USER,
	DELETE_USER,
} from "../actions/userActions"
import {
	GET_PROJECTS,
	GET_PROJECT_BY_ID,
	GET_BEST_PROJECTS,
	POST_PROJECT,
	PUT_PROJECT,
	FILTER_PROJECT_BY_NAME,
} from "../actions/projectActions"
import { GET_VOTES } from "../actions/votesActions"
import { GET_CATEGORIES, FILTER_CATEGORIES } from "../actions/categoriesActions"
import {
	GET_SUBCATEGORIES,
	FILTER_SUBCATEGORIES,
} from "../actions/subcategoriesActions"

const initialState = {
	token: "",
	userLogin: {},
	userLogged: false,
	userRegister: {},
	users: [],
	userDetail: {},
	allProjects: [],
	projectsOnScreen: [],
	bestProjects: [],
	projectDetail: {},
	categories: [],
	subCategories: [],
	votes: [],
	newProject: [],
	updateUser: "",
}

const rootReducer = (state = initialState, action) => {
	let find
	let filtered
	let order
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			}
		case GET_USER_BY_ID:
			return {
				...state,
				userDetail: action.payload.userData,
			}
		case LOGIN:
			return {
				...state,
				userLogin: {
					id: action.payload.id,
					name: action.payload.name,
					type: action.payload.type,
					username: action.payload.username,
				},
				token: action.payload.tokenSession,
				userLogged: true,
			}
		case POST_USER:
			return {
				...state,
				userRegister: action.payload,
			}
		case PUT_USER:
			return {
				...state,
				updateUser: action.payload,
			}
		case DELETE_USER:
			return {
				...state,
				userLogin: {},
				userLogged: false,
				token: "",
			}
		// case GET_PROJECTS:
		// 	return {
		// 		...state,
		// 		projectsOnScreen: action.payload,
		// 		allProjects: action.payload,
		// 	}
		case GET_PROJECTS:
			return {
				...state,
				projectsOnScreen: [...action.payload, ...state.newProject],
				allProjects: [...action.payload, ...state.newProject],
			}
		// case GET_PROJECT_BY_ID:
		// 	return {
		// 		...state,
		// 		projectDetail: action.payload,
		// 	}
		case GET_PROJECT_BY_ID:
			find = state.allProjects.find((project) => {
				return project.entrepreneurshipId === action.payload
			})

			return {
				...state,
				projectDetail: find,
			}
		case GET_BEST_PROJECTS:
			order = action.payload.sort(
				(a, b) => b.votes.cant_positive - a.votes.cant_positive
			)
			return {
				...state,
				bestProjects: order.slice(0, 5),
			}
		case POST_PROJECT:
			return {
				...state,
				newProject: [...state.newProject, action.payload],
			}
		// case PUT_PROJECT:
		// 	return {
		// 		...state,
		// 		userDetail: action.payload,
		// 	}
		case PUT_PROJECT:
			return {
				...state,
				projectDetail: {
					...state.projectDetail,
					name: action.payload.name,
					description: action.payload.description,
					categoryId: action.payload.categoryId,
					subcategoryId: action.payload.subcategoryId,
					imageUrl: action.payload.imageUrl,
				},
			}
		case FILTER_PROJECT_BY_NAME:
			filtered = state.allProjects.filter((project) =>
				project.name.toLowerCase().includes(action.payload.toLowerCase())
			)
			return {
				...state,
				projectsOnScreen: filtered,
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
