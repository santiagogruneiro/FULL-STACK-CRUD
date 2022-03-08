const mongoose = require("mongoose")


const carsSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        unique: true,
        required: true
    },
    make: {
        type: String,
        required:true
    },
    model: {
        type: String,
        required:true
    },
    color: {
        type: String
    },
    prize: {
        type: Number,
        required:true
    },
    status: {
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Cars',carsSchema)