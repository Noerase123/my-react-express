const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const usersController = require('../controllers/usersController')

router.post('/login', usersController.loginUser)

router.post('/', usersController.signupUser)

router.get('/', usersController.viewAllUsers)

router.get('/dashboard', checkAuth, usersController.viewAllUsersInDashboard)

router.get('/:id', checkAuth, usersController.viewUser)

router.delete('/:id', checkAuth, usersController.deleteUser)

router.patch('/:id', checkAuth, usersController.updateUser)


module.exports = router