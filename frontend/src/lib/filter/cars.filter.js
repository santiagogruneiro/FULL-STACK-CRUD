export const filterByLicensePlate = (data,licensePlate,available=false) => {
    let cars = [...data]
    if(available) cars = availableCars(data)
    return cars.filter(car=>car.licensePlate.includes(licensePlate))
}

const availableCars = (cars) => {
    return cars.filter(e=>e.status === 'Available')
}