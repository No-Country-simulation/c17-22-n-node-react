import axios from "axios"

export const GET_PROJECTS = "GET_PROJECTS"

export const getProjects = () => {
    return async function(dispatch){
        const response = await axios("ACA IRÍA LA URL DE LA API")

        return dispatch({
            tipe: GET_PROJECTS,
            payload: response.data
        })
    }
}