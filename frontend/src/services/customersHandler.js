import { baseHandler } from "./baseHandler"
const baseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + '/customers/' : 'https://pacific-sands-09601.herokuapp.com/api' + '/customers/'


const findAll = async () => {
    return await baseHandler.findAll(baseUrl)
}

const findById = async (id) => {
    let url = baseUrl + id
    return await baseHandler.findById(url)
}

const create = async (body) => {
    return await baseHandler.create(baseUrl, body)
}

const remove = async (id) => {
    let url = baseUrl + id
    return await baseHandler.remove(url)
}

const update = async (id,body) => {
    let url = baseUrl + id
    return await baseHandler.update(url,body)
}


export const customersHandler = { findAll, findById, create, remove, update }