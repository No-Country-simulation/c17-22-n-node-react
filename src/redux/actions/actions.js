// import axios from "axios"

// ESTOS IMPORTS (DE ACA ABAJO HASTA LA LINEA COMENTADA) 
//NO IRIAN CUANDO TENGAMOS LOS ENDPOINTS DEL BACKEND
import { categories } from "../../assets/BDdemo/categories"
import { projects } from "../../assets/BDdemo/projects"
import { subCategories } from "../../assets/BDdemo/subcategories"

//---------------------------------------------------------------------------------

export const GET_PROJECTS = "GET_PROJECTS"
export const GET_CATEGORIES = "GET_CATEGORIES"
export const GET_SUBCATEGORIES = "GET_SUBCATEGORIES"
export const FILTER_CATEGORIES = "FILTER_CATEGORIES"
export const FILTER_SUBCATEGORIES = "FILTER_SUBCATEGORIES"



// !! LAS FUCIONES COMENTADAS (DE ACA ABAJO HASTA LA LINEA COMENTADA) 
// SON LAS QUE VAN REALMENTE, LAS OTRAS SON LAS DE PRUEBA

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
        payload: projects
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
        payload: categories
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
        payload: subCategories
    }
}
//---------------------------------------------------------------------------------

export const filterCatgories = (category) => {
    return {
        type: FILTER_CATEGORIES,
        payload: category
    }
}

export const filterSubCatgories = (category, subCategory) => {
    return {
        type: FILTER_SUBCATEGORIES,
        payload: {category, subCategory}
    }
}