const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String}
})

module.exports = mongoose.model('Search_logs', productSchema)