const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const usersController = require('../controllers/usersController')

router.post('/login', usersController.loginUser)

router.post('/', usersController.signupUser)

router.get('/', usersController.viewAllUsers)

router.get('/dashboard', usersController.viewAllUsersInDashboard)

router.get('/:id', usersController.viewUser)

router.delete('/:id', usersController.deleteUser)

router.patch('/:id', usersController.updateUser)


module.exports = router