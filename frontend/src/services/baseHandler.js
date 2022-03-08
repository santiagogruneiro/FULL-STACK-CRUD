import axios from 'axios'

const findAll = async (url) => {
    return await axios.get(url)
        .then(handleResponse)
        .catch((err) => alert(err))
}
const findById = async (url) => {
    return await axios.get(url)
        .then(handleResponse)
        .catch(err => alert(err))
}
const create = async (url, body) => {
    return await axios.post(url, body).then(handleResponse)
        .catch(err => alert(err))
}
const update = async (url, body) => {
    return await axios.put(url, body)
        .then(handleResponse)
        .catch(err => alert(err))

}
const remove = async (url) => {
    return await axios.delete(url)
        .then(handleResponse)
        .catch(err => alert(err))
}


const handleResponse = (res) => {
    if (res.data.resource) return res.data.resource
    if(res.data.error){
        alert(res.data.error)
        return false
    }
    if(res.data) return res.data
}
export const baseHandler = { findAll, findById, remove, update, create }