// ! ESTE IMPORT NO VA CUANDO ESTE EL BACKEND
import entrepreneurships from "../../assets/BDdemo/entrepreneurships.json"

// import axios from "axios"

export const GET_PROJECTS = "GET_PROJECTS"
export const GET_PROJECT_BY_ID = "GET_PROJECT_BY_ID"
export const GET_BEST_PROJECTS = "GET_BEST_PROJECTS"

export const POST_PROJECT = "POST_PROJECT"

export const PUT_PROJECT = "PUT_PROJECT"

export const DELETE_PROJECT = "DELETE_PROJECT"

export const FILTER_PROJECT_BY_NAME = "FILTER_PROJECT_BY_NAME"

// const urlApi = "ACA VA LA URL API"

// ! LAS FUCIONES COMENTADAS SON LAS QUE VAN REALMENTE,
// ! LAS QUE ESTAN ABAJO DE CADA COMENTADA SON LAS DE PRUEBA

// * GET ----------------------------------------------------------------

// export const getProjects = () => {
// 	return async function (dispatch) {
// 		const response = await axios(`${urlApi}/entrepreneurships`)

// 		return dispatch({
// 			type: GET_PROJECTS,
// 			payload: response.data,
// 		})
// 	}
// }

export const getProjects = () => {
	return {
		type: GET_PROJECTS,
		payload: entrepreneurships,
	}
}

// export const getProjectById = (id) => {
// 	return async function (dispatch) {
// 		const response = await axios(`${urlApi}/entrepreneurships/${id}`)

// 		return dispatch({
// 			type: GET_PROJECT_BY_ID,
// 			payload: response.data,
// 		})
// 	}
// }

export const getProjectById = (id) => {
	return {
		type: GET_PROJECT_BY_ID,
		payload: id,
	}
}

export const getBestProjects = () => {
	return {
		type: GET_BEST_PROJECTS,
		payload: entrepreneurships,
	}
}

// * POST-------------------------------------------------------------

// export function addProject(newProject) {
// 	return async function (dispatch) {
// 		const response = await axios.post(
// 			`${urlApi}/entrepreneurships`,
// 			newProject
// 		)

// 		return dispatch({
// 			type: POST_PROJECT,
// 			payload: response.data,
// 		})
// 	}
// }

export function addProject(newProject) {
	return {
		type: POST_PROJECT,
		payload: newProject,
	}
}

// * PUT-------------------------------------------------------------

// export function updateProject(id, data) {
// 	return async function (dispatch) {
// 		const response = await axios.put(`${urlApi}/entrepreneurships/${id}`, data)

// 		return dispatch({
// 			type: PUT_PROJECT,
// 			payload: response.data,
// 		})
// 	}
// }

export function updateProject(id, data) {
	return {
		type: PUT_PROJECT,
		payload: { id, data },
	}
}

// * DELETE-------------------------------------------------------------

// export function deleteProject(id) {
// 	return async function (dispatch) {
// 		const response = await axios.delete(`${urlApi}/entrepreneurship/${id}`)

// 		return dispatch({
// 			type: DELETE_PROJECT,
// 			payload: response.data,
// 		})
// 	}
// }

export function deleteProject(id) {
	return {
		type: DELETE_PROJECT,
		payload: id,
	}
}

// * FILTER-------------------------------------------------------------

export function filterProjectByName(searchString) {
	return {
		type: FILTER_PROJECT_BY_NAME,
		payload: searchString,
	}
}
