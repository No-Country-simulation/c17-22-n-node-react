// ! ESTE IMPORT NO VA CUANDO ESTE EL BACKEND
import users from "../../assets/BDdemo/users.json"

// import axios from "axios"

export const GET_USERS = "GET_USERS"
export const GET_USER_BY_ID = "GET_USER_BY_ID"

export const LOGIN = "LOGIN"
export const POST_USER = "POST_USER"

export const PUT_USER = "PUT_USER"

export const DELETE_MY_USER = "DELETE_USER"

// const urlApi = "ACA VA LA URL API"

// ! LAS FUCIONES COMENTADAS SON LAS QUE VAN REALMENTE,
// ! LAS QUE ESTAN ABAJO DE CADA COMENTADA SON LAS DE PRUEBA

// * GET ----------------------------------------------------------------

// export const getUsers = () => {
// 	return async function (dispatch) {
// 		const response = await axios(`${urlApi}/users`)

// 		return dispatch({
// 			type: GET_USERS,
// 			payload: response.data,
// 		})
// 	}
// }

export const getUsers = () => {
	return {
		type: GET_USERS,
		payload: users,
	}
}

// export const getUserById = (id) => {
// 	return async function (dispatch) {
// 		const response = await axios(`${urlApi}/users/${id}`)

// 		return dispatch({
// 			type: GET_USER_BY_ID,
// 			payload: response.data,
// 		})
// 	}
// }

export const getUserById = (id) => {
	return {
		type: GET_USER_BY_ID,
		payload: id,
	}
}

// * POST-------------------------------------------------------------

// export function login(user) {
// 	return async function (dispatch) {
// 		const response = await axios.post(`${urlApi}/login`, user)

// 		return dispatch({
// 			type: LOGIN,
// 			payload: response.data,
// 		})
// 	}
// }

export function login(user) {
	return {
		type: LOGIN,
		payload: user,
	}
}

// export function addUser(user) {
// 	return async function (dispatch) {
// 		const response = await axios.post(`${urlApi}/signup`, user)

// 		return dispatch({
// 			type: POST_USER,
// 			payload: response.data,
// 		})
// 	}
// }

export function addUser(user) {
	return {
		type: POST_USER,
		payload: user,
	}
}

// * PUT-------------------------------------------------------------

// export function updateUser(id, data) {
// 	return async function (dispatch) {
// 		const response = await axios.put(`${urlApi}/users/${id}`, data)

// 		return dispatch({
// 			type: PUT_USER,
// 			payload: response.data,
// 		})
// 	}
// }

export function updateUser(data) {
	return {
		type: PUT_USER,
		payload: data,
	}
}

// * DELETE-------------------------------------------------------------

// export function deleteUser(id) {
// 	return async function (dispatch) {
// 		const response = await axios.delete(`${urlApi}/users/${id}`)

// 		return dispatch({
// 			type: DELETE_USER,
// 			payload: response.data,
// 		})
// 	}
// }

export function deleteUser(id) {
	return {
		type: DELETE_MY_USER,
		payload: id,
	}
}
