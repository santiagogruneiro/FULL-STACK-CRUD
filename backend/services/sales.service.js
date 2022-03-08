const SalesModel = require('../models/sales.model')
const CustomersService = require('./customers.service')
const CarsService = require('./cars.service')

exports.findAll = async () => {
    try {
        return await SalesModel.find().populate('customer').populate('car').exec()
    } catch (error) {
        throw error
    }
}

exports.findByUserId = async (id) => {
    try {
        return await SalesModel.find({ customer: id }).populate('customer').populate('car').exec()
    } catch (error) {
        throw error
    }
}

exports.createSale = async (sale) => {
    try {
        let date = new Date()
        let saleDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear().toString().slice(2, 4)}`
        const carToPush = await CarsService.findById(sale.car)
        const customerToPush = await CustomersService.findById(sale.customer)
        if (!carToPush || !customerToPush) return { error: 'Car or customer not found' }
        if (carToPush.status === 'Sold') return { error: 'The car attempted to sell is already sold.' }
        const newSale = new SalesModel({
            date: saleDate,
            car: sale.car,
            customer: sale.customer
        })
        const savedSale = await newSale.save()
        await CarsService.updateCar(sale.car, { status: 'Sold' })
        await CustomersService.addSale(customerToPush._id, savedSale)
        return savedSale
    } catch (error) {
        throw error
    }
}

exports.deleteSale = async (id) => {
    try {
        const deletedSale = await SalesModel.findOneAndDelete({_id:id}, { new: true })
        await CarsService.updateCar(deletedSale.car._id, { status: 'Available' })
        await CustomersService.removeSale(deletedSale.customer._id,deletedSale)
        return deletedSale
    } catch (error) {
        throw error
    }
}