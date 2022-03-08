const { findAll, findById, createCar, updateCar, deleteCar } = require('../services/cars.service')


exports.findAll = async (req, res, next) => {
    try {
        const cars = await findAll()
        res.status(200).send(cars)
    } catch (error) {
        next(error)
    }
}

exports.findById = async (req, res, next) => {
    try {
        const { id } = req.params
        const car = await findById(id)
        res.status(200).send(car)
    } catch (error) {
        next(error)
    }
}

exports.createCar = async (req, res, next) => {
    try {
        const { body } = req
        const newCar = await createCar(body)
        const response = { message: 'Resource created successfully', resource: newCar }
        res.status(201).send(response)
    } catch (error) {
        next(error)
    }
}

exports.updateCar = async (req, res, next) => {
    try {
        const { body, params: { id } } = req
        const carUpdated = await updateCar(id, body)
        res.status(200).send({ message: 'Resource updated succesfully', resource: carUpdated })
    } catch (error) {
        next(error)
    }
}

exports.deleteCar = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedCar = await deleteCar(id)
        if(deletedCar.error) res.status(200).send({error:deletedCar.error})
        res.status(200).send({ message: 'Resource deleted successfully', resource:deletedCar })
    } catch (error) {
        next(error)
    }
}