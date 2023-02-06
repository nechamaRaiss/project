const mongoose = require('mongoose')
const {Schema} =mongoose


const reportesSchema = new Schema({
    name: { type: String,require:true},
    author: { type: String ,require:true},
    pages:{type:Array,require:true},
    side:{type:String,require:true},
    numPlace:{type:String,require:true}
})

const my_reportes = mongoose.model('reportes', reportesSchema)
module.exports = my_reportes