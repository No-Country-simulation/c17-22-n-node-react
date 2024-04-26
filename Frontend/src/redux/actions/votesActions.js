// ! ESTE IMPORT NO VA CUANDO ESTE EL BACKEND
import votes from "../../assets/BDdemo/votes.json"

// import axios from "axios"

export const GET_VOTES = "GET_VOTES"
export const GET_VOTES_BY_ID = "GET_VOTES_BY_ID"

export const POST_VOTE = "POST_VOTE"

// export const DELETE_VOTES = "DELETE_VOTES"
// export const DELETE_VOTE = "DELETE_VOTE"

// const urlApi = "ACA VA LA URL API"

// ! LAS FUCIONES COMENTADAS SON LAS QUE VAN REALMENTE,
// ! LAS QUE ESTAN ABAJO DE CADA COMENTADA SON LAS DE PRUEBA

// * GET ----------------------------------------------------------------
// ! TODAVIA NO TENGO RUTA
// export const getVotes = () => {
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

// export const getVotesById = (id) => {
// 	return async function (dispatch) {
// 		const response = await axios(`${urlApi}/entrepreneurships/${id}/vote`)

// 		return dispatch({
// 			type: GET_VOTES_BY_ID,
// 			payload: response.data,
// 		})
// 	}
// }

export const getVotesById = () => {
	return {
		type: GET_VOTES_BY_ID,
		payload: votes,
	}
}

// * POST-------------------------------------------------------------

// export function addVotes(vote) {
// 	return async function (dispatch) {
// 		const response = await axios.post(
// 			`${urlApi}/entrepreneurships/${vote}/vote`,
// 			newProject
// 		)

// 		return dispatch({
// 			type: POST_VOTE,
// 			payload: response.data,
// 		})
// 	}
// }

export function addVotes(vote) {
	return {
		type: POST_VOTE,
		payload: vote,
	}
}

// * DELETE-------------------------------------------------------------

// export function deleteVote(id) {
// 	return async function (dispatch) {
// 		const response = await axios.delete(`${urlApi}/subcategories/${id}`)

// 		return dispatch({
// 			type: DELETE_SUBCATEGORY,
// 			payload: response.data,
// 		})
// 	}
// }

// export function deleteSubcategory(id) {
// 	return {
// 		type: DELETE_SUBCATEGORY,
// 		payload: id,
// 	}
// }
