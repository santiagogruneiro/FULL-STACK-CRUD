const CarsModel = require('../models/cars.model')
const { getModelReadyToUpdate } = require('../lib/utils')
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/cars.model')


exports.findAll = async () => {
    try {
        return await CarsModel.find().exec()
    } catch (err) {
        throw err
    }
}

exports.findById = async (id) => {
    try {
        return await CarsModel.findById(id).exec()
    } catch (error) {
        throw error
    }
}

exports.createCar = async (car) => {
    try {
        const newCar = new CarsModel({ ...car,status:'Available' })
        return await newCar.save()
    } catch (error) {
        throw error
    }
}

exports.updateCar = async (id, car) => {
    try {
        const carUpdated = await CarsModel.findByIdAndUpdate(id, car, { new: true })
        if (!carUpdated) throw new Error(`Couldn't find a car with the id ${id}`)
        return carUpdated
    } catch (error) {
        throw error;
    }
}

exports.deleteCar = async (id) => {
    try {
        const carToDelete = await CarsModel.findById(id)
        if (carToDelete.status === 'Sold') return { error: "Can't delete the car since it has a reference in other model" }
        const deletedCar = CarsModel.findOneAndDelete({ _id: id }, { new: true })
        if (!deletedCar) throw new Error(`Couldn't find a car with the id ${id}`)
        return deletedCar
    } catch (error) {
        throw error
    }
}


