import axios from "axios"

export const GET_USERS = "GET_USERS"
export const GET_USER_BY_ID = "GET_USER_BY_ID"

export const LOGIN = "LOGIN"
export const POST_USER = "POST_USER"

export const PUT_USER = "PUT_USER"

export const DELETE_USER = "DELETE_USER"

const urlApi = "https://c17-22-n-node-react-9h8n.onrender.com"

// * GET ----------------------------------------------------------------

export const getUsers = () => {
	return async function (dispatch) {
		try {
			const response = await axios(`${urlApi}/users`)

			return dispatch({
				type: GET_USERS,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

export const getUserById = (id) => {
	return async function (dispatch) {
		try {
			const response = await axios(`${urlApi}/users/${id}`)

			return dispatch({
				type: GET_USER_BY_ID,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

// * POST-------------------------------------------------------------

export function login(user) {
	return async function (dispatch) {
		try {
			const response = await axios.post(`${urlApi}/login`, user)

			return dispatch({
				type: LOGIN,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

export function addUser(user) {
	return async function (dispatch) {
		try {
			const response = await axios.post(`${urlApi}/register`, user)

			return dispatch({
				type: POST_USER,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

// * PUT-------------------------------------------------------------

export function updateUser(id, data, token) {
	return async function (dispatch) {
		try {
			const response = await axios.put(`${urlApi}/users/${id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return dispatch({
				type: PUT_USER,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

// * DELETE-------------------------------------------------------------

export function deleteUser(id, token) {
	return async function (dispatch) {
		try {
			const response = await axios.delete(`${urlApi}/users/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			return dispatch({
				type: DELETE_USER,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}
