const express = require('express')
const router = express.Router()
const homeModel = require('../models/HomeModel')
const registerRoute = require('./users')
const productRoute = require('./products')
const notifRoute = require('./notification')

router.use('/products', productRoute)

router.use('/users', registerRoute)

router.use('/notif', notifRoute)

router.get('/', (req,res) => {
    res.status(200).json({
        message: 'Hello world!',
        url: 'http://192.168.50.10:3030/api/home'
    })
})

router.get('/home', (req,res) => {
    res.status(200).json(homeModel)
})



module.exports = router