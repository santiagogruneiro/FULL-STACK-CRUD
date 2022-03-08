const router = require('express').Router()
const {findAll,findById,createCar,updateCar,deleteCar} = require('../controllers/cars.controller')


router
    .get('/',findAll)
    .get('/:id',findById)
    .post('/',createCar)
    .put('/:id',updateCar)
    .delete('/:id',deleteCar)


module.exports = router