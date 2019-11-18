const User = require('../models/UserModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.loginUser = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const private_key = 'pizza'
                    const payload = {
                        user: user[0]
                    }
                    const token = jwt.sign(payload, private_key, {
                        expiresIn: '1h'
                    })
                    return res.status(200).json({
                        message: 'Auth login',
                        token: token
                    })

                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.signupUser = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'User Exist!'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            birthdate: req.body.birthdate,
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(response => {
                                res.status(201).json({
                                    message: 'User created!',
                                    data: {
                                        _id: response._id,
                                        firstname: response.firstname,
                                        lastname: response.lastname,
                                        birthdate: response.birthdate,
                                        email: response.email,
                                        password: response.password,
                                        request: {
                                            type: 'POST'
                                        }
                                    }
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.viewAllUsers = (req, res) => {
    User.find()
        .exec()
        .then(docs => {
            const result = {
                count: docs.length,
                registered: docs.map(doc => {
                    return {
                        _id: doc._id,
                        firstname: doc.firstname,
                        lastname: doc.lastname,
                        birthdate: doc.birthdate,
                        email: doc.email,
                        password: doc.password,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3030/api/users/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.viewUser = (req, res) => {
    const id = req.params.id
    User.findById(id)
        .exec()
        .then(response => {
            res.status(200).json({
                _id: response._id,
                firstname: response.firstname,
                lastname: response.lastname,
                birthdate: response.birthdate,
                email: response.email,
                password: response.password,
                request: {
                    type: 'GET',
                    from: 'http://localhost:3030/api/users/'
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

exports.deleteUser = (req, res) => {
    const id = req.params.id
    User.remove({ _id: id })
        .exec()
        .then(response => {
            console.log(response)
            res.status(200).json({
                message: 'user deleted'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err
            })
        })
}

exports.updateUser = (req, res) => {
    const id = req.params.id
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(response => {
            console.log(response)
            res.status(200).json({
                message: "Update User Successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}