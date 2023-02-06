const mongoose = require('mongoose')
const {Schema} =mongoose


const userSchema = new Schema({
    username: { type: String,require:true},
    password: { type: String ,require:true},
})

const my_user = mongoose.model('user', userSchema)
module.exports = my_user