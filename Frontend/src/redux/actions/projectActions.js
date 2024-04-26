import axios from "axios"

export const GET_PROJECTS = "GET_PROJECTS"
export const GET_PROJECT_BY_ID = "GET_PROJECT_BY_ID"
export const GET_BEST_PROJECTS = "GET_BEST_PROJECTS"
export const GET_LIKED_PROJECTS = "GET_LIKED_PROJECTS"

export const POST_PROJECT = "POST_PROJECT"

export const PUT_PROJECT = "PUT_PROJECT"

export const DELETE_PROJECT = "DELETE_PROJECT"

export const FILTER_PROJECT_BY_NAME = "FILTER_PROJECT_BY_NAME"

const urlApi = "https://c17-22-n-node-react-9h8n.onrender.com"

// * GET ----------------------------------------------------------------

export const getProjects = () => {
	return async function (dispatch) {
		try {
			const response = await axios(`${urlApi}/entrepreneurships`)

			return dispatch({
				type: GET_PROJECTS,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

export const getProjectById = (id) => {
	return async function (dispatch) {
		try {
			const response = await axios(`${urlApi}/entrepreneurships/${id}`)

			return dispatch({
				type: GET_PROJECT_BY_ID,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

export const getBestProjects = () => {
	return {
		type: GET_BEST_PROJECTS,
	}
}

export const getLikedProjects = (id) => {
	return async function (dispatch) {
		try {
			const response = await axios(`${urlApi}/users/${id}/vote`)

			return dispatch({
				type: GET_LIKED_PROJECTS,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

// * POST-------------------------------------------------------------

export function addProject(newProject, token) {
	return async function (dispatch) {
		try {
			const response = await axios.post(
				`${urlApi}/entrepreneurships`,
				newProject,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			return dispatch({
				type: POST_PROJECT,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

// * PUT-------------------------------------------------------------

export function updateProject(id, data, token) {
	return async function (dispatch) {
		try {
			const response = await axios.put(
				`${urlApi}/entrepreneurships/${id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			return dispatch({
				type: PUT_PROJECT,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

// * DELETE-------------------------------------------------------------

export function deleteProject(id, token) {
	return async function (dispatch) {
		try {
			const response = await axios.delete(`${urlApi}/entrepreneurship/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return dispatch({
				type: DELETE_PROJECT,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

// * FILTER-------------------------------------------------------------

export function filterProjectByName(searchString) {
	return {
		type: FILTER_PROJECT_BY_NAME,
		payload: searchString,
	}
}
