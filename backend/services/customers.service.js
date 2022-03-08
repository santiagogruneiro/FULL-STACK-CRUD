const CustomersModel = require('../models/customer.model')
const {updateModel} = require('../lib/utils')
const {ObjectId} = require('mongodb')


exports.findAll = async () => {
    try {
        return await CustomersModel.find().exec()
    } catch (err) {
        throw err
    }
}

exports.findById = async (id) => {
    try {
        return await CustomersModel.findById(id).exec()
    } catch (error) {
        throw error
    }
}

exports.createCustomer = async (customer) => {
    try {
        const newCustomer = new CustomersModel({...customer})
        return await newCustomer.save()
    } catch (error) {
        throw error
    }
}

exports.updateCustomer = async (id,customer) => {
    try {
        const customerUpdated = await CustomersModel.findByIdAndUpdate({_id:id},customer,{new:true})
        return customerUpdated
    } catch (error) {
        throw error;
    }
}

exports.deleteCustomer = async (id) => {
    try {
        const customer = await CustomersModel.findById(id)
        if(customer.sales.length > 0) return {error:"Can't delete the customer since it has a reference in other model"}
        const deletedCustomer = await CustomersModel.findOneAndDelete({_id: id},{new:true})

        return deletedCustomer 
    } catch (error) {
        throw error
    }
}

exports.addSale = async (customerId,saleToAdd) => {
    
    try {
        const customer = await CustomersModel.findById(customerId)
        customer.sales.push(saleToAdd)
        await customer.save()
    } catch (error) {
        throw error
    }
}

exports.removeSale = async (customerId,saleToRemove) => {
    try {
        const customer = await CustomersModel.findById(customerId)
        let arrayIndex = customer.sales.findIndex(e=>e._id.toString() == saleToRemove._id)
        customer.sales.splice(arrayIndex,1)
        await customer.save()
    } catch (error) {
        throw error
    }
}