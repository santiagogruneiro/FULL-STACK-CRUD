const { findAll, findById, createCustomer, updateCustomer, deleteCustomer } = require('../services/customers.service')


exports.findAll = async (req, res, next) => {
    try {
        const customers = await findAll()
        res.status(200).send(customers)
    } catch (error) {
        next(error)
    }
}

exports.findById = async (req, res, next) => {
    try {
        const { id } = req.params
        const customer = await findById(id)
        if (!customer) throw new Error("Couldn't find a customer with the id " + id)
        res.status(200).send(customer)
    } catch (error) {
        next(error)
    }
}

exports.createCustomer = async (req, res, next) => {
    try {
        const {body} = req
        const newCustomer = await createCustomer(body)
        res.status(200).send({message:'Resource created successfully',resource:newCustomer})
    } catch (error) {
        next(error)
    }
}

exports.updateCustomer = async (req,res,next) => {
    try {
        const {body,params:{id}} = req
        const updatedCustomer = await updateCustomer(id,body)
        res.status(200).send({message:'Resource updated successfullly',resource:updatedCustomer})
    } catch (error) {
        next(error)
    }
}

exports.deleteCustomer = async (req,res,next) => {
    try {
        const {id} = req.params
        const deletedCustomer = await deleteCustomer(id)
        if(deletedCustomer.error) res.status(200).send({error:deletedCustomer.error})
        res.status(200).send({message:'Resource deleted successfully',resource:deletedCustomer})
    } catch (error) {
        next(error)
    }
}
