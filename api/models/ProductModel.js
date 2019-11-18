const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true}
})

module.exports = mongoose.model('Products', productSchema)