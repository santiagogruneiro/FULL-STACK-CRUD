export const filterByName = (data,value) => {
    return data.filter(e=>e.firstName.toLowerCase().includes(value) || e.lastName.toLowerCase().includes(value))
}