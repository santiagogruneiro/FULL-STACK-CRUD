const router = require('express').Router()
const {findAll,findByUserId,createSale,deleteSale} = require('../controllers/sales.controller')


router
    .get('/',findAll)
    .get('/user/:id',findByUserId)
    .post('/',createSale)
    .delete('/:id',deleteSale)


module.exports = router