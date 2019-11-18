const express = require('express')
const router = express.Router()
const homeModel = require('../models/HomeModel')
const registerRoute = require('./users')

router.get('/', (req,res) => {
    res.status(200).json({
        message: 'Hello world!',
        url: 'http://192.168.50.10:3030/api/home'
    })
})

router.get('/next', (req,res) => {
    const str = {
        name: req.body.name,
        age: req.body.age,
        getName: () => {
            return `Hello my name is ${str.name} ${str.age} year's old!`
        } 
    }
    console.log(str.getName())
    res.send(str.getName())
})

router.get('/home', (req,res) => {
    res.status(200).json(homeModel)
})


router.use('/users', registerRoute)


module.exports = router