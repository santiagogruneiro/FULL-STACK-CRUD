const carsRouter = require('./cars.routes')
const customersRouter = require('./customers.routes')
const salesRouter = require('./sales.routes')
module.exports = (app) =>{
    app.get("/",(req,res)=>res.send("<h1>Running!!</h1>"))
    app.use('/api/cars',carsRouter)
    app.use('/api/customers',customersRouter)
    app.use('/api/sales',salesRouter)
}