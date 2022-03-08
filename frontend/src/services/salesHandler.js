import { baseHandler } from "./baseHandler"

const baseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + '/sales/' : 'https://pacific-sands-09601.herokuapp.com/api' + '/sales/'


const findAll = async () => {
    return await baseHandler.findAll(baseUrl)
}

const findById = async (id) => {
    let url = baseUrl + 'user/' + id
    return await baseHandler.findById(url)
}

const create = async (body) => {
    return await baseHandler.create(baseUrl, body)
}

const remove = async (id) => {
    let url = baseUrl + id
    return await baseHandler.remove(url)
}



export const salesHandler = { findAll, findById, create, remove }