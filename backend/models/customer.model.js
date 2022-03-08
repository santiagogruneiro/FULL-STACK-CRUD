const mongoose = require("mongoose")


const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    sales: [
        {
            type:mongoose.Schema.Types.Mixed
        }
    ]
})

module.exports = mongoose.model('Customers', customerSchema)