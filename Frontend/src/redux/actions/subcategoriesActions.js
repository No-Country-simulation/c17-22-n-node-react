// ! ESTE IMPORT NO VA CUANDO ESTE EL BACKEND
// import subCategories from "../../assets/BDdemo/subcategories.json"

import axios from "axios"

export const GET_SUBCATEGORIES = "GET_SUBCATEGORIES"

export const POST_SUBCATEGORY = "POST_SUBCATEGORY"

export const PUT_SUBCATEGORY = "PUT_SUBCATEGORY"

export const DELETE_SUBCATEGORY = "DELETE_SUBCATEGORY"

export const FILTER_SUBCATEGORIES = "FILTER_SUBCATEGORIES"

const urlApi = "https://c17-22-n-node-react-9h8n.onrender.com"

// ! LAS FUCIONES COMENTADAS SON LAS QUE VAN REALMENTE,
// ! LAS QUE ESTAN ABAJO DE CADA COMENTADA SON LAS DE PRUEBA

// * GET ----------------------------------------------------------------

export const getSubcategories = () => {
	return async function (dispatch) {
		try {
			const response = await axios(`${urlApi}/subcategories`)
			return dispatch({
				type: GET_SUBCATEGORIES,
				payload: response.data,
			})
		} catch (error) {
			console.error("Error al realizar la solicitud:", error)
		}
	}
}

// export const getSubcategories = () => {
// 	return {
// 		type: GET_SUBCATEGORIES,
// 		payload: subCategories,
// 	}
// }

// * POST-------------------------------------------------------------

// export function addSubcategory(subcategory) {
// 	return async function (dispatch) {
// 		const response = await axios.post(`${urlApi}/subcategory`, subcategory)

// 		return dispatch({
// 			type: POST_SUBCATEGORY,
// 			payload: response.data,
// 		})
// 	}
// }

export function addSubcategory(subcategory) {
	return {
		type: POST_SUBCATEGORY,
		payload: subcategory,
	}
}

// * PUT-------------------------------------------------------------

// export function updateSubcategory(id, data) {
// 	return async function (dispatch) {
// 		const response = await axios.put(`${urlApi}/subcategories/${id}`, data)

// 		return dispatch({
// 			type: PUT_SUBCATEGORY,
// 			payload: response.data,
// 		})
// 	}
// }

export function updateSubcategory(id, data) {
	return {
		type: PUT_SUBCATEGORY,
		payload: { id, data },
	}
}

// * DELETE-------------------------------------------------------------

// export function deleteSubcategory(id) {
// 	return async function (dispatch) {
// 		const response = await axios.delete(`${urlApi}/subcategories/${id}`)

// 		return dispatch({
// 			type: DELETE_SUBCATEGORY,
// 			payload: response.data,
// 		})
// 	}
// }

export function deleteSubcategory(id) {
	return {
		type: DELETE_SUBCATEGORY,
		payload: id,
	}
}

// * FILTER-------------------------------------------------------------

export const filterSubcategories = (category, subCategory) => {
	return {
		type: FILTER_SUBCATEGORIES,
		payload: { category, subCategory },
	}
}
