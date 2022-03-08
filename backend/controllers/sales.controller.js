const { findAll, findByUserId, createSale, deleteSale } = require('../services/sales.service')


exports.findAll = async (req, res, next) => {
    try {
        const sales = await findAll()
        return res.status(200).send(sales)
    } catch (error) {
        next(error)
    }
}


exports.findByUserId = async (req, res, next) => {
    try {
        const {id} = req.params  
        const sale = await findByUserId(id)
        res.status(200).send(sale)
    } catch (error) {
        next(error)
    }
}

exports.createSale = async (req, res, next) => {
    try {
        const {body} = req
        const createdSale = await createSale(body)
        if(createdSale.error) res.status(200).send({error:createdSale.error})
        res.status(200).send({message:'Resource created successfully',resource:createdSale})
    } catch (error) {
        next(error)
    }
}

exports.deleteSale = async (req, res, next) => {
    try {
        const {id} = req.params
        const deletedSale = await deleteSale(id)
        res.status(200).send({message:'Resource deleted successfully',resource:deletedSale})
    } catch (error) {
        next(error)
    }
}
