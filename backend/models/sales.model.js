const mongoose = require("mongoose")
const { Schema } = mongoose;

const salesSchema = new mongoose.Schema({
    date: { type: String },
    car: {
        type: Schema.Types.ObjectId,
        ref: "Cars"
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customers"
    }
})

module.exports = mongoose.model('Sales', salesSchema)