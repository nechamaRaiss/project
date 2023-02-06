const mongoose = require('mongoose')
const { Schema } = mongoose


const registerSchema = new Schema({
    name: { type: String },
    password: { type: String, required: true },
    buy: [{
        type: Object,
        size: { type: String },
        price: { type: Number },
        date: { type: String }
    }]
})

const my_register = mongoose.model('register', registerSchema)
module.exports = my_register
