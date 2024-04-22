// ! ESTE IMPORT NO VA CUANDO ESTE EL BACKEND
import categories from "../../assets/BDdemo/categories.json"

// import axios from "axios"

export const GET_CATEGORIES = "GET_CATEGORIES"

export const POST_CATEGORY = "POST_CATEGORY"

export const PUT_CATEGORY = "PUT_CATEGORY"

export const DELETE_CATEGORY = "DELETE_CATEGORY"

export const FILTER_CATEGORIES = "FILTER_CATEGORIES"

// const urlApi = "ACA VA LA URL API"

// ! LAS FUCIONES COMENTADAS SON LAS QUE VAN REALMENTE,
// ! LAS QUE ESTAN ABAJO DE CADA COMENTADA SON LAS DE PRUEBA

// * GET ----------------------------------------------------------------

// export const getCategories = () => {
// 	return async function (dispatch) {
// 		const response = await axios(`${urlApi}/categories`)

// 		return dispatch({
// 			type: GET_CATEGORIES,
// 			payload: response.data,
// 		})
// 	}
// }

export const getCategories = () => {
	return {
		type: GET_CATEGORIES,
		payload: categories,
	}
}

// * POST-------------------------------------------------------------

// export function addCategory(category) {
// 	return async function (dispatch) {
// 		const response = await axios.post(`${urlApi}/categories`, category)

// 		return dispatch({
// 			type: POST_CATEGORY,
// 			payload: response.data,
// 		})
// 	}
// }

export function addCategory(category) {
	return {
		type: POST_CATEGORY,
		payload: category,
	}
}

// * PUT-------------------------------------------------------------

// export function updateCategory(id, data) {
// 	return async function (dispatch) {
// 		const response = await axios.put(`${urlApi}/categories/${id}`, data)

// 		return dispatch({
// 			type: PUT_CATEGORY,
// 			payload: response.data,
// 		})
// 	}
// }

export function updateCategory(id, data) {
	return {
		type: PUT_CATEGORY,
		payload: { id, data },
	}
}

// * DELETE-------------------------------------------------------------

// export function deleteCategory(id) {
// 	return async function (dispatch) {
// 		const response = await axios.delete(`${urlApi}/categories/${id}`)

// 		return dispatch({
// 			type: DELETE_CATEGORY,
// 			payload: response.data,
// 		})
// 	}
// }

export function dedeleteCategoryleteUser(id) {
	return {
		type: DELETE_CATEGORY,
		payload: id,
	}
}

// * FILTER-------------------------------------------------------------

export const filterCategories = (category) => {
	return {
		type: FILTER_CATEGORIES,
		payload: category,
	}
}
