const mongoose = require('mongoose')
const {Schema} =mongoose


const categorySchema = new Schema({
        name: { type: String },
        price: { type: Number },
        size: { type: Number },
        date: { type: String }
    
})

const my_category = mongoose.model('category', categorySchema)
module.exports =my_category
