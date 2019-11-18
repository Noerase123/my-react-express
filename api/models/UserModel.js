const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    birthdate: { type: Date, default: Date.now, required: true},
    email: { type: String,
             required: true, 
             unique: true, 
             match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
           },
    password: {type: String, required: true}
});

module.exports = mongoose.model('Users', userSchema);