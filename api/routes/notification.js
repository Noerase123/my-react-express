const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const notifController = require('../controllers/notifController')

router.post('/', notifController.createNotif)

router.get('/', notifController.viewAllNotif)

router.get('/:id', notifController.viewNotif)

router.delete('/:id', notifController.deleteNotif)

router.patch('/:id', notifController.updateNotif)


module.exports = router