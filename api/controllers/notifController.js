const Notif = require('../models/NotifModel')
const mongoose = require('mongoose')

exports.createNotif = (req,res) => {
    const notif = new Notif({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        time: req.body.time,
        image: req.body.image,
        description: req.body.description
    })
    notif.save()
        .then(response => {
            res.status(201).json({
                message: 'Product created!',
                data: {
                    _id: response._id,
                    title: response.title, 
                    time: response.time,
                    image: response.image,
                    description: response.description,
                    request: {
                        type: 'POST'
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.viewAllNotif = (req,res) => {
    Notif.find()
            .exec()
            .then(response => {
                const result = {
                    count: response.length,
                    data: response.map(not => {
                        return {
                            _id: not._id,
                            title: not.title,
                            time: not.time,
                            image: not.image,
                            description: not.description,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3030/api/notif/' + not._id
                            }
                        }
                    })
                }
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            })
}

exports.viewNotif = (req,res) => {
    const id = req.params.id
    Notif.findById(id)
            .exec()
            .then(not => {
                res.status(200).json({
                    _id: not._id,
                    title: not.title,
                    time: not.time,
                    image: not.image,
                    description: not.description,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3030/api/notif/' + not._id
                    }
                })
            })
}

exports.deleteNotif = (req,res) => {
    const id = req.params.id
    Notif.deleteOne({_id: id})
            .exec()
            .then(response => {
                console.log(response)
                res.status(200).json({
                    message: 'Notifcation deleted'
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            })
}

exports.updateNotif = (req,res) => {
    const id = req.params.id
    const updateOps = {}
    for ( const ops of req.body ) {
        updateOps[ops.propName] = ops.value
    }
    Notif.update({ _id: id }, { $set: updateOps })
            .exec()
            .then(response => {
                console.log(response)
                res.status(200).json({
                    message: 'Notification Updated'
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            })
}