const mongoose = require('mongoose')

const notifSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    time : { type: Number, default: (new Date()).getTime() },
    image: {type: String},
    description: {type: String, required: true}
})

module.exports = mongoose.model('Notification', notifSchema)