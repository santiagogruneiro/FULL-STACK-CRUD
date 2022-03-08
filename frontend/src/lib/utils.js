export const validateObjectFields = (obj) => {
    obj.__v &&  delete obj.__v
    let flag = true;
    const fields = Object.keys(obj)
    fields.forEach(field => {
        if (!obj[field]) {
            flag = false
        }
        if(!flag) return flag
    })
    return flag;
}


export const updateElement = (oldObj, newObj) => {
    const fields = Object.keys(oldObj)
    fields.forEach(field => {
        oldObj[field] = newObj[field]
    })
    return oldObj
}