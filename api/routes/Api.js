const express = require('express')
const router = express.Router()
const homeModel = require('../models/HomeModel')
const registerRoute = require('./users')
const productRoute = require('./products')
const notifRoute = require('./notification')
const searchRoute = require('../models/SearchModel')
const mongoose = require('mongoose')

router.use('/products', productRoute)

router.use('/users', registerRoute)

router.use('/notif', notifRoute)

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello world!',
        url: 'http://192.168.50.10:3030/api/home'
    })
})

router.get('/search', (req, res) => {
    const query = req.query.item_search;

    searchRoute.find({ title: query })
        .exec()
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.json({
                data: err
            })
        })
})

router.get('/search_create', (req, res) => {
    const query = req.query.item;
    const search = new searchRoute({
        _id: mongoose.Types.ObjectId(),
        title: query
    })

    search.save()
            .then((result) => {
                res.json({
                    response: 'item inserted!'
                })
            }).catch((err) => {
                res.json({
                    error: err
                })
            });
})

router.get('/searchLog', (req, res) => {
    searchRoute.find()
        .exec()
        .then(response => {
            res.status(200).json({
                data: response
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.get('/eme', (req,res) => {
    const eme = req.query.eme

    const myArr = Array.from(eme)

    res.json({
        data: myArr
    })
})

router.get('/home', (req, res) => {
    res.status(200).json(homeModel)
})



module.exports = router