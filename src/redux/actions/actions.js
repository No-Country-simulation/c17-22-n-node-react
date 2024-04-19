// import axios from "axios"

// ESTOS IMPORTS (DE ACA ABAJO HASTA LA LINEA COMENTADA)
//NO IRIAN CUANDO TENGAMOS LOS ENDPOINTS DEL BACKEND
import users from "../../assets/BDdemo/users.json"
import categories from "../../assets/BDdemo/categories.json"
import entrepreneurships from "../../assets/BDdemo/entrepreneurships.json"
import subCategories from "../../assets/BDdemo/subcategories.json"
import votes from "../../assets/BDdemo/votes.json"

//---------------------------------------------------------------------------------

export const GET_USERS = "GET_USERS"
export const GET_PROJECTS = "GET_PROJECTS"
export const GET_CATEGORIES = "GET_CATEGORIES"
export const GET_SUBCATEGORIES = "GET_SUBCATEGORIES"
export const GET_VOTES = "GET_VOTES"
export const FILTER_CATEGORIES = "FILTER_CATEGORIES"
export const FILTER_SUBCATEGORIES = "FILTER_SUBCATEGORIES"
export const POST_PROJECT = "POST_PROJECT"

// !! LAS FUCIONES COMENTADAS (DE ACA ABAJO HASTA LA LINEA COMENTADA)
// SON LAS QUE VAN REALMENTE, LAS OTRAS SON LAS DE PRUEBA

// export const getUsers = () => {
//     return async function(dispatch){
//         const response = await axios("ACA IRÍA LA URL DE LA API")

//         return dispatch({
//             type: GET_USERS,
//             payload: response.data
//         })
//     }
// }

export const getUsers = () => {
	return {
		type: GET_USERS,
		payload: users,
	}
}

// export const getProjects = () => {
//     return async function(dispatch){
//         const response = await axios("ACA IRÍA LA URL DE LA API")

//         return dispatch({
//             type: GET_PROJECTS,
//             payload: response.data
//         })
//     }
// }

export const getProjects = () => {
	return {
		type: GET_PROJECTS,
		payload: entrepreneurships,
	}
}

// export const getCategories = () => {
//     return async function(dispatch){
//         const response = await axios("ACA IRÍA LA URL DE LA API")

//         return dispatch({
//             type: GET_CATEGORIES,
//             payload: response.data
//         })
//     }
// }

export const getCategories = () => {
	return {
		type: GET_CATEGORIES,
		payload: categories,
	}
}

// export const getSubCategories = () => {
//     return async function(dispatch){
//         const response = await axios("ACA IRÍA LA URL DE LA API")

//         return dispatch({
//             type: GET_CATEGORIES,
//             payload: response.data
//         })
//     }
// }

export const getSubCategories = () => {
	return {
		type: GET_SUBCATEGORIES,
		payload: subCategories,
	}
}

// export const getSubCategories = () => {
//     return async function(dispatch){
//         const response = await axios("ACA IRÍA LA URL DE LA API")

//         return dispatch({
//             type: GET_VOTES,
//             payload: response.data
//         })
//     }
// }

export const getVotes = () => {
	return {
		type: GET_VOTES,
		payload: votes,
	}
}

// export function postProject(newProject) {
// 	return async function (dispatch) {
// 		const response = await axios.post(
// 			"http://localhost:3001/recipes",
// 			newProject
// 		)

// 		return dispatch({
// 			type: POST_PROJECT,
// 			payload: response.data,
// 		})
// 	}
// }

export function postProject(newProject) {
	return {
		type: POST_PROJECT,
		payload: newProject,
	}
}

//---------------------------------------------------------------------------------

export const filterCatgories = (category) => {
	return {
		type: FILTER_CATEGORIES,
		payload: category,
	}
}

export const filterSubCatgories = (category, subCategory) => {
	return {
		type: FILTER_SUBCATEGORIES,
		payload: { category, subCategory },
	}
}
