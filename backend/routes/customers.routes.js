const router = require('express').Router()
const {findAll,findById,createCustomer,deleteCustomer,updateCustomer} = require('../controllers/customers.controller')


router
    .get('/',findAll)
    .get('/:id',findById)
    .post('/',createCustomer)
    .put('/:id',updateCustomer)
    .delete('/:id',deleteCustomer)


module.exports = router